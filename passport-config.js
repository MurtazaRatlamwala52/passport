const {users} = require('./connection')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// const passport = require('passport');


// async function user2()  {
//     const username = 'ahmed@nimapinfotech.com'
//     const user = await users.findOne({where: {email: username }})
//     // const unhash = await bcrypt.compare(password , user.password )
//     console.log(user.name)
// }
// user2()


exports.initializingPassport = (passport) => {
    // console.log(initializingPassport)
    passport.use(
            new LocalStrategy ({
                usernameField: "email",
                passwordField: "password"
            },async(email, password, done)=> {
                try {   
                const user = await users.findOne({where: {email: email}})
                if(!user) return done(null, false)
                console.log(email)
                console.log(user.email)
                const decrypt = await bcrypt.compare(password, user.password)          
                if(!decrypt) return done(null, false)
                
                return done(null, user)
                }catch(err){
                    console.log(err)
                 return done(err, false)
        }
    })
    )

    passport.serializeUser((user,done)=>{
        done(null, user.id);
    })

    passport.deserializeUser(async(id,done)=>{
        try{
            const user = await users.findByPk(id)
            done(null, user)
        }catch(error){
            done(error, false)
        }    
    })
}


exports.isAuthenticated = (req,res,next) =>{
    if(req.user) return next()
    res.redirect('/login')
}