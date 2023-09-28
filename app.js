const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});
const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static')) 
app.use(express.urlencoded())

app.set('view engine', 'pug') 
app.set('views', path.join(__dirname, 'views')) 

app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved")
    }).catch(()=>{
        res.status(400).send("Item not saved")
    });

    // res.status(200).render('contact.pug');
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});