// const { req, res } = require('express')/
const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')
const {MAIL_API} = require('./config/key')
const PORT = process.env.PORT || 7000
const cors = require('cors')



app.use(express.json())
app.use(cors())
const transport = nodemailer.createTransport(sendGridTransport({
    auth:{
        api_key:MAIL_API
    }
}))

app.post('/send', (req,res)=>{
    const {name, email ,message,subject} =req.body
    transport.sendMail({
        to:"sabdiyogodanaj@gmail.com",
        from:"email",
        subject:subject,
        html:`<h3>${name}</h3> 
        <h3>${email}</h3>
        <p>${message}</p>
     `   
    }).then(response=>{
        res.json({response})
    }).catch(error=>{
        console.log(error)
    })
})

app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
})