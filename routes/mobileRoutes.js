var router = require('express').Router();
var mobileController = require('../controllers/mobileController')


router.post("/createPass", function(req, res){
    mobileController.createPass(req.body).then(response=>{
        res.status(200).send("OK")
    }).catch(error=>{
        res.status(500).send(error)
    })    
})

router.post("/mobileLogin", function(req, res){
    //campos a passar 'user' e 'password' formato JSON
    mobileController.login(req.body).then(response=>{
        console.log(response)
        res.status(200).send(response)//deve retornar o TOKEN
    }).catch(error=>{
        console.log("erroo")
        if(error.status == 401){
            res.status(401).send(error.text)
        }else{
            res.status(500).send(error)
        }
    })    
})

module.exports = router;