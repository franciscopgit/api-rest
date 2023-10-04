import User from '../models/user';

class Usercontroller {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      res.json({ id, nome, email });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      // console.log('USER ID', req.userId);
      // console.log('USER EMIAL', req.userEmail);
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });// Metodo retornar todos os users na base de dados
      return res.json(users);// Todos os usuarios em arquivo json
    } catch (e) {
      return res.json(null); // Erro em arquivo json
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);// Retorna o usuario de acordo com o id passado na requisição
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      // if (!req.params.id) {
      //   return res.status(400).json({
      //     errors: ['ID não enviado'],
      //   });
      // }
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não existe'],
        });
      }
      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      // if (!req.params.id) {
      //   return res.status(400).json({
      //     errors: ['ID não enviado'],
      //   });
      // }

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não existe'],
        });
      }
      await user.destroy();

      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new Usercontroller(); // Mandando a class instanciada para pegar o objeto
