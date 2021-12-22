const Other = require('../../../models/other')
const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')
const passport = require('passport')
const crypto = require('crypto')
const secret = process.env.SECRET_TO_HASH_DB_VALUES

function otherAuthController(){
    return{
        index(req, res){
            res.render('auth/others/registration')
        },
        login(req, res){
            res.render('auth/others/login')
        },
        async registration(req, res){
            const {orgName, typeOfOrg, country, state, city, zipcode, phoneOne, phonetwo, phonethree, officialemail, emailDomain, nameOne, emailOne, designationOne, password, confirmPass } = req.body

            /*---------------validate request------------*/ 
            if(!orgName || !typeOfOrg || !country || !state || !city || !zipcode || !phoneOne || !phonetwo || !phonethree || !officialemail || !emailDomain || !nameOne || !emailOne || !designationOne || !password || !confirmPass){
                req.flash('error', 'All Fields are Required for Registration')
                req.flash('orgName', orgName)
                req.flash('typeOfOrg', typeOfOrg)
                req.flash('country', country)
                req.flash('state', state)
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
                return res.redirect('/other/registration')
            }

            /*-------------check if contact exists------------*/ 
            Other.exists({orgName: orgName}, (err, result) =>{
                if(result){
                    req.flash('error', 'Organization name already exists')
                    req.flash('orgName', orgName)
                    req.flash('typeOfOrg', typeOfOrg)
                    req.flash('country', country)
                    req.flash('state', state)
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
                    return res.redirect('/other/registration')
                }
            })

            /*-------------check if contact exists------------*/ 
            Other.exists({phoneOne: phoneOne}, (err, result) =>{
                if(result){
                    req.flash('error', 'Contact one is already exists')
                    req.flash('orgName', orgName)
                    req.flash('typeOfOrg', typeOfOrg)
                    req.flash('country', country)
                    req.flash('state', state)
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
                    return res.redirect('/other/registration')
                }
            })

            /*-------------check if contact exists------------*/ 
            Other.exists({phonetwo: phonetwo}, (err, result) =>{
                if(result){
                    req.flash('error', 'Contact two is already exists')
                    req.flash('orgName', orgName)
                    req.flash('typeOfOrg', typeOfOrg)
                    req.flash('country', country)
                    req.flash('state', state)
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
                    return res.redirect('/other/registration')
                }
            })

            /*-------------check if contact exists------------*/ 
            Other.exists({phonethree: phonethree}, (err, result) =>{
                if(result){
                    req.flash('error', 'Contact three is already exists')
                    req.flash('orgName', orgName)
                    req.flash('typeOfOrg', typeOfOrg)
                    req.flash('country', country)
                    req.flash('state', state)
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
                    return res.redirect('/other/registration')
                }
            })
            /*-------------check if official email exists------------*/ 
            Other.exists({officialemail: officialemail}, (err, result) =>{
                if(result){
                    req.flash('error', 'This email is already taken')
                    req.flash('orgName', orgName)
                    req.flash('typeOfOrg', typeOfOrg)
                    req.flash('country', country)
                    req.flash('state', state)
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
                    return res.redirect('/other/registration')
                }
            })

            /*-------------check if email domain exists------------*/ 
            Other.exists({emailDomain: emailDomain}, (err, result) =>{
                if(result){
                    req.flash('error', 'This email domain is already taken')
                    req.flash('orgName', orgName)
                    req.flash('typeOfOrg', typeOfOrg)
                    req.flash('country', country)
                    req.flash('state', state)
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
                    return res.redirect('/other/registration')
                }
            })

            /*------------check mail domain-------------*/ 
            const domain = officialemail.substring(officialemail.lastIndexOf("@") + 1)
            if(domain === "gmail.com"){
                req.flash('error', 'You cannot do registration using gmail')
                req.flash('orgName', orgName)
                req.flash('typeOfOrg', typeOfOrg)
                req.flash('country', country)
                req.flash('state', state)
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
                return res.redirect('/other/registration')
            }

            if(domain === "yahoo.com"){
                req.flash('error', 'You cannot do registration using yahoo')
                req.flash('orgName', orgName)
                req.flash('typeOfOrg', typeOfOrg)
                req.flash('country', country)
                req.flash('state', state)
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
                return res.redirect('/other/registration')
            }

            
            /*-----------check given and mail domain matched or not----------*/ 
            if(emailDomain != domain){
                req.flash('error', 'Given domain and mail domain didnot matched')
                req.flash('orgName', orgName)
                req.flash('typeOfOrg', typeOfOrg)
                req.flash('country', country)
                req.flash('state', state)
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
                return res.redirect('/other/registration')
            }

            /*-----------check password and confirm password matched or not---------*/ 
            if(password != confirmPass){
                req.flash('error', 'Password and confirm password didnot matched')
                req.flash('orgName', orgName)
                req.flash('typeOfOrg', typeOfOrg)
                req.flash('country', country)
                req.flash('state', state)
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
                return res.redirect('/other/registration')
            }


            const hash = crypto.createHash('sha256', secret)
                               .update(orgName, typeOfOrg, country,state, city, zipcode, phoneOne, phonetwo, phonethree, officialemail, emailDomain, nameOne, designationOne)
                               .digest('hex');
            console.log("Hash: " + hash)
            /*------------hashed password----------*/
            const hashedPassword = await bcrypt.hash(password, 10) 
            const other = new Other({
                    uniqueID: uuid(),
                    orgName,
                    typeOfOrg,
                    country,
                    state,
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
                    password: hashedPassword,
                    hash: hash
            })
            console.log(other)
            other.save().then(request =>{
                req.flash('success', 'Registration done successfully')
                return res.redirect('/other/registration')
            }).catch(err => {
                console.log(err)
                req.flash('error', 'Something went wrong')
                return res.redirect('/other/registration')
            })
              
        },
        async postLogin(req, res, next){
            const { officialemail, password } = req.body
            /*------------validate request---------*/
            if(!officialemail || !password){
                req.flash('error', 'All fields are required for login')
                req.flash('officialemail', officialemail)
                req.flash('password', password)
                return res.redirect('/other/login')
            } 
            
            const user = await Other.findOne({ officialemail: officialemail})
            var message = 'not set'
            if(!user){
                message = 'No account exits with this email'
            }
    
            if(user.role !== "Other"){
                req.flash('error', 'Your are not authorized to access this feature')
                res.redirect('/other/login')
           }
            
            
            if(user.registrationStatus === 'not_approved'){
                 req.flash('error', 'Your account creation request is pending')
                 res.redirect('/other/login')
            }
            
            else{
                /*--------------compare password with hashed password----------*/
                bcrypt.compare(password, user.password).then(match =>{
                    if(match){
                         message ='Logged in successfully'
                         req.session.user = user 
                         res.redirect('/other/dashboard')
                    }
                    else{
                        message="Passwords not matching"
                        res.redirect('/other/login')
                    }
                }).catch(err =>{
                    console.log(err)
                    
                }) 
            }
            

        },

        /**********Experimental function. Not to be used in production ************  */
       async fetchData(req,res){
        const property = await Other.countDocuments()
        console.log(property)
        var other = await Other.findOne()
       .then(function(result){
            //ugc = result 
           if (result)
               console.log(result)
               console.log(req.session)               
                          
       })
       .catch((err)=>console.log(err))
       console.log('here it comes')
       console.log(req.session)

       
   }
    }
}

module.exports = otherAuthController