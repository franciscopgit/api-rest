class Homecontroller {
  async index(req, res) {
    res.json('index');
  }
}

export default new Homecontroller(); // Mandando a class instanciada para pegar o objeto
