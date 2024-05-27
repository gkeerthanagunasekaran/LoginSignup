const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const StudentModel = require('./models/Student')


const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb://127.0.0.1:27017/student");

app.post('/login',(req, res) =>{
    const{email, pass} = req.body;
    StudentModel.findOne({email: email})
    .then (user =>{
        if(user){
            if(user.pass === pass){
                res.json("Success")
            } else{
                res.json("incorrect password")
            }
        } else{
            res.json("No user existed")
        }
    }) 
})


app.get('/user/:email', (req, res) => {
    const { email } = req.params;
    StudentModel.findOne({ email })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

app.post('/register', (req, res) =>{
    StudentModel.create(req.body)
    .then(students => res.json(students))
    .catch(err => res.json(err))

})

app.listen(3001, ()=>{
    console.log("server is alive")
})