const express = require('express')
const ejs = require('ejs')
const passport = require('passport')
const bcrypt = require('bcrypt')
const {users} = require('./connection')
const expressSession = require('express-session')
const {initializingPassport, isAuthenticated} = require('./passport-config')
// const { authenticate } = require('passport')
const app = express()

// const initializePassport = require('./passport-config')
// initializePassport(passport, async ()=>{
//     const user = await users.findOne({where: {email: username }})
//     return user.toJSON()
// })

initializingPassport(passport)

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(expressSession({secret: 'secret', resave:false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

// function isAuthenticated(req,res,next){
//     if(req.user) 
// }

// console.log(isAuthenticated)


app.get('/', isAuthenticated,(req,res)=>{
    res.render('index')
})

// app.post('/logout', function(req, res, next){
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       res.redirect('/');
//     });
//   },(req,res)=>{
//     res.redirect('/login')
//   });

app.get('/logout', (req,res) => {
    console.log(req.user.dataValues)
    req.logout((err)=>{
        if(err){ 
            console.log(err)
            return;
        }
        return res.redirect('/login');    
    })})
    



app.post('/login',passport.authenticate('local',{failureRedirect: '/register',successRedirect: '/'}),(req,res)=>{
    console.log(req.body)
    
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/register', (req,res)=>{
    res.render('register')  
})

app.post('/register', async (req,res)=>{
    try{
         const hashedpassword = await bcrypt.hash(req.body.password, 10)
         console.log(hashedpassword)
          const newUser = await users.create({
            name: req.body.name,
            email: req.body.username,
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