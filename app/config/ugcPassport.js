const LocalStrategy = require('passport-local').Strategy
const UGC = require('../models/ugc')
const bcrypt = require('bcrypt')


function ugcPassport(passport){
        passport.use(new LocalStrategy({ usernameField: 'officialemail'}, async(officialemail, password, done) =>{
            /*----------check if email exits-------*/
            const user = await UGC.findOne({officialemail: officialemail})

            if(!user){
                return done(null, false, { message: 'No account exits with this email'})
            }
    
            /*--------------compare password with hashed password----------*/
            bcrypt.compare(password, user.password).then(match =>{
                if(match){
                    return done(null, user, { message: 'Logged in successfully'})
                }
                return done(null, false, { message: 'Wrong email or password'})
            }).catch(err =>{
                console.log(err)
                return done(null, false, { message: 'Something went wrong'})
            }) 
        }))
    
        /*-----------serialize accounts-----------*/
        passport.serializeUser((user, done)=>{
            done(null, user._id)
        }) 
    
        /*-----------deserialize accounts----------*/
        passport.deserializeUser((id, done)=>{
            UGC.findById(id, (err, user) =>{
                done(err, user)
            })
        })
}


module.exports = ugcPassport