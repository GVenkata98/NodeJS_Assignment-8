const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080 ;
app.use(express.urlencoded());
const studentArray = require('./InitialData');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

let newId = studentArray.length;
app.get('/api/student' , (req, res) =>{
    try{
        res.json({
            status: "Success" ,
            result: studentArray
        })
    }catch(err){
        res.status(400).json({
            status: "Failed" ,
            message: err.message
        })
    }
})

app.get('/api/student/:id' , (req, res)=> {
    try{
        const idx = studentArray.findIndex((elm => elm.id == req.params.id))
        if(idx == -1){
            res.json({
                statuscode: 404 ,
                message: "Invalide Id."
            })
        }else{
            res.json({
                status:"Success" ,
                result: studentArray[idx]
            })
        }
    }catch(err){
        message: err.message
    }
} )

app.post("/api/student" , (req, res)=> {
    try{
        if(!req.body.name || !req.body.currentClass || !req.body.division ){
            res.status(400).json({
                message: "invalide or incomplete Data."
            })
        }else{
            newId++;
            studentArray.push({
                id: newId ,
                name: req.body.name ,
                currentClass: req.body.currentClass ,
                division: req.body.division
            });
            res.status(200).json({
                message: "the Data is created Successfully and ID is" ,
                ID: newId
            })
        }
    }catch(err){
        console.log("we are in catch part.")
        res.status(401).json({message: err.message})
    }
})

app.put("/api/student/:id" , (req , res)=>{
    try{
        const idx = studentArray.findIndex((elm => elm.id == req.params.id))
        if(idx == -1){
            res.status(401).json({message:"Invalid Id."})
        }
        if(req.body.name){
            studentArray[idx].name = req.body.name 
        }if(req.body.currentClass){
            studentArray[idx].currentClass = req.body.currentClass
        }if(req.body.division){
            studentArray[idx].division = req.body.division
        }
        res.json({
            status:"Success" ,
            message : "Updated Successfully " , 
            result: studentArray[idx]
        })
    }catch(err){
        res.json({
            status:402 ,
            message:err.message
        })
    }
})

app.delete('/api/student/:id' ,(req, res)=>{
    try{
        const idx = studentArray.findIndex((elm => elm.id == req.params.id))
        if(idx == -1){
            return res.status(401).json({message:"Invalid Id."})
        }
        studentArray.splice(idx, 1)
        res.json({
            status: "Success" ,
            message: "Data Deleted Successfully."
        })
    }catch(er){
        res.status(400).json({message:er.message})
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   