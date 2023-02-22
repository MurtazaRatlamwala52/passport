const {users} = require('./connection')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')


async function user2()  {
    
    const user = await users.findOne({where: {email: username }})
    const unhash = await bcrypt.compare(password , user.password )
    console.log(unhash)
}
user2()


exports.initializingPassport = (passporrt) => {
    passport.use(
        new LocalStrategy (async(username, password, done)=>{
            const user = await users.findOne({where: {email: username}})
            const decrypt = bcrypt.compare(password, user.password)

            if(!user) return done(null, false)

            if(!decrypt) return done(null, false)
            
            return done(null, user)
        })
    )
}
