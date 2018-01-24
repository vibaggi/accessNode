/*
    Routas chamadas pelo arduino
*/
var router = require('express').Router();
var arduinoController = require('../controllers/arduinoController')


//A maioria das rotas precisa passar pela verificacao de token.
function isAuthenticate(req, resp, next){
    console.log("autenticando")
    next()
}


router.post("/login", function(req,resp){

})

router.post("/createPass", function(req, res){
    arduinoController.createPass(req.fields).then(response=>{
        res.status(200).send("OK")
    }).catch(error=>{
        res.status(500).send(error)
    })
    
})

router.get('/getListPass/:token', isAuthenticate, function(req, res){
    res.send(
        {
            nome: "Vitor",
            codigo:"4AR5T66XXH"
        }  
    ) 
})  

module.exports = router;