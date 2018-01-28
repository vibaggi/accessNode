var router = require('express').Router();
var arduinoController = require('../controllers/arduinoController')


router.post("/createPass", function(req, res){
    arduinoController.createPass(req.fields).then(response=>{
        res.status(200).send("OK")
    }).catch(error=>{
        res.status(500).send(error)
    })    
})

module.exports = router;