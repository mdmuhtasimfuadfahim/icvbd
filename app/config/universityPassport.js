const Passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const University = require('../models/university')
const bcrypt = require('bcrypt')


function universityPassport(universityPassport){
        universityPassport.use(new LocalStrategy({ usernameField: 'officialemail'}, async(officialemail, password, done) =>{
            /*----------check if email exits-------*/
            const user = await University.findOne({ officialemail: officialemail})
            if(!user){
                return done(null, false, { message: 'No account exits with this email'})
            }
    
            if(user.registrationStatus === 'not_approved'){
                return done(null, false, { message: 'Your account creation request is pending'})
            }
            else{
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
            }
        }))
    
        /*-----------serialize university-----------*/
        universityPassport.serializeUser((user, done)=>{
            done(null, user._id)
        }) 
    
        /*-----------deserialize university----------*/
        universityPassport.deserializeUser((id, done)=>{
            University.findById(id, (err, user) =>{
                done(err, user)
            })
        })
}


module.exports = universityPassport