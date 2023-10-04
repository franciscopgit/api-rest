import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '', //Valor padrão para caso o valor nome não seja enviado
        validate: {
          len: { //Tamanho
            args: [3, 255], // Minimo e maximo caracteres no nome
            msg: 'Campo nome deve ter entre 3 e  255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '', //Valor padrão para caso o valor nome não seja enviado
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '', //Valor padrão para caso o valor nome não seja enviado
        validate: {
          len: { //Tamanho
            args: [6, 50], // Minimo e maximo caracteres no nome
            msg: 'A Senha precisa ter entre 6 e 50 caracteres',
          },
        },
      },
    }, {
      sequelize,
    });
    // Executar uma ação antes de salvar, durante a execução do codigo terminar ele executa uma ação.
    this.addHook('beforeSave', async (user) => {
      if (user.password) { // Na rota PUT do User controller temos que evitar o envio do password para criação do hash pois daria erro já que na atualização não precisa e nem é enviado senha
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    // O codido 'this.addHook' serve para pegar a senha virtual passar pelo bcryptjs e adicionar o hash dentro de password_hash antes de enviar para o banco de dados
    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
