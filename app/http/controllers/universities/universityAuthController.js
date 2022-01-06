const University = require('../../../models/university')
const Exp        = require('../../../models/experimental')
const Log        = require('../../../models/logging')
const UGC = require('../../../models/ugc')
const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')
const Passport = require('passport').Passport,
    universityPassport = new Passport()
const crypto = require('crypto')
const { captureRejectionSymbol } = require('stream')
const secret = process.env.SECRET_TO_HASH_DB_VALUES

async function justConsole(req,res){
    console.log('Message from justConsole')
    let universities 
            await University.find({},"_id uniName",(err,result)=>{
                if (err){
                    console.log(err)
                }
                if(result){
                    universities = result 
                    
                }
                else{
                    console.log('DB has no university')
                }
            })
            console.log('Here it comes')
            console.log(universities[0])
            
            return universities
}


async  function uniEventLogger(uniName,loggerText,official){
    
    const log = new Log({
                        uniName: uniName,
                        logText: loggerText,
                        officialType: official
                      })
    await log.save().then(request =>{
        console.log('Logging done successfully')
    }).catch(err => {
        console.log(err)
    })
    
}



function universityAuthController(){
    return{
        index(req, res){
            res.render('auth/universities/registration')
        },

        async login(req, res){
            const university = await University.find()

            res.render('auth/universities/login', {university: university})
        },
  
        async registration(req, res){
            
            const {uniName, UGCID, district, city, zipcode, phoneOne, phonetwo, phonethree, officialemail, emailDomain, nameOne, emailOne, designationOne, nameTwo, emailTwo, designationTwo, password, checkerPass } = req.body
            
            /*---------------validate request------------*/ 
            if(!uniName || !district || !city || !zipcode || !phoneOne || !phonetwo || !phonethree || !officialemail || !emailDomain || !nameOne || !emailOne || !designationOne || !nameTwo || !emailTwo || !designationTwo || !password || !checkerPass){
                req.flash('error', 'All Fields are Required for Registration')
                req.flash('uniName', uniName)
                req.flash('UGCID', UGCID)
                req.flash('district', district)
                req.flash('city', city)
                req.flash('zipcode', zipcode)
                req.flash('phoneOne', phoneOne)
                req.flash('phonetwo', phonetwo)
                req.flash('phonethree', phonethree)
                req.flash('officialemail', officialemail)
                req.flash('emailDomain', emailDomain)
                req.flash('nameOne', nameOne)
                req.flash('emailOne', emailOne)
                req.flash('designationOne', designationOne)
                req.flash('nameTwo', nameTwo)
                req.flash('emailTwo', emailTwo)
                req.flash('designationTwo', designationTwo)
                return res.redirect('/university/registration')
            }


            /*-------------check if university name exists------------*/ 
            University.exists({uniName: uniName}, (err, result) =>{
                if(result){
                    req.flash('error', 'University name already exists')
                    req.flash('uniName', uniName)
                    req.flash('UGCID', UGCID)
                    req.flash('district', district)
                    req.flash('city', city)
                    req.flash('zipcode', zipcode)
                    req.flash('phoneOne', phoneOne)
                    req.flash('phonetwo', phonetwo)
                    req.flash('phonethree', phonethree)
                    req.flash('officialemail', officialemail)
                    req.flash('emailDomain', emailDomain)
                    req.flash('nameOne', nameOne)
                    req.flash('emailOne', emailOne)
                    req.flash('designationOne', designationOne)
                    req.flash('nameTwo', nameTwo)
                    req.flash('emailTwo', emailTwo)
                    req.flash('designationTwo', designationTwo)
                    return res.redirect('/university/registration')
                }
            })

            /*-------------check if contact exists------------*/ 
            University.exists({phoneOne: phoneOne}, (err, result) =>{
                if(result){
                    req.flash('error', 'This phone number can"t be used as Phone One')
                    req.flash('uniName', uniName)
                    req.flash('UGCID', UGCID)
                    req.flash('district', district)
                    req.flash('city', city)
                    req.flash('zipcode', zipcode)
                    req.flash('phoneOne', phoneOne)
                    req.flash('phonetwo', phonetwo)
                    req.flash('phonethree', phonethree)
                    req.flash('officialemail', officialemail)
                    req.flash('emailDomain', emailDomain)
                    req.flash('nameOne', nameOne)
                    req.flash('emailOne', emailOne)
                    req.flash('designationOne', designationOne)
                    req.flash('nameTwo', nameTwo)
                    req.flash('emailTwo', emailTwo)
                    req.flash('designationTwo', designationTwo)
                    return res.redirect('/university/registration')
                }
            })

            /*-------------check if contact exists------------*/ 
            University.exists({phonetwo: phonetwo}, (err, result) =>{
                if(result){
                    req.flash('error', 'This phone number can"t be used as Phone Two')
                    req.flash('uniName', uniName)
                    req.flash('UGCID', UGCID)
                    req.flash('district', district)
                    req.flash('city', city)
                    req.flash('zipcode', zipcode)
                    req.flash('phoneOne', phoneOne)
                    req.flash('phonetwo', phonetwo)
                    req.flash('phonethree', phonethree)
                    req.flash('officialemail', officialemail)
                    req.flash('emailDomain', emailDomain)
                    req.flash('nameOne', nameOne)
                    req.flash('emailOne', emailOne)
                    req.flash('designationOne', designationOne)
                    req.flash('nameTwo', nameTwo)
                    req.flash('emailTwo', emailTwo)
                    req.flash('designationTwo', designationTwo)
                    return res.redirect('/university/registration')
                }
            })

                
            /*-------------check if contact exists------------*/ 
            University.exists({phonethree: phonethree}, (err, result) =>{
                if(result){
                    req.flash('error', 'This phone number can"t be used as Phone Three')
                    req.flash('uniName', uniName)
                    req.flash('UGCID', UGCID)
                    req.flash('district', district)
                    req.flash('city', city)
                    req.flash('zipcode', zipcode)
                    req.flash('phoneOne', phoneOne)
                    req.flash('phonetwo', phonetwo)
                    req.flash('phonethree', phonethree)
                    req.flash('officialemail', officialemail)
                    req.flash('emailDomain', emailDomain)
                    req.flash('nameOne', nameOne)
                    req.flash('emailOne', emailOne)
                    req.flash('designationOne', designationOne)
                    req.flash('nameTwo', nameTwo)
                    req.flash('emailTwo', emailTwo)
                    req.flash('designationTwo', designationTwo)
                    return res.redirect('/university/registration')
                }
            })

            /*-------------check if official email exists------------*/ 
            University.exists({officialemail: officialemail}, (err, result) =>{
                if(result){
                    req.flash('error', 'This email can"t be used')
                    req.flash('uniName', uniName)
                    req.flash('UGCID', UGCID)
                    req.flash('district', district)
                    req.flash('city', city)
                    req.flash('zipcode', zipcode)
                    req.flash('phoneOne', phoneOne)
                    req.flash('phonetwo', phonetwo)
                    req.flash('phonethree', phonethree)
                    req.flash('officialemail', officialemail)
                    req.flash('emailDomain', emailDomain)
                    req.flash('nameOne', nameOne)
                    req.flash('emailOne', emailOne)
                    req.flash('designationOne', designationOne)
                    req.flash('nameTwo', nameTwo)
                    req.flash('emailTwo', emailTwo)
                    req.flash('designationTwo', designationTwo)
                    return res.redirect('/university/registration')
                }
            })

            /*------------check mail domain-------------*/ 
            const domain = officialemail.substring(officialemail.lastIndexOf("@") + 1)
            if(domain === "gmail.com"){
                req.flash('error', 'You cannot do registration using gmail')
                req.flash('uniName', uniName)
                req.flash('UGCID', UGCID)
                req.flash('district', district)
                req.flash('city', city)
                req.flash('zipcode', zipcode)
                req.flash('phoneOne', phoneOne)
                req.flash('phonetwo', phonetwo)
                req.flash('phonethree', phonethree)
                req.flash('officialemail', officialemail)
                req.flash('emailDomain', emailDomain)
                req.flash('nameOne', nameOne)
                req.flash('emailOne', emailOne)
                req.flash('designationOne', designationOne)
                req.flash('nameTwo', nameTwo)
                req.flash('emailTwo', emailTwo)
                req.flash('designationTwo', designationTwo)
                return res.redirect('/university/registration')
            }

            if(domain === "yahoo.com"){
                req.flash('error', 'You cannot do registration using yahoo')
                req.flash('uniName', uniName)
                req.flash('UGCID', UGCID)
                req.flash('district', district)
                req.flash('city', city)
                req.flash('zipcode', zipcode)
                req.flash('phoneOne', phoneOne)
                req.flash('phonetwo', phonetwo)
                req.flash('phonethree', phonethree)
                req.flash('officialemail', officialemail)
                req.flash('emailDomain', emailDomain)
                req.flash('nameOne', nameOne)
                req.flash('emailOne', emailOne)
                req.flash('designationOne', designationOne)
                req.flash('nameTwo', nameTwo)
                req.flash('emailTwo', emailTwo)
                req.flash('designationTwo', designationTwo)
                return res.redirect('/university/registration')
            }

            
            /*-------------check if email domain exists------------*/ 
            University.exists({emailDomain: emailDomain}, (err, result) =>{
                if(result){
                    req.flash('error', 'This email domain is already taken')
                    req.flash('uniName', uniName)
                    req.flash('UGCID', UGCID)
                    req.flash('district', district)
                    req.flash('city', city)
                    req.flash('zipcode', zipcode)
                    req.flash('phoneOne', phoneOne)
                    req.flash('phonetwo', phonetwo)
                    req.flash('phonethree', phonethree)
                    req.flash('officialemail', officialemail)
                    req.flash('emailDomain', emailDomain)
                    req.flash('nameOne', nameOne)
                    req.flash('emailOne', emailOne)
                    req.flash('designationOne', designationOne)
                    req.flash('nameTwo', nameTwo)
                    req.flash('emailTwo', emailTwo)
                    req.flash('designationTwo', designationTwo)
                    return res.redirect('/university/registration')
                }
            })
            

            /*-----------check given and mail domain matched or not----------*/ 
            if(emailDomain != domain){
                req.flash('error', 'Given domain and mail domain did not match')
                req.flash('uniName', uniName)
                req.flash('UGCID', UGCID)
                req.flash('district', district)
                req.flash('city', city)
                req.flash('zipcode', zipcode)
                req.flash('phoneOne', phoneOne)
                req.flash('phonetwo', phonetwo)
                req.flash('phonethree', phonethree)
                req.flash('officialemail', officialemail)
                req.flash('emailDomain', emailDomain)
                req.flash('nameOne', nameOne)
                req.flash('emailOne', emailOne)
                req.flash('designationOne', designationOne)
                req.flash('nameTwo', nameTwo)
                req.flash('emailTwo', emailTwo)
                req.flash('designationTwo', designationTwo)
                return res.redirect('/university/registration')
            }

            

            const hash = crypto.createHash('sha256', secret)
                               .update(uniName, UGCID, district, city, zipcode, phoneOne, phonetwo, phonethree, officialemail, emailDomain, nameOne, emailOne, designationOne, nameTwo, emailTwo, designationTwo)
                               .digest('hex');
            console.log("Hash: " + hash)

        
            /*------------hashed password----------*/
            const hashedPassword = await bcrypt.hash(password, 10) 
            const hashedPasswordChecker = await bcrypt.hash(checkerPass, 10) 
            const university = new University({
                    uniqueID: uuid(),
                    uniName,
                    UGCID,
                    district,
                    city,
                    zipcode,
                    phoneOne,
                    phonetwo,
                    phonethree,
                    officialemail,
                    emailDomain,
                    nameOne,
                    emailOne,
                    designationOne,
                    nameTwo,
                    emailTwo, 
                    designationTwo,
                    password: hashedPassword,
                    checkerPassword: checkerPass,
                    hash: hash
            })

            
            /*------socket operation------*/
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('registrationDone', university) 
            var saveSuccess = false 

            /****Saving varsity *** */
            university.save().then(request =>{
                
                saveSuccess = true
                req.flash('success', 'Registration done successfully')
                return res.redirect('/university/registration')
            }).catch(err => {
                console.log(err)
                req.flash('error', 'Something went wrong')
               return res.redirect('/university/registration')
            })

            
          
           
            
        },
        async postLogin(req, res, next){
            const { officialemail, password, employeeEmail,userType } = req.body
            console.log('The request body is ', req.body)

            /*------------validate request---------*/
            if(!officialemail || !password || !employeeEmail){
                req.flash('error', 'All fields are required for login')
                req.flash('officialemail', officialemail)
                req.flash('employeeEmail', employeeEmail)
                return res.redirect('/university/login')
            } 
            const user = await University.findOne({ officialemail: officialemail})
            var message = 'not set'
            if(!user){
                req.flash('error', 'No user exists with this credenetials.Please try again')
                res.redirect('/university/login')
            }
    
            if(user.role !== "University"){
                req.flash('error', 'Your are not authorized to access this feature')
                res.redirect('/university/login')
           }
            
            
            if(user.registrationStatus === 'not_approved'){
                 req.flash('error', 'Your account creation request is pending')
                 res.redirect('/university/login')
            }
            
            console.log('Point 715')
            if(userType === 'maker'){
                console.log('Point 716')
                if(user.emailOne === employeeEmail){
                    console.log('Point 717')
                    await bcrypt.compare(password, user.password).then(match =>{
                        if(match){
                            console.log('Match Happened')
                            req.session.user=user
                            req.session.uniUserType='maker'
                            res.redirect('/university/dashboard')
                        }
                    }).catch(err =>{
                        console.log(err)            
                    })
                }
                else{
                    req.flash('error','Your credentials might be wrong.Please try again')
                    console.log('Maker Login unsuccessful.')
                    res.redirect('/university/login')
                }

            }
            console.log('Point 718')
            if (userType === 'checker'){
                console.log('Point 719')
                if(user.emailTwo === employeeEmail){
                    console.log('Point 720')
                    await bcrypt.compare(password, user.password).then(match =>{
                        if(match){
                            console.log('Checker login success')
                            req.session.user=user
                            req.session.uniUserType='checker'
                            res.redirect('/university/checker/dashboard')
                        }
                    }).catch(err =>{
                        console.log(err)            
                    })
                }
                else{
                    console.log('Checker Login unsuccessful.')
                }
            }
            // else{
            //     /*--------------compare password with hashed password----------*/
            //    await bcrypt.compare(password, user.password).then(match =>{
            //         if(match){
            //             if(user.emailOne !== employeeEmail){ //checking if user is Maker or not
            //                 req.flash('error',"You're not authorized to access this resource")
            //                 //res.redirect('/university/login')
            //                 console.log('unauthorized email one ')
            //             }
            //             else{
            //              message ='Logged in successfully'
            //              req.session.user = user 
            //              req.session.userStatus = 'Maker'
            //              //res.redirect('/university/dashboard') // Maker Dashboard
            //              console.log('Maker')
            //             }
            //         }
            //         else{

            //             bcrypt.compare(password, user.checkerPassword).then(match =>{
            //                 if(match){ 
            //                      if(user.emailTwo!==employeeEmail){
            //                         req.flash('error',"You're not authorized to access this resource")
            //                        // res.redirect('/university/login')
            //                         console.log('unauthorized email two')
            //                      }
            //                      else{
            //                         message ='Logged in successfully'
            //                         req.session.user = user 
            //                         req.session.userStatus = 'Checker'
            //                         console.log('Checker')
            //                        // res.render('universities/checker/approval.ejs') 
                                    
            //                      }
            //                 }
            //                 else{
            //                     req.flash('error',"Password not matching")
            //                     console.log('No Password Match')
            //                    // res.render('/university/login')
                                
            //                 }
            //             }).catch(err =>{
            //                 console.log(err)
                            
            //             }) 
            //         }
            //     }).catch(err =>{
            //         console.log(err)            
            //     }) 
            // }//else
           
            // req.flash('error',"Something went wrong. Try again please")
            // console.log('Something went wrong. Try again please')
            // res.redirect('/university/login')
            
            
        },

        sessionTest(req, res){
            res.json(req.session.user)
        },

        sessionDestroy(req, res){
            req.session.destroy()
        },
    /**********Experimental function. Not to be used in production ************  */
       async fetchData(req,res){
            
             var ugc = await UGC.findOne()
            .then(function(result){
                 //ugc = result 
                if (result)
                    result.phoneOne = "090q34234" 
                    result.save()
                    req.session.ugcid = result._id 
                    console.log(req.session)               
                               
            })
            .catch((err)=>console.log(err))
            console.log('here it comes')
            console.log(req.session.ugcid)

            var ugc2= await UGC.findByIdAndUpdate(req.session.ugcid,{phoneOne:'010100001'},{useFindAndModify:false})
            console.log('here it comes again')
            console.log(ugc2.updatedAt)
            console.log(ugc2.createdAt)
        },

        /* For experimental purpose only */
        async fetchUniversity(req,res){
            let univ
            let exp = false 
            await University.find({},(err,res)=>{
                if(err)
                    console.log(err)
                else{
                    univ = res
                    exp  = true
                    console.log(res)
                }
            })
           
            
        },

        /* For experimental purpose only */
        async fetchUniNames(req,res){
            let univ
            let exp = false 
            await University.find({},'uniName',(err,res)=>{
                if(err)
                    console.log(err)
                else{
                    univ = res
                    exp  = true
                    console.log(res)
                }
            })
           
            
        },

        /* For experimental purpose only */
        async fetchLog(req,res){
            uniEventLogger('','','')
            await Log.find({},(err,res)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log(res)
                }
            })
        },


        /* For experimental purpose only */
        async fetchQR(req,res){
           res.render('universities/students/qr')
        }

        
    }
}

module.exports = universityAuthController