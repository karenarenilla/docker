const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const mariadb = require('mariadb')
const { Client } = require("pg")
var redis = require("redis")

/**connection postgres */
const pg = new Client({
  user: 'postgres',
  host: 'postgres',
  database: 'postgres',
  password: 'karen12345',
  port: 5432,
})
pg.connect();
pg.query("SELECT * FROM users;", (err, res) => {
  assert.equal(null, err);
  console.log("Connected successfully to postgres");
  console.log(res.rows)
  pg.end();
});

/**connection mongo */
MongoClient.connect('mongodb://mongo:27017', function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to mongo");
  client.db('mongo');
  client.close();
  process.exit();
});

/**connection mariadb */
const connect = mariadb.createPool({host: 'mariadb', user: 'root', password: 'karen12345', database: 'prueba', connectionLimit: 5});
  connect.getConnection()
  .then(() => {
    console.log("Connected successfully to mariadb");
    connect.end();
    })
  .catch(err => { console.error(err)});

/**connection redis */
const client = redis.createClient("redis://redis:6379/0")
client.set("clave", "prueba");
client.get("clave", function(err, res){
  assert.equal(null, err);
  console.log("Connected successfully to redis");
});
