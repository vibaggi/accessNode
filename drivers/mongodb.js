var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://nodeUser:nodepassword@ds111568.mlab.com:11568/acessodb";


MongoClient.connect(url, function(err, db) {
  if (err) console.log(err);
  console.log("Database created!");
  db.close();
});

function login(user, password){
  return new Promise(function(resolve, reject){      
    MongoClient.connect(url, function(err, db) {
      console.log("conectando")
      if (err) throw err;
      var dbo = db.db("acessodb");
      var query = {user: user, password: password}
      dbo.collection("account").findOne(query, function(err, result) {
        
        if (err) reject(err);
        else if(result == null) reject({status: 401, text: "Login invalidos"})
        //caso exista login e senha
        //gerando token          
        else require('crypto').randomBytes(48, function(err, buffer) {
          var passToken = {
            user: user,
            token: buffer.toString('hex')
          }            
          dbo.collection("token").insertOne(passToken, function(err, res) {
            if (err) reject(err);
            db.close();
            console.log(passToken.token)
            resolve(passToken.token); //retornando o TOKEN
          })
        })       
      }); 
    });      
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

function unlockPass(RFID){
  //Para dar acesso ao passe existente.
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("acessodb");
      var myquery = { RFID: RFID }; //argumento usado para procura
      var newvalues = { authorized: true }; //dado atualizado
      dbo.collection("pass").updateOne(myquery, {$set:newvalues}, function(err, res) {
        if (err) reject(err);
        db.close();
        resolve("sucess")
      });
    });
  });
}

function isAuthorized(token){
  return new Promise(function(resolve, reject){
    MongoClient.connect(url, function(err, db){
      if(err) reject(err)
      var dbo = db.db("acessodb")
      dbo.collection("token").findOne({token: token}, function(err, result){
        if(err) reject(err)
        if(result == null) resolve(false) //sucesso, porem não há token
        resolve(true) //sucesso, há token
      })
    })
  })
}
module.exports = {
  createPass:createPass,
  unlockPass: unlockPass,
  login: login
}