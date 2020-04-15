const express = require('express');
const router = express.Router();
const connection = require("../db")
router.post("/api/macros", function(req, res){
    var statement = 
    connection.query("INSERT INTO macros (heightInput, weightInput, ageInput, genderInput, amtExercise) VALUES(?,?,?,?,?)", [req.body.heightInput, req.body.weightInput, req.body.ageInput, req.body.genderInput, req.body.amtExercise], function(err, data){
        res.json(data)
    })
    console.log(statement.sql)
})
router.get("/api/macros", function(req, res){
    connection.query("SELECT * FROM macros", function(err, data){
        res.json(data)
    })  
})
module.exports = router
