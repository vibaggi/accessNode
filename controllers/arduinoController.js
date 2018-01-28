var db = require('../drivers/mongodb')


function login(data){
    //Será feita a verificação de login e gerado um token.
    //O Token é registrado no banco de dados e um novo token é gerado em todo login.
    return new Promise((resolve, reject)=>{
        db.authenticate(data.user, data.password)
            .then(response=>{
                
            }).catch(error=>{
                console.log(error)
            })
    })
}

