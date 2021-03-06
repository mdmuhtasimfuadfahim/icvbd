const crypto = require('crypto')
const secret = process.env.SECRET_TO_HASH_DB_VALUES
const { v4:  uuid} = require('uuid')
const Certificate = require('../../../models/certificate')
const Other = require('../../../models/other')
const Student = require('../../../models/student')
const moment = require('moment')
const axios = require('axios')
const bcrypt = require('bcrypt')
var nodemailer = require('nodemailer')

//const helper = require('../../../helper')

/** Helper Function for sending Email */
function emailToStudent (certificate_id){
    
    var transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jaylan.cummerata13@ethereal.email',
            pass: 'RcPDY8TjPF19ZHXS1E'
        }
      });
      
      var mailOptions = {
        from: email_address_personal,
        to: 'get.mitun@gmail.com',
        subject: 'Your UGC UniChain Certificate is Ready!!',
        text: 'Congrats! Certificate has been added to blockchain with certificate ID:' + certificate_id
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


function ugcDashboardController(){
    return{
        /*** Displays UGC Dashborad **/
        dashboardRender(req, res){
            console.log(req.session.user)
            res.render('ugc/dashboard',{certificate:[], moment:moment, empty:true, user:req.session.user})
        },

        /** Single Certificate Search for UGC **/
        async verifyCertificate(req,res){
            //UGC can search for approved certificates only
            if(!req.body.uniqueID)
                res.render('ugc/dashboard',{certificate:[], moment:moment, empty:true, user:req.session.user})
            const certificate = await Certificate.findOne({uniqueID : req.body.uniqueID,isVerified:'approved' },(err,result)=>{
                if(err){
                    console.log(error)
                }
                if(result){  
                //    console.log('route1')      
                   res.render('universities/certificate/readOnly',{certificate:result, moment:moment, empty:false, user:req.session.user})
                }else{
                //    console.log('route2')    
                   req.flash('error','No certificate with this id found')
                   res.render('ugc/dashboard', {certificate:null,moment:moment,empty:true, user:req.session.user})
                }
                
            })
        },

        /** Displays registration form for third party  */
        async showThirdPartyRegistrationForm(req,res){
            res.render('ugc/other/createOther')
        },

        /** Processes Registration fornm for third party  */
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
                return res.redirect('/ugc/client/create')
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
                    return res.redirect('/ugc/client/create')
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
                    return res.redirect('/ugc/client/create')
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
                    return res.redirect('/ugc/client/create')
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
                    return res.redirect('/ugc/client/create')
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
                    return res.redirect('/ugc/client/create')
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
                    return res.redirect('/ugc/client/create')
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
                return res.redirect('/ugc/client/create')
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
                return res.redirect('/ugc/client/create')
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
                return res.redirect('/ugc/client/create')
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
                return res.redirect('/ugc/client/create')
            }


            const hash = crypto.createHash('sha256', secret)
                               .update(orgName, typeOfOrg, country,state, city, zipcode, phoneOne, phonetwo, phonethree, officialemail, emailDomain, nameOne, designationOne)
                               .digest('hex');
            console.log("ash: " + hash)
            /*------------hashed password----------*/
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log("HashedPassword: " + hash) 

            /*------------Create object and save to DB-------------- */
            try{
            var other = new Other({
                    uniqueID: uuid(),
                    orgName:orgName,
                    typeOfOrg:typeOfOrg,
                    country:country,
                    state:state,
                    city:city,
                    zipcode:zipcode,
                    phoneOne:phoneOne,
                    phonetwo:phonetwo,
                    phonethree:phonethree,
                    officialemail:officialemail,
                    emailDomain:emailDomain,
                    nameOne:nameOne,
                    emailOne:emailOne,
                    designationOne:designationOne,
                    password: hashedPassword,
                    registrationStatus: 'approved',
                    hash: hash
            })
            }catch(err){
                console.log(err)
            }
            console.log('Point 5452')
            console.log(other)
            await other.save().then(request =>{
                console.log('Point save success')
                req.flash('success', 'Registration done successfully')
                emailToStudent('6180ef2e59010302006b1b18')
                
            }).catch(err => {
                console.log("Error Message initiating")
                console.log(err)
                req.flash('error', 'Something went wrong')
                return res.redirect('/ugc/client/create')
            })
``
            return res.redirect('/ugc/client/create')
              
        },
        /****Experimental function */
        async fetchOther(req,res){
            await Other.find({},(err,result)=>{
                if(err){console.log(err)}
                if(result){
                    console.log("Number of results are ",result.length)
                    result.forEach(element => {
                        console.log(element);
                      });
                }
                
            })
        }
    }
}


module.exports = ugcDashboardController