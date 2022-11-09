const express = require('express');
const path = require('path');
const app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactForm', { useNewUrlParser: true, useUnifiedTopology: true })
const port = 5000;


const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    college: String,
    items: String
  });

const Contact = mongoose.model('Contact', contactSchema);




app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('oii.html', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('oii.html', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
    })})

app.listen(port, ()=>{
    console.log("Connected");
})
