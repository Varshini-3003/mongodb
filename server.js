const express = require('express');
const app = express();
const body = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const User = require('./schema')

app.use(express.urlencoded({ extended: true }));
app.use(body.json());

const org = {
    origin:'http://localhost:3000'
}

app.use(cors(org));

// mongoose.connect('mongodb+srv://Varshini:Varshini30@cluster0.bvfzwzr.mongodb.net/?retryWrites=true&w=majority', function (error) {

mongoose.connect('mongodb://127.0.0.1:27017/SampleDB', function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('connected to MongoDB');
    }
})

app.get('/user', async function (req, res) {
    try {
        await User.find()
            .then((user) => {
                res.send(user)
            })
    }
    catch (error) {
        res.send(error)
    }
})

app.post('/crtuser', async function (req, res) {
    try {
        await User.create({
            Name: req.body.Name,
            Email:req.body.Email,
            Password: req.body.Password,
            Phone: req.body.Phone
        })
            .then((user) => {
                res.send(user)
            })
    } catch (error) {
        res.send(error);
    }
})

app.get('/user/:id', async function (req, res) {
    try {
        await User.findById(req.params.id)
            .then((user) => {
                res.send(user)
            })
    }
    catch (error) {
        res.send(error);
    }
})

app.put('/update/:id', async function (req, res) {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            Name: req.body.Name,
            Email:req.body.Email,
            Password: req.body.Password,
            Phone: req.body.Phone
        })
            .then((user) => {
                res.send(user)
            })
    } catch (error) {
        res.send(error);
    }
})

app.delete('/deluser/:id', async function(req,res){
    try {
        await User.findByIdAndDelete(req.params.id)
        .then(function(){
            res.send('Profile Deleted')
        })
    } catch (error) {
        res.send(error);
    }
})

app.listen(2500, function () { console.log('listening'); })