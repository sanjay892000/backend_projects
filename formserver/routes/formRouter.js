const express = require('express')
const UserForm = require('../schema/formschema')
const router = express.Router()

/* router.get('/', (req, res) =>{
    res.send('Home Page')
}) */

router.post('/form', (req, res) =>{
    console.log(req.body , 45)
    const {name, age, email, contact, address} = req.body;
    const form = new UserForm({name: name, age: age, email: email, contact: contact, address: address})
    form.save();
})
router.get('/formdata',(req,res)=>{
   UserForm.find()
   .then((forms) => {
        /*  res.send(forms) */
         res.json(forms)
    })
    .catch((err) => {
        console.log(err)
    });
    
})
router.get('/fetchform/:formid', (req,res)=>{
    console.log(req.params.formid)
    UserForm.findById(req.params.formid)
    .then((form) => {
        res.send(form)
        console.log(form)
    }).catch((err) => {
        console.log(err)
    });
})


module.exports = router; // exporting the router module for use in other files.
