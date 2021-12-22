const LocalStrategy = require('passport-local').Strategy
const Other = require('../models/other')
const bcrypt = require('bcrypt')


function otherPassport(passport){
        passport.use(new LocalStrategy({ usernameField: 'officialemail'}, async(officialemail, password, done) =>{
            /*----------check if email exits-------*/
            const user = await Other.findOne({ officialemail: officialemail})
            
            if(!user){
                return done(null, false, { message: 'No account exits with this email'})
            }
    
            if(user.registrationStatus === 'not_approved'){
                return done(null, false, { message: 'Your account creation request is pending'})
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
    
        /*-----------serialize student-----------*/
        passport.serializeUser((user, done)=>{
            done(null, user._id)
        }) 
    
        /*-----------deserialize student----------*/
        passport.deserializeUser((id, done)=>{
            Other.findById(id, (err, user) =>{
                done(err, user)
            })
        })
}


module.exports = otherPassport