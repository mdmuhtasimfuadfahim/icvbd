const LocalStrategy = require('passport-local').Strategy
const Student = require('../models/student')
const bcrypt = require('bcrypt')


function studentPassport(passport){
    passport.use(new LocalStrategy({ usernameField: 'studentEmail'}, async(studentEmail, password, done) =>{
        /*----------check if email exits-------*/
        const user = await Student.findOne({ studentEmail: studentEmail})
        
        if(!user){
            return done(null, false, { message: 'No student account exits with this email'})
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
        console.log(user._id)
        done(null, user._id)
    }) 

    /*-----------deserialize student----------*/
    passport.deserializeUser((id, done)=>{
        Student.findById(id, (err, user) =>{
            done(err, user)
        })
    })
}


module.exports = studentPassport