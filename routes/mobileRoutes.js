var router = require('express').Router();
var mobileController = require('../controllers/mobileController')


router.post("/createPass", function(req, res){
    mobileController.createPass(req.fields).then(response=>{
        res.status(200).send("OK")
    }).catch(error=>{
        res.status(500).send(error)
    })    
})

router.post("/mobileLogin", function(req, res){
    //campos a passar 'user' e 'password' formato JSON
    mobileController.login(req.fields).then(response=>{
        console.log(response)
        res.status(200).send(response)//deve retornar o TOKEN
    }).catch(error=>{
        res.status(500).send(error)
    })    
})

module.exports = router;