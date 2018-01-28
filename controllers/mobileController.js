var db = require('../drivers/mongodb')

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

module.exports = {
    createPass: createPass
}