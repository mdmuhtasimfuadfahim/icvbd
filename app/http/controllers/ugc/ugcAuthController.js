const passport = require('passport')
const UGC = require('../../../models/ugc')
const bcrypt = require('bcrypt')

function ugcAuthController(){
    return{
        login(req, res){
            res.render('auth/ugc/login')
        },
        async postLogin(req, res, next){
            const { officialemail, password } = req.body
            

            // const ugc = await UGC.findOne({ officialemail: officialemail })
            // const ugcAccountRole = ugc.role
            // /*--------check if email matches with role---------*/ 
            // if(ugcAccountRole != "UGC"){
            //     req.flash('error', 'Your Email is not for UGC Login')
            //     return res.redirect('/ugc/login')
            // }

            /*------------validate request---------*/
            if(!officialemail || !password){
                req.flash('error', 'All fields are required for login')
                req.flash('officialemail', officialemail)
                return res.redirect('/ugc/login')
            } 


            /*------------validate request---------*/
            if(!officialemail || !password){
                req.flash('error', 'All fields are required for login')
                req.flash('officialemail', officialemail)
                return res.redirect('/university/login')
            } 
            const user = await UGC.findOne({ officialemail: officialemail})
            var message = 'not set'
            if(!user){
                req.flash('error', 'No user exists with this credentials')
                res.redirect('/ugc/login')
            }
    
            if(user.registrationStatus === 'not_approved'){
                 req.flash('error', 'Your account creation request is pending')
                 res.redirect('/ugc/login')
            }
            if(user.role !== "UGC"){
                req.flash('error', 'Your are not authorized to access this feature')
                res.redirect('/ugc/login')
           }
            else{
                /*--------------compare password with hashed password----------*/
                bcrypt.compare(password, user.password).then(match =>{
                    if(match){
                         message ='Logged in successfully'
                         req.session.user = user 
                         res.redirect('/ugc/dashboard')
                    }
                    else{
                        message="Password not matching"
                    }
                }).catch(err =>{
                    console.log(err)
                    
                }) 
            }

        },

        /* Experimental Function */ 
        async fetchUGC(req,res){
            const ugc = UGC.find({},(err,result)=>{
                if(err){
                    console.log(err)
                }
                
                if(result){
                    res.json(result)
                }
                else{
                    console.log('No UGC user found')
                }
            })

        }
    }
}


module.exports = ugcAuthController