const nodemailer = require("nodemailer");
const express = require('express');
const Contact = require('../schema/contact.model');
const router = express.Router();

router.post('/contact',(req,res)=>{
    const {name, email, massage} = req.body;
    const contact = new Contact({name, email, massage});
    contact.save()
    .then(()=>{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mynotebook.gov.in@gmail.com',
                pass: 'fdsypytrczpbqihp'
            }
        });
        const mailOptions = {
            from: "mynotebook.gov.in@gmail.com",
            to: email,
            subject: "thanks for contacting us",
            html: `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>myNoteBook</title>
                    <style>
                            body {
                                margin: 0;
                                padding: 0;
                                font-family: Arial, sans-serif;
                                background-color: #d2dce1;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #ffffff;
                            }
                            .header {
                                background-color: #01111a;
                                color: #ffffff;
                                padding: 20px;
                                text-align: center;
                            }
                            .content {
                                padding: 20px;
                            }
                            .awesome{
                                color: red;
                            }
                            .button {
                                display: block;
                                width: 150px;
                                margin: 20px auto;
                                padding: 10px;
                                background-color: #075186;
                                color: #ffffff;
                                text-align: center;
                                text-decoration: none;
                                border-radius: 4px;
                            }
                            .footer {
                                background-color: #f4f4f4;
                                padding: 20px;
                            }
                        </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Welcome to myNoteBook</h1>
            
                            <div class="content">
                                <p>Hii ${name},</p>
                                <h4>Make something <span class="awesome">Awesome</span></h4>
                                <p style="color: red;">This is valid only for 5 minutes</p>
                            </div>
                        </div>
                        <p>myNoteBook is made from the pain of writing all the
                            things in a notebook which is very hectic. So we made an
                            online web platform where you can create, edit, upload,
                            delete your notes/information privately and securely
                            without any disturbance. You can also access your notes
                            anywhere in your world, at any time. So don't forget to
                            create a note because creating anything is always
                            important.</p>
            
                        <div class="footer">
                            <p style="text-align: center;">© 2024 myNoteBook. All rights
                                reserved.</p>
                        </div>
                    </div>
                </body>
            </html>`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return res.status(401).send("message not send");
            }
            else {
                console.log('Message sent: %s', info.response);
                return res.status(201).send("message send");
            }
        });
        const success = true;
        res.json({success, message: 'Contact added successfully', contact})
    })
    .catch(err=>res.status(400).json('Error: '+err))
})

module.exports = router;