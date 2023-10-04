import jwt from "jsonwebtoken";
import User from "../models/user";

export default async (req, res, next) => {
  // eslint-disable-line consistent-return
  const { authorization } = req.headers; // Chame authorization veio do insonia pois a mesma foi atrelado ao token enviado no header.

  if (!authorization) {
    return res.status(401).json({
      errors: ["não autorizado"], // Verificando se a chave foi enviada
    });
  }

  const [, token] = authorization.split(" "); // Separando o token do Bearer

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET); // Passando a TOKEN_SECRET e o token recebido para o jwt verificar se a mesma é valida. se sim ele retorna um objeto com as chaves e os valores enviado na geração do token
    const { id, email } = dados;
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ["Usuario invalido"],
      });
    }

    req.userId = id;
    req.userEmail = email;
  } catch (e) {
    return res.status(401).json({
      errors: ["Token expirado ou invalido"],
    });
  }
  next();
};
