var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://nodeUser:nodepassword@ds111568.mlab.com:11568/acessodb";


MongoClient.connect(url, function(err, db) {
  if (err) console.log(err);
  console.log("Database created!");
  db.close();
});

function authenticate(user, password){
  new Promise((resolve, reject) =>{
      
      
  })
}

function createPass(RFID, name){
  //Cria uma passe de acesso a residencia. Porem ele por padrão estará bloqueado.
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("acessodb");
      var myobj = { RFID: RFID, name: name, authorized: false };
      dbo.collection("pass").insertOne(myobj, function(err, res) {
        if (err) reject(err);
        db.close();
        resolve("success");
      });
    });
  })
}

module.exports = {
  createPass:createPass
}