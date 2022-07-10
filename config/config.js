const promise = require("bluebird");
const options = {
  promiseLib: promise,
  query: (e) => {},
};

const pgp = require("pg-promise")(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});

const databaseConfig = {
  host: "ec2-52-20-166-21.compute-1.amazonaws.com",
  port: 5432,
  database: "d8mv1k0gui1ke6",
  user: "krtmytcpklswvj",
  password: "83a389c4de16921fd61ddb4a462fcce88c506d6b969bda99b3b5d36f08e8d8ff",
};

const db = pgp(databaseConfig);
module.exports = db;
