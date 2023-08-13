const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
mongoose.connect('mongodb+srv://ibrahim:ibFA19041310@cluster0.qrrbu8u.mongodb.net/SomeData?retryWrites=true&w=majority').then(()=>{
    console.log('Connected')
}).catch((err)=>{
console.log('err')
})



app.get('/', async(req,res)=>{
   const user = await UserModel.find()
   res.json (user)
})

app.listen(3001 ,()=>{

console.log('server is working')
})