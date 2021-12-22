const crypto = require('crypto')
const secret = process.env.SECRET_TO_HASH_DB_VALUES
const { v4:  uuid} = require('uuid')
const Certificate = require('../../../models/certificate')
const Other = require('../../../models/other')
const Student = require('../../../models/student')
const moment = require('moment')
const axios = require('axios')
const bcrypt = require('bcrypt')
//const helper = require('../../../helper')



function ugcDashboardController(){
    return{
        dashboardRender(req, res){
            console.log(req.session.user)
            res.render('ugc/dashboard',{certificate:[], moment:moment, empty:true, user:req.session.user})
        },
        async verifyCertificate(req,res){
    
            if(!req.body.uniqueID)
                res.render('ugc/dashboard',{certificate:[], moment:moment, empty:true, user:req.session.user})
            const certificate = await Certificate.findOne({uniqueID : req.body.uniqueID },(err,result)=>{
                if(err){
                    console.log(error)
                }
                if(result){  
                //    console.log('route1')      
                   res.render('ugc/dashboard',{certificate:result, moment:moment, empty:false, user:req.session.user})
                }else{
                //    console.log('route2')    
                   req.flash('error','No certificate with this id found')
                   res.render('ugc/dashboard', {certificate:null,moment:moment,empty:true, user:req.session.user})
                }
                
            })
        },
        async showThirdPartyRegistrationForm(req,res){
            res.render('ugc/other/createOther')
        },
        async thirdPartyRegistration(req, res){
            console.log(req.body)
            
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
                    registrationStatus: 'approved',
                    hash: hash
            })
            console.log(other)
            await other.save().then(request =>{
                req.flash('success', 'Registration done successfully')
               // helper.emailToStudent('6180ef2e59010302006b1b18','get.mitun@gmail.com')
                
            }).catch(err => {
                console.log(err)
                req.flash('error', 'Something went wrong')
                return res.redirect('/ugc/client/create')
            })

            return res.redirect('/ugc/client/create')
              
        },
    }
}


module.exports = ugcDashboardController