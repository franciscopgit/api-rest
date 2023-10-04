import jwt from "jsonwebtoken";
import User from "../models/user";

class Tokencontroller {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ["Credenciais inválidas"],
      });
    }

    const user = await User.findOne({ where: { email } }); // esse metodo verificase o email passado existe na base de dados usando a chave email

    if (!user) {
      return res.status(401).json({
        errors: ["Usuario não existe"],
      });
    }
    // console.log(email, password);
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ["Senha invalida"],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

export default new Tokencontroller(); // Mandando a class instanciada para pegar o objeto
