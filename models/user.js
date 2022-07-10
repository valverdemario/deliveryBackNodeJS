const db = require("../config/config");
const bcrypt = require("bcryptjs");
const User = {};
(User.getAll = () => {
  const sql = `
    SELECT 
        * 
    FROM 
        users;`;
  return db.manyOrNone(sql);
}),
  (User.create = async (user) => {
    const hash = await bcrypt.hash(user.password, 10);
    const sql = `
    INSERT INTO users(
        email,
        password,
        name,
        lastname,
        phone,
        created_at,
        updated_at) 
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id_user;`;
    return db.one(sql, [
      user.email,
      hash,
      user.name,
      user.lastname,
      user.phone,
      new Date(),
      new Date(),
    ]);
  }),
  (User.find = async (id, callback) => {
    const sql = `SELECT 
    id_user,
    email,
    name,
    lastname,
    image,
    phone,
    password,
    session_token
FROM
    users
WHERE
    id_user = $1`;
    return db.oneOrNone(sql, id).then((user) => {
      callback(null, user);
    });
  }),
  (User.findByEmail = async (email, callback) => {
    const sql = `SELECT 
    id_user,
    email,
    name,
    lastname,
    image,
    phone,
    password,
    session_token
FROM
    users
WHERE
    email = $1`;
    return db.oneOrNone(sql, email);
  });

module.exports = User;
