const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')
const Student = require('../../../models/student')
const Certificate = require('../../../models/certificate')
const University = require('../../../models/university')
const passport = require('passport')
// const University = require('../../../models/university')
const crypto = require('crypto')
const secret = process.env.SECRET_TO_HASH_DB_VALUES
const moment = require('moment')



async function fetchUniNames(){
    
    await University.find({},'uniName',(err,result)=>{
        if(err)
            console.log(err)
        else{  
            console.log(result)
            return(result)
        }
    })
   
    
}
/*---------------Controller---------- */
function studentAuthController(){
    return{
        async index(req, res){
            await University.find({},'-_id uniName',(err,result)=>{
                if(err)
                    console.log(err)
                else{  
                    console.log(result)
                    res.render('auth/students/registration', {uniNames: result} )
                }
            })
            
        },
        login(req, res){
            res.render('auth/students/login')
        },
        /*----------------Handles POST from student registration form------------ */
        async registration(req, res){
            const {firstName, lastName, fatherName, mohterName, dob, uniName, studentEmail,personalEmail, studentID, phone, address, password, confirmPass } = req.body
            
            /*---------------validate request------------*/ 
            if(!firstName  || !dob || !uniName || !studentEmail || !personalEmail||!studentID || !phone || !address || !password || !confirmPass){
                req.flash('error', 'All Fields are Required for Registration')
                req.flash('firstName', firstName)
                req.flash('fatherName', fatherName)
                req.flash('mohterName', mohterName)
                req.flash('lastName', lastName)
                req.flash('dob', dob)
                req.flash('uniName', uniName)
                req.flash('studentEmail', studentEmail)
                req.flash('personalEmail', personalEmail)
                req.flash('studentID', studentID)
                req.flash('phone', phone)
                req.flash('address', address)
                return res.redirect('/student/registration')
            }

            /*-------------check if student academic email exists within university------------*/ 
            Student.exists({studentEmail: studentEmail,uniName:uniName}, (err, result) =>{
                if(result){
                    req.flash('error', 'This academic email is already registered')
                    req.flash('firstName', firstName)
                    req.flash('fatherName', fatherName)
                    req.flash('mohterName', mohterName)
                    req.flash('lastName', lastName)
                    req.flash('dob', dob)
                    req.flash('uniName', uniName)
                    req.flash('studentEmail', studentEmail)
                    req.flash('personalEmail', personalEmail)
                    req.flash('studentID', studentID)
                    req.flash('phone', phone)
                    req.flash('address', address)
                    return res.redirect('/student/registration')
                }
            })

            /*-------------check if student academic email exists------------*/ 
            Student.exists({personalEmail: personalEmail,uniName:uniName}, (err, result) =>{
                if(result){
                    req.flash('error', 'This academic email is already registered')
                    req.flash('firstName', firstName)
                    req.flash('fatherName', fatherName)
                    req.flash('mohterName', mohterName)
                    req.flash('lastName', lastName)
                    req.flash('dob', dob)
                    req.flash('uniName', uniName)
                    req.flash('studentEmail', studentEmail)
                    req.flash('personalEmail', personalEmail)
                    req.flash('studentID', studentID)
                    req.flash('phone', phone)
                    req.flash('address', address)
                    return res.redirect('/student/registration')
                }
            })


            /*-------------check if Student ID exists------------*/ 
            Student.exists({studentID: studentID,uniName:uniName}, (err, result) =>{
                if(result){
                    req.flash('error', 'Studen ID already exists')
                    req.flash('firstName', firstName)
                    req.flash('fatherName', fatherName)
                    req.flash('mohterName', mohterName)
                    req.flash('lastName', lastName)
                    req.flash('dob', dob)
                    req.flash('uniName', uniName)
                    req.flash('studentEmail', studentEmail)
                    req.flash('personalEmail', personalEmail)
                    req.flash('studentID', studentID)
                    req.flash('phone', phone)
                    req.flash('address', address)
                    return res.redirect('/student/registration')
                }
            })

            /*-------------check if Phone number already exists------------*/ 
            Student.exists({phone: phone}, (err, result) =>{
                if(result){
                    req.flash('error', 'Contact number is already exists')
                    req.flash('firstName', firstName)
                    req.flash('fatherName', fatherName)
                    req.flash('mohterName', mohterName)
                    req.flash('lastName', lastName)
                    req.flash('dob', dob)
                    req.flash('uniName', uniName)
                    req.flash('studentEmail', studentEmail)
                    req.flash('personalEmail', personalEmail)
                    req.flash('studentID', studentID)
                    req.flash('phone', phone)
                    req.flash('address', address)
                    return res.redirect('/student/registration')
                }
            })

            /*-----------check if student email domain is gmail.com---------*/ 
            const domain = studentEmail.substring(studentEmail.lastIndexOf("@") + 1)
            if(domain === "gmail.com"){
                req.flash('error', 'You cannot do registration using gmail')
                req.flash('firstName', firstName)
                req.flash('fatherName', fatherName)
                req.flash('mohterName', mohterName)
                req.flash('lastName', lastName)
                req.flash('dob', dob)
                req.flash('uniName', uniName)
                req.flash('studentEmail', studentEmail)
                req.flash('studentID', studentID)
                req.flash('phone', phone)
                req.flash('address', address)
                return res.redirect('/student/registration')
            }

            /*-----------check if student email domain is yahoo.com---------*/ 
            if(domain === "yahoo.com"){
                req.flash('error', 'You cannot do registration using yahoo')
                req.flash('firstName', firstName)
                req.flash('fatherName', fatherName)
                req.flash('mohterName', mohterName)
                req.flash('lastName', lastName)
                req.flash('dob', dob)
                req.flash('uniName', uniName)
                req.flash('studentEmail', studentEmail)
                req.flash('personalEmail', personalEmail)
                req.flash('studentID', studentID)
                req.flash('phone', phone)
                req.flash('address', address)
                return res.redirect('/student/registration')
            }

 
            /*------------check password and confirm password matched or not----------*/ 
            if(password != confirmPass){
                req.flash('error', 'Password and confirm password didnot matched')
                req.flash('firstName', firstName)
                req.flash('fatherName', fatherName)
                req.flash('mohterName', mohterName)
                req.flash('lastName', lastName)
                req.flash('dob', dob)
                req.flash('uniName', uniName)
                req.flash('studentEmail', studentEmail)
                req.flash('personalEmail', personalEmail)
                req.flash('studentID', studentID)
                req.flash('phone', phone)
                req.flash('address', address)
                return res.redirect('/student/registration')
            }
            const hash = crypto.createHash('sha256', secret)
                               .update(firstName, fatherName, mohterName, lastName, dob, uniName, studentEmail,personalEmail,studentID, phone, address)
                               .digest('hex');
            console.log("Hash: " + hash)

            /*------------hashed password----------*/
            const hashedPassword = await bcrypt.hash(password, 10) 
            const student = new Student({
                    uniqueID: uuid(),
                    firstName,
                    fatherName,
                    mohterName,
                    lastName,
                    dob,
                    uniName,
                    studentEmail,
                    personalEmail,
                    studentID,
                    phone,
                    address,
                    password: hashedPassword,
                    hash: hash
            })
            console.log(student)
            student.save().then(request =>{
                req.flash('success', 'Registration done successfully. You will be able to login after your account request is accepted. Contact your university authority for further information')
                return res.redirect('/student/registration')
            }).catch(err => {
                console.log(err)
                req.flash('error', 'Something went wrong')
                return res.redirect('/student/registration')
            })

        },

        /*---------Handles POST for login form ----------- */
        async postLogin(req, res, next){
            const { studentEmail, password } = req.body

            /*------------validate request---------*/
            if(!studentEmail || !password){
                req.flash('error', 'All fields are required for login')
                req.flash('studentEmail', studentEmail)
                return res.redirect('/student/login')
            } 

            const user = await Student.findOne({ studentEmail: studentEmail})
            var message = 'not set'
            if(!user){
                req.flash('error', 'No user exists with this credentials')
                res.redirect('/student/login')
            }
    
            if(user.registrationStatus === 'not_approved'){
                 req.flash('error', 'Your account creation request is pending')
                 res.redirect('/student/login')
            }
            if(user.role !== "Student"){
                req.flash('error', 'Your are not authorized to access this feature')
                res.redirect('/student/login')
           }
            else{
                /*--------------compare password with hashed password----------*/
                bcrypt.compare(password, user.password).then(match =>{
                    if(match){
                         message ='Logged in successfully'
                         req.session.user = user 
                         res.redirect('/student/dashboard')
                        
                    }
                    else{
                        message="Password not matching"
                    }
                }).catch(err =>{
                    console.log(err)
                    
                }) 
            } 

        },

        /** Experimental */
        async fetchData(req, res){
            const students = await Student.find({ })
            res.json(students)
        },
        /** Experimental */
        async editData(req, res){
            Student.update({}, {"certificateRequest": 'yes'},{multi:true},
            (err,result)=>{
                if(result)
                    console.log(result)
                else
                    console.log(err)
            });
        },

        /*-----Handles Student view for his/her certificate------ */
        async studentCertificate(req,res){
            
            if(!req.session.user.studentID){
                req.flash('error','Something went wrong. Try again please')
                res.redirect('/student/login')
            }
            console.log(req.session.user.studentID)
            const certificate = await Certificate.findOne({student_id: req.session.user.studentID,university_name:req.session.user.uniName},(err,result)=>{
                if(result){
                   console.log(result)
                   res.render('students/mycertificate',{certificate:result,moment:moment,empty:false})
                }else{
                   console.log('Reached this point')
                   res.render('students/mycertificate', {certificate:[],moment:moment,empty:true})
                }
                
            })
            
            
        },

        /*** View QR Code ***/
        async viewStudentCertificateQR(req,res){
           
            const certificate = await Certificate.findOne({student_id: req.session.user.studentID,university_name:req.session.user.uniName},(err,result)=>{
                if(err)
                   console.log(err)
                if(result){
                   console.log(result)
                   let publicQRLink = req.headers.host + "/student/public/certificate/" + result.uniqueID
                   res.render('students/qr',{certificate:result,moment:moment,empty:false,publicURL:publicQRLink})
                }else{
                   console.log('came here')
                   res.render('students/qr', {certificate:[],moment:moment,empty:true})
                }
                
            })

        },

        /*** Public View after scanning QR Code
         * Students can view certificate result after scanning QR code without login
         * UGC and any one can view this link after scanning QR code
         * ***/
        async viewPublicStudentCertificateQR(req,res){
            uniqueID = req.params.id
            const certificate = await Certificate.findOne({uniqueID: uniqueID},(err,result)=>{
                if(err)
                   console.log(err)
                if(result){
                   console.log(result)
                   let publicQRLink = req.headers.host + "/student/public/certificate/" + result.uniqueID
                   res.render('students/postQrScan',{certificate:result,moment:moment,empty:false,publicURL:publicQRLink})
                }else{
                   console.log('came here')
                   res.render('students/postQrScan', {certificate:[],moment:moment,empty:true})
                }
                
            })

        }
    }
}


module.exports = studentAuthController