const crypto = require('crypto')
const secret = process.env.SECRET_TO_HASH_DB_VALUES
const { v4:  uuid} = require('uuid')
const Certificate = require('../../../models/certificate')
const Student = require('../../../models/student')
const Log = require('../../../models/logging')
const moment = require('moment')
const axios = require('axios')
const { debuglog } = require('util')
var nodemailer = require('nodemailer')


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

function emailToStudent(certificate_id,email_address_personal='get.mitun@gamil.com'){
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





/* Creates Certificate */ 
function universityCertificateController(){
    return{
        fromRender(req, res){
            res.render('universities/certificate/createForm',{user:req.session.user})
        },
        /* Shows a list of approved certificate */ 
        async tableRender(req, res){
            const certificate = await Certificate.find({university_name:req.session.user.uniName,isVerified:'approved'})
            res.render('universities/certificate/certifcateTable', {certificate: certificate, moment: moment,user:req.session.user})
        },
        updateForm(req, res){
            axios.get(`${process.env.APP_BASE_URL}/university/certificate/update`, { params : { id : req.query.id }}).then((certificateData) =>{
                 console.log(certificateData.data)
                res.render('universities/certificate/updateForm', { certificate : certificateData.data})
            }).catch(err =>{
                res.send(err)
            })
        },

        /*******Certificate Creation by Maker *****/
        createCertificate(req, res){
            const { full_name, email_address, email_address_personal, student_id, credit, courses, university_name, major, cgpa, minor, dob, gender, doa, dog,father_name,mother_name } = req.body
            //console.log(req.body)
           
            /*------------validate request----------*/
            if(!full_name || !email_address || !student_id || !credit || !courses || !university_name || !major || !cgpa || !minor || !dob|| !gender || !doa || !dog || !father_name|| !mother_name){
                req.flash('error', 'All Fields are Required for Cerating a Certificate')
                req.flash('full_name', full_name)
                req.flash('email_address', email_address)
                req.flash('email_address_personal', email_address_personal)
                req.flash('student_id', student_id)
                req.flash('credit', credit)
                req.flash('courses', courses)
                req.flash('university_name', university_name)
                req.flash('major', major)
                req.flash('cgpa', cgpa)
                req.flash('minor', minor)
                req.flash('dob', dob)
                req.flash('gender', gender)
                req.flash('doa', doa)
                req.flash('dog', dog)
                req.flash('father_name',father_name)
                req.flash('mother_name',mother_name)
                return res.redirect('/university/certificate/form')
            }


            /*-------------check if student email exists------------*/ 
            Certificate.exists({email_address: email_address}, (err, result) =>{
                if(result){
                    req.flash('error', 'This Email is Already Exists')
                    req.flash('full_name', full_name)
                    req.flash('email_address', email_address)
                    req.flash('email_address_personal', email_address_personal)
                    req.flash('student_id', student_id)
                    req.flash('credit', credit)
                    req.flash('courses', courses)
                    req.flash('university_name', university_name)
                    req.flash('major', major)
                    req.flash('cgpa', cgpa)
                    req.flash('minor', minor)
                    req.flash('dob', dob)
                    req.flash('gender', gender)
                    req.flash('doa', doa)
                    req.flash('dog', dog)
                    req.flash('father_name',father_name)
                    req.flash('mother_name',mother_name)
                    return res.redirect('/university/certificate/form')
                }


                /*-------------check if student ID exists------------*/ 
                Certificate.exists({student_id: student_id}, (err, result) =>{
                    if(result){
                        req.flash('error', 'This Student ID is Already Exists')
                        req.flash('full_name', full_name)
                        req.flash('email_address', email_address)
                        req.flash('email_address_personal', email_address_personal)
                        req.flash('student_id', student_id)
                        req.flash('credit', credit)
                        req.flash('courses', courses)
                        req.flash('university_name', university_name)
                        req.flash('major', major)
                        req.flash('cgpa', cgpa)
                        req.flash('minor', minor)
                        req.flash('dob', dob)
                        req.flash('gender', gender)
                        req.flash('doa', doa)
                        req.flash('dog', dog)
                        req.flash('father_name',father_name)
                        req.flash('mother_name',mother_name)
                        return res.redirect('/university/certificate/form')
                    }
                })

                /*-------check major and minor are same or not-----------*/
                if(major === minor){
                    req.flash('error', 'Major and Minor cannot be same')
                    req.flash('full_name', full_name)
                    req.flash('email_address', email_address)
                    req.flash('email_address_personal', email_address_personal)
                    req.flash('student_id', student_id)
                    req.flash('credit', credit)
                    req.flash('courses', courses)
                    req.flash('university_name', university_name)
                    req.flash('major', major)
                    req.flash('cgpa', cgpa)
                    req.flash('minor', minor)
                    req.flash('dob', dob)
                    req.flash('gender', gender)
                    req.flash('doa', doa)
                    req.flash('dog', dog)
                    req.flash('father_name',father_name)
                    req.flash('mother_name',mother_name)
                    return res.redirect('/university/certificate/form')
                } 

                const hash = crypto.createHash('sha256', secret)
                                   .update(full_name, email_address, student_id, credit, courses, university_name, major, cgpa, minor, dob, gender, doa, dog)
                                   .digest('hex');
            
                const certificate = new Certificate({
                    // universityID: req.body._id,
                    // studentID,
                    uniqueID: uuid(),
                    full_name,
                    email_address, 
                    email_address_personal,
                    student_id,
                    credit,
                    courses,
                    university_name:req.session.user.uniName,
                    major,
                    cgpa, 
                    minor, 
                    dob, 
                    gender, 
                    doa, 
                    dog,
                    hash: hash,
                    father_name,
                    mother_name,
                })

                console.log(certificate)
                var saveSuccess= false
                certificate.save().then(request =>{
                    saveSuccess = true
                    console.log('certificate saved')
                    Student.update({studentID:student_id}, {certificateRequest: 'processing'},{multi:true},
                        (err,result)=>{
                            if(err)
                                console.log(err)
                        });

                    let sessionUniName      = req.session.user.uniName
                    let loggerText   = req.session.user.uniName + " 'Maker' created a certificate pending validation by 'Checker'"
                    let officialType = 'Maker'
                    uniEventLogger(sessionUniName, loggerText, officialType)
                    console.log('point 414')
                    req.flash('success', 'Certificate Created Successfully')
                    return res.redirect('/university/certificate/form')
                }).catch(err => {
                    console.log(err)
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/university/certificate/form')
                })

               
            })
        },
        postFind(req, res){
            if(req.query.id){
                const id = req.query.id
                console.log(id)
                Certificate.findById(id).then(certificate =>{
                    if(!certificate){
                        res.status(404).send({ message: `Not Found Any Certificate with this ${id}`})
                    }else{
                        res.send(certificate)
                    }
                }).catch(err =>{
                    res.status(500).send({ message: `Error While Retriving Certificate with this ${id}`})
                })
            }
            else{
                Certificate.find().then(certificate =>{
                    res.send(certificate)
                }).catch(err =>{
                    res.status(500).send({ message: err.message || 'Error Occurred While Retriving Certificate Information' })
                })
            }
        },
        postUpdate(req, res){
            if(!req.body){
                return res.status(400).send({ message: 'Data to Update can not be Empty'})
            }
            
            const id = req.params.id
            Certificate.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(certificate =>{
                if(!certificate){
                    res.status(404).send({ message: `Cannot Update Certificate info with ${id}. Maybe Certificate not Found`})
                }else{
                    res.send(certificate)
                }
            }).catch(err =>{
                res.status(500).send({ message: 'Error in Updating Certificate Information'})
            })
        },
        postDelete(req, res){
            const id = req.params.id

            Certificate.findByIdAndDelete(id).then(certificate =>{
                if(!certificate){
                    res.status(404).send({ message: `Cannot Delete Certificate with ${id}. Maybe Id is not Correct`})
                }
                else{
                    res.send({ message: 'Certificate Deleted Successfully'})
                }
            }).catch(err =>{
                res.status(500).send({ message: `Cound not Delete Certificate with this ${id}}`})
            })
        },
        showReadOnly(req, res){
            axios.get(`${process.env.APP_BASE_URL}/university/certificate/update`, { params : { id : req.query.id }}).then((certificateData) =>{
                console.log(certificateData.data)
               res.render('universities/certificate/readOnly', { certificate : certificateData.data, moment: moment})
           }).catch(err =>{
               res.send(err)
           })
        },
        

        /***  ***/
        async makerViewsPending(req,res){
            console.log('message from makerViewsPending')
            university_name = req.session.user.uniName
            const certificates = await Certificate.find({isVerified:'not_verified',university_name:university_name}, null, {sort: { 'createdAt': -1 }})
            res.render('universities/maker/pending-certificates',{certificates:certificates,moment:moment})
        },

        /* Checker Dashboard Controller */
        async checkerDashboard(req,res){
            if(req.session.uniUserType !='checker'){
               res.redirect('/university/login')
            }
            university_name = req.session.user.uniName
            const certificates = await Certificate.find({isVerified:'not_verified',university_name:university_name}, null, {sort: { 'createdAt': -1 }})
            // console.log(certificates)
            res.render('universities/checker/dashboard',{certificates:certificates,moment:moment})
            
        },
 

        /* Checker validates certificates issued by Maker */
        async checkerVerifies(req,res){        
            
            var result = await Certificate.findByIdAndUpdate(req.body.certificateId,{isVerified:'approved'},{useFindAndModify:false},(err,doc)=>{
                            if(err)
                                console.log(err)
                            else{
                                emailToStudent(doc.uniqueID)
                                let loggerText   = req.session.user.uniName + " 'Checker' validated certicate with ID:" + doc.uniqueID
                                let officialType = 'Checker'
                                uniEventLogger(req.session.user.uniName, loggerText, officialType)
                            }
                        })
            
            res.redirect('/university/checker/dashboard')
        },
        async certificateEdit(req,res){
            
        },
        async certificateEditDisplay(req,res){
            res.render('universities/others/certificate-edit')
        },

        /* Send Email to Students 
        ** Using Gmail only at the moment 
        */ 
        sendEmailToStudent(req,res){
            var transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'jaylan.cummerata13@ethereal.email',
                    pass: 'RcPDY8TjPF19ZHXS1E'
                }
              });
              
              var mailOptions = {
                from: 'official.contact.ugc@gmail.com',
                to: 'get.mitun@gmail.com',
                subject: 'Your UGC UniChain Certificate is Ready!!',
                text: 'Hello Dear, Student. Your certificate has been created and added to blockchain. Your certificate code is: 5837-4903-e34d72885b36'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }
    }
}

module.exports = universityCertificateController