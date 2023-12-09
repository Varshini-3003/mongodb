const express = require('express');
const app = express();
const body = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const Userdata = require('./Schema1')

app.use(express.urlencoded({ extended: true }));
app.use(body.json());

const org = {
    origin:'http://localhost:1500'
}

app.use(cors(org));

// mongoose.connect('mongodb+srv://Varshini:Varshini30@cluster0.bvfzwzr.mongodb.net/?retryWrites=true&w=majority', function (error) {
mongoose.connect('mongodb://127.0.0.1:27017/SampleDB', function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(' Successfully Connected to MongoDB');
    }
})

app.get('/userdata', async function (req, res) {
    try {
        await Userdata.find()
            .then((userdata) => {
                res.send(userdata)
            })
    }
    catch (error) {
        res.send(error)
    }
})

app.post('/crtuserdata', async function (req, res) {
    try {
        await Userdata.create({
            Name: req.body.Name,
            Email:req.body.Email,
            Password: req.body.Password,
            Phone: req.body.Phone
        })
            .then((userdata) => {
                res.send(userdata)
            })
    } catch (error) {
        res.send(error);
    }
})

app.get('/userdata/:id', async function (req, res) {
    try {
        await Userdata.findById(req.params.id)
            .then((userdata) => {
                res.send(userdata)
            })
    }
    catch (error) {
        res.send(error);
    }
})

app.put('/updatedata/:id', async function (req, res) {
    try {
        await Userdata.findByIdAndUpdate(req.params.id, {
            Name: req.body.Name,
            Email:req.body.Email,
            Password: req.body.Password,
            Phone: req.body.Phone
        })
            .then((userdata) => {
                res.send(userdata)
            })
    } catch (error) {
        res.send(error);
    }
})

app.delete('/deluserdata/:id', async function(req,res){
    try {
        await Userdata.findByIdAndDelete(req.params.id)
        .then(function(){
            res.send('Profile Deleted Successfully')
        })
    } catch (error) {
        res.send(error);
    }
})

app.listen(3500, function () { console.log('In Process'); })
