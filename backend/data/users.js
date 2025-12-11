const bcrypt = require("bcrypt");

const users = [
  {
    id: 1,
    email: "arman@gmail.com",
    passwordHash: bcrypt.hashSync("12345678", 10),
    role: "admin",
  },
  {
    id: 2,
    email: "eziz@mail.ru",
    passwordHash: bcrypt.hashSync("eziz123", 10),
    role: "manager",
  },
  {
    id: 3,
    email: "meru@narxoz.kz",
    passwordHash: bcrypt.hashSync("meru123", 10),
    role: "employee",
  },
];

module.exports = { users };
