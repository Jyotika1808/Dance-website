const express= require("express")
const path = require("path");

// const { name } = require("pug/lib");
const app= express(); 
const bodyparser = require("body-parser")
const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');
}
const port = 80;

// define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  contact: String,
  email: String,
  address: String
});

const contact = mongoose.model('contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// express specific stuff
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{  
    // send variable
    const con = "This is the best website on internet."
    const params= {}
    res.status(200).render('home.pug',params)
  })

app.get('/contact',(req,res)=>{
    const params= {}
    res.status(200).render('contact.pug',params)
  })
app.get('/about',(req,res)=>{
    const params= {}
    res.status(200).render('about.pug',params)
  })
app.get('/services',(req,res)=>{
    const params= {}
    res.status(200).render('services.pug',params)
  })
app.post('/contact',(req,res)=>{
  var mydata = new contact(req.body)
  mydata.save().then(()=>{
   res.send("The Form is submitted Successfully.")
  }).catch(()=>{
    res.status(400).send("Form is not been Submitted.")
  });
  

})
// start server
app.listen(port , ()=>{
    console.log(`The application started successfully on port ${port}`);
    
});
