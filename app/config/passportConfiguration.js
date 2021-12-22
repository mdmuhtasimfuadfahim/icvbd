const LocalStrategy = require('passport-local').Strategy
const University = require('../models/university')
const Student = require('../models/student')
const Other = require('../models/other')
const UGC = require('../models/ugcinfo')
const bcrypt = require('bcrypt')


module.exports = {
    /*-----------University Passport Configuration-------------*/ 
    universityPassport: function universityPassport(passport){
        passport.use(new LocalStrategy({ usernameField: 'officialemail'}, async(officialemail, password, done) =>{
            /*----------check if email exits-------*/
            const user = await University.findOne({ officialemail: officialemail})
            if(!user){
                return done(null, false, { message: 'No account exits with this email'})
            }
    
            if(user.registrationStatus === 'not-approved'){
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
        passport.serializeUser((user, done)=>{
            done(null, user._id)
        }) 
    
        /*-----------deserialize university----------*/
        passport.deserializeUser((id, done)=>{
            University.findById(id, (err, user) =>{
                done(err, user)
            })
        })
    },

    /*-----------Student Passport Configuration-------------*/ 
    studentPassport: function studentPassport(passport){
        passport.use(new LocalStrategy({ usernameField: 'studentEmail'}, async(studentEmail, password, done) =>{
            /*----------check if email exits-------*/
            const user = await Student.findOne({ studentEmail: studentEmail})
            
            if(!user){
                return done(null, false, { message: 'No student account exits with this email'})
            }
    
            if(user.registrationStatus === 'not-approved'){
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
            Student.findById(id, (err, user) =>{
                done(err, user)
            })
        })
    },

    /*-----------Other Passport Configuration-------------*/ 
    otherPassport: function otherPassport(passport){
            passport.use(new LocalStrategy({ usernameField: 'officialemail'}, async(officialemail, password, done) =>{
                /*----------check if email exits-------*/
                const user = await Other.findOne({ officialemail: officialemail})
                
                if(!user){
                    return done(null, false, { message: 'No account exits with this email'})
                }
        
                if(user.registrationStatus === 'not-approved'){
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
    },

    /*-----------UGC Passport Configuration-------------*/ 
    ugcPassport: function ugcPassport(passport){
        passport.use(new LocalStrategy({ usernameField: 'officialemail'}, async(officialemail, password, done) =>{
            /*----------check if email exits-------*/
            const ugc = await UGC.findOne({ officialemail: officialemail})

            if(!ugc){
                return done(null, false, { message: 'No account exits with this email'})
            }
    
            /*--------------compare password with hashed password----------*/
            bcrypt.compare(password, ugc.password).then(match =>{
                if(match){
                    return done(null, ugc, { message: 'Logged in successfully'})
                }
                return done(null, false, { message: 'Wrong email or password'})
            }).catch(err =>{
                console.log(err)
                return done(null, false, { message: 'Something went wrong'})
            }) 
        }))
    
        /*-----------serialize accounts-----------*/
        passport.serializeUser((ugc, done)=>{
            done(null, ugc._id)
        }) 
    
        /*-----------deserialize accounts----------*/
        passport.deserializeUser((id, done)=>{
            UGC.findById(id, (err, ugc) =>{
                done(err, ugc)
            })
        })
    }
    
}
