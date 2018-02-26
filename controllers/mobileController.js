var db = require('../drivers/mongodb')

function authentication(data){
    return new Promisse(function(resolve, reject){
        db.isAuthorized(data.token).then(response=>{
            resolve(response)
        }).catch(error=>{
            reject(error)
        })
    })
}

function createPass(data){
    return new Promise(function(resolve, reject){
        db.createPass(data.RFID, data.nome).then(response=>{
            db.unlockPass(data.RFID).then(response=>{
                resolve(response)    
            }).catch(error=>{
                reject(error)
            })            
        }).catch(error=>{
            reject(error)
        })
    })
}

function login(data){
    return new Promise(function(resolve, reject){
        db.login(data.user, data.password).then(response=>{
            resolve(response)    //deve retornar o TOKEN
        }).catch(error=>{
            reject(error)
        })
    })
}
module.exports = {
    createPass: createPass,
    login: login
}