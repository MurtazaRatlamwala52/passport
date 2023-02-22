const express = require('express')
const ejs = require('ejs')
const passport = require('passport')
const bcrypt = require('bcrypt')
const {users} = require('./connection')
const app = express()

// const initializePassport = require('./passport-config')
// initializePassport(passport, async ()=>{
//     const user = await users.findOne({where: {email: username }})
//     return user.toJSON()
// })


app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))



// app.get('/',(req,res)=>{
//     res.render('index')
// })


// app.get('/login', (req,res)=>{
//     res.render('login')
// })

app.get('/register', (req,res)=>{
    res.render('register')  
})

app.post('/register', async (req,res)=>{
    try{
         const hashedpassword = await bcrypt.hash(req.body.password, 10)
         console.log(hashedpassword)
          const newUser = await users.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword
         })
            res.redirect('/login')
        }
    catch(err){
        res.send('<h1>Pls Insert Details</h1>')
        console.log(req.body.name)
        console.log(req.body.email)
        console.log(req.body.password)
    }
})

app.listen(5253, ()=> console.log('Server is running on port 5253'))