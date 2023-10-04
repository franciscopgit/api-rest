const bcrypts = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        nome: 'John',
        email: 'franciscopereir1@gmail.com',
        password_hash: await bcrypts.hash('123487', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'John Doe',
        email: 'franciscopereir2@gmail.com',
        password_hash: await bcrypts.hash('129856', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'John2',
        email: 'franciscopereir3@gmail.com',
        password_hash: await bcrypts.hash('123444', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {},
  ),

  down: () => {},
};
