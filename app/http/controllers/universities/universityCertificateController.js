const crypto = require('crypto')
const secret = process.env.SECRET_TO_HASH_DB_VALUES
const { v4:  uuid} = require('uuid')
const Certificate = require('../../../models/certificate')
const Student = require('../../../models/student')
const Log = require('../../../models/logging')
const Comment = require('../../../models/comment')
const moment = require('moment')
const axios = require('axios')
const { debuglog } = require('util')
var nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')  //Sendgrid Transactional Email

function checkMakerLogin(req,res){
    if(!req.session.uniUserType){
        res.redirect('/university/login')
    }
    if(!(req.session.uniUserType==='maker' || req.session.uniUserType==='Maker')){
        req.flash('error','To access this page Please login again with proper credentials')
        res.redirect('/university/login')
    }
}

function checkCheckerLogin(req,res){
    if(!req.session.uniUserType){
        res.redirect('/university/login')
    }
    if(!(req.session.uniUserType==='checker' || req.session.uniUserType==='Checker')){
        req.flash('error','To access this page Please login again with proper credentials')
        res.redirect('/university/login')
    }
}

function checkMakerOrCheckerLogin(req,res){
    if(!req.session.uniUserType){
        res.redirect('/university/login')
    }
    if(!(req.session.uniUserType==='checker' || req.session.uniUserType==='Checker' 
                                     ||
       req.session.uniUserType==='maker' || req.session.uniUserType==='Maker'))
    {
        req.flash('error','To access this page Please login again with proper credentials')
        res.redirect('/university/login')
    }
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

/*****Sending email via SendGrid  ***/
async function sendEmailToStudentViaSendGrid(
    studentPersonalEmail='sampleStudent101@yopmail.com', //setting default email fields
    subject = "Message Generated from UGC ICV System",
    text = "Welcome to UGC ICV"
    ){
            
    sgMail.setApiKey('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')
    const msg = {
        to: studentPersonalEmail, // Change to your recipient
        from: 'official.contact.ugc@gmail.com', // Change to your verified sender
        subject: subject,
        text: text,
        html: '<strong>'+text+'</strong>',
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })



}
/*---Not working at the moment--- */
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
        /* Shows certificate creation form  */ 
        fromRender(req, res){
            checkMakerLogin(req,res)
            res.render('universities/certificate/createForm',{user:req.session.user})
        },
        /* Shows a list of approved certificate */ 
        async tableRender(req, res){
            checkMakerOrCheckerLogin(req,res)
            const certificate = await Certificate.find({university_name:req.session.user.uniName,isVerified:'approved'})
            res.render('universities/certificate/certificateTable2', {certificate: certificate, moment: moment,user:req.session.user})
        },
        updateForm(req, res){
            checkMakerOrCheckerLogin(req,res)
            axios.get(`${process.env.APP_BASE_URL}/university/certificate/update`, { params : { id : req.query.id }}).then((certificateData) =>{
                 console.log(certificateData.data)
                res.render('universities/certificate/updateForm', { certificate : certificateData.data})
            }).catch(err =>{
                res.send(err)
            })
        },

        /*******Certificate Creation by Maker *****/
        createCertificate(req, res){
            checkMakerLogin(req,res)
            console.log(req.body)
            const { full_name, email_address, email_address_personal, student_id, credit, courses, university_name, major, cgpa, minor, dob, gender, doa, dog,father_name,mother_name } = req.body
            console.log("The request body is: ", req.body)
           
            /*------------validate request----------*/
            if(!full_name || !email_address || !student_id || !credit || !courses || !university_name || !major || !cgpa || !minor || !dob|| !gender || !doa || !dog ){
                req.flash('error', 'All Fields are Required for Creating a Certificate')
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


            /*-------------check if student email exists within varsity record------------*/ 
            Certificate.exists({email_address: email_address,university_name:university_name}, (err, result) =>{
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
            })

            /*-------------check if student email exists within varsity record------------*/ 
            Certificate.exists({email_address_personal: email_address_personal,university_name:university_name}, (err, result) =>{
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
            })

                /*-------------check if student ID exists within varsity record------------*/ 
                Certificate.exists({student_id: student_id,university_name:university_name}, (err, result) =>{
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
                    req.flash('success', 'Certificate Created Successfully. Visit "Approved Certificate" section for details')
                    return res.redirect('/university/certificate/form')
                }).catch(err => {
                    console.log(err)
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/university/certificate/form')
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
        /* Certificate Update */
        postUpdate(req, res){
            checkMakerOrCheckerLogin(req,res)
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
        /** Displays Certificate Delete Prompt */
        certificateDeleteByIdShow(req,res){
            let delURL = '/university/certificate-delete/'+ req.params.id
            res.render('universities/certificate/certificate-del-prompt',{targetURL:delURL})
        },
        /** Certificate Delete Version 2 */
        certificateDeleteById(req,res){
            const id = req.params.id
            console.log(id)
            Certificate.findByIdAndDelete(id, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Deleted : ", docs);
                }
            })
            res.redirect('/university/certificate/approved-list')
        },

        /*------- Certificate Delete ---------  */
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
        

        /*** Maker Views Pending Certificates still not approved by maker ***/
        async makerViewsPending(req,res){
            console.log('message from makerViewsPending')
            university_name = req.session.user.uniName
            const certificates = await Certificate.find({isVerified:'not_verified',university_name:university_name}, null, {sort: { 'createdAt': -1 }})
           // res.render('universities/maker/pending-certificates',{certificates:certificates,moment:moment})
            res.render('universities/certificate/certificateTable3', {certificate: certificates, moment: moment,user:req.session.user})
        },

        /* Checker Dashboard Controller */
        async checkerDashboard(req,res){
            checkCheckerLogin(req,res)
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
                                /**Sending Email */
                                //let emailDestination = 'aminulrakib@yopmail.com' //for testing purpose only
                                let emailDestination = doc.email_address_personal
                                let emailSubject = "Your university certificate has been created"
                                let emailText = "Your Certificate has been created with ID: " + doc.uniqueID
                                console.log(emailDestination,emailSubject,emailText)             
                                sendEmailToStudentViaSendGrid(emailDestination,emailSubject,emailText)

                                /*Logging Event */
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
        },

        /*** Experimental */
        async sendEmailToStudentSendGrid(studentPersonalEmail='sampleStudent101@yopmail.com'){
            
            sendEmailToStudentViaSendGrid("getmitun@yopmail.com")



        },


        /* Display a single certificate where users can comment */ 
        async singleCertificateDisplay(req,res){
           checkMakerOrCheckerLogin(req,res)
           var studentID = req.params.certId
           var certificateID = req.params.certId //assigned only for clarity
           
           let certificateList = []
           var certificateDetails 
           const certificate = await Certificate.findOne({_id: certificateID})
           console.log("The certificate is: "+ certificate)
           Certificate.findOne({_id: certificateID}).populate('comments').
                    exec(function (err, certificateDoc) {
                        if (err) {console.log(err)}
                        console.log("Certificate Doc is:" + certificateDoc)
                        console.log('The author is ' + certificateDoc.comments);
                        res.render('universities/certificate/certificateDetails',{certificate:certificateDoc,comments: certificateDoc.comments,moment:moment,empty:false})
                       
                    });
        //    const certificate = await Certificate.findOne({_id: certificateID},(err,result)=>{
        //         if(result){
        //            certificateDetails = result
        //            //console.log("Result is "+result)
        //           // console.log("Comemnts saved in result is "+result.comments)
                  
        //           this.populate('comments').
        //             exec(function (err, comments) {
        //                 if (err) {console.log(err)}
        //                 console.log('The author is ' + comments);
        //                 console.log('The result is ' + result);
                       
        //             });
                  //console.log("The comments for this certificate are: "+ result.comments)  
                  //res.render('universities/certificate/certificateDetails',{certificate:certificateDetails,moment:moment,empty:false})
                  
            //     }else{
            //       console.log('Reached this point')
            //       //res.render('universities/certificate/certificateDetails',{certificate:result,moment:moment,empty:true})
        
            //     }
            
            // })
            //console.log("Certificate Details from outside loop is " + certificateDetails)
            //res.render('universities/certificate/certificateDetails',{certificate:certificateDetails,moment:moment,empty:false})
           

           

        //   var certComments = []
        //   if(2>1){
        //     //const comments = await Comment.find({_id: {$in:certificateList}},{sort: { 'createdAt': -1 }},(err,result)=>{
        //     const comments = await Comment.find({},(err,result)=>{
        //         if(result){
        //           certComments = result
        //           console.log("This is the result"+result)
        //         //res.render('universities/certificate/certificateDetails',{certificate:result,moment:moment,empty:false})
        //         }else{
        //         console.log('Reached this point in certificate')
        
        //         }
            
        //     })
        //   }
        //   console.log('The comments are coming:')
        //   console.log(certComments)


            // Certificate.findOne({student_id: studentID}).
            // populate('comments').
            //     exec(function (err, comments) {
            //         if (err) {console.log(err)}
            //         console.log('The author is %s', comments);
            //         // prints "The author is Ian Fleming"
            //     });


            //certificate.full_name="Rashid Khan Evan"
            //certificate.save((err)=>console.log(err))
            //const {universityName,posterType,textBody,recipient} = {'University of Barishal','Maker',"Are all the info correct!!","Checker"}
        //     const comment2 = new Comment({
        //                         universityName:'University of Barishal',
        //                         posterType: 'Maker',
        //                         textBody: "I know there is something wrong with student's name which is worth checking?",
        //                         recipient: "Checker"
        //                     })
        //   await comment2.save((err)=>console.log('some error') )
        //   certificate.comments.push(comment2)
        //   await certificate.save((err)=>console.log('some error'))
        //   console.log( 'Comments', certificate.comments[3].textBody)
        //    certificate.comments = []
        //    certificate.save((err)=>console.log(err))
             
                
                
            
        },

        /* Posts comments from certificate details page */ 
        async certCommentPost(req, res){
            checkMakerOrCheckerLogin(req,res)
            const certificateID = req.body.cID 
            if (req.body.commentText.length === 0){
                console.log('comment is empty')
            }
            else{
                //posterType should come from session
                var author
                var receiver
                if(req.session.uniUserType === 'checker' || req.session.uniUserType === 'checker' ){
                    author = 'Checker'
                    receiver = 'Maker'
                }
                else {
                    author= 'Maker'
                    receiver = 'Checker'
                }


                const commentText = req.body.commentText
                const comment = new Comment({
                                        universityName:'University of Barishal',
                                        posterType: author,
                                        textBody: commentText,
                                        recipient: receiver,
                                        certificateID: certificateID
                                    })
                await comment.save()
                
                const certificate = await Certificate.findOne({_id: certificateID})
                certificate.comments.push(comment)
                await certificate.save()
                
                                
            } //end of else block

            //creating redirect URL 
            const url = '/university/certificate-details/' + certificateID
            res.redirect(url)

        },

        /* Handles POST from certificate filter form */
        async certificateFilterProcess(req,res){
            
            //has to include university name 
            let form = req.body
            let filter = {}
            
            /**start of filter object */
            
            if(form.major?.trim().length>0) {filter.major = form.major.trim()}
            if(form.minor?.trim().length>0) {filter.minor = form.minor.trim()}  
            if(form.full_name?.trim().length>0) {filter.full_name = form.student_name}
            if(form.student_id?.trim().length>0) {filter.student_id = form.student_id}
            
            /**First set Defaults
             *  starting date to startingDate - 5
             *  ending date to endingDate - 5
             * */
            let currentYear = new Date().getFullYear();
            let fiveYearsBack = currentYear - 5
            let fiveYearsForward = currentYear + 5
            let startDate = fiveYearsBack.toString() + '-'+ '01' + '-' + '01'
            let endDate = fiveYearsForward.toString() + '-'+ '01' + '-' + '01'

            /** If date value comes from Form
             *  setting dates to new values 
             * */

            if(form.start_date.length>0){ //if form has date set
                console.log(form.start_date +' & '+ form.end_date)
                startDate = form.start_date
                if (form.end_date.length>0){
                    endDate = form.end_date  
                }
                else{ ///end date is not set. So setting end date after adding one day to start date and se
                    let [year,month,day] = req.body.start_date.split('-')
                    let tomorrow = parseInt(day)+1  
                    let newDate = year+'-'+month+'-'+ tomorrow.toString()
                    endDate = newDate
                }
            }
            
            //let startDate = new Date(year,month,day)
            //let startDate = '2021-12-26'
            console.log("This is filter object: ", filter)
            console.log("The start date is: ", startDate)
            console.log("The end date is: ", endDate)

            // const certificate = await Certificate.find({ //query today up to tonight
            //     createdAt: {
            //             $gte: startDate,
            //             $lt:  endDate
            //     }
            // }).sort({createdAt:-1})

            // console.log("The number of certificates  are:"+ certificate.length)

            Certificate.
            find(filter).
            where('createdAt').gte(startDate).lt(endDate).
            sort({'createdAt':-1}).
            exec((err,result)=>{
                console.log("The number of certificates  are:"+ result.length)
                res.render("universities/certificate/filterResult",{certificate:result,moment:moment})
            })
            
        },

        /* Displays Certificate Filter */
        async certificateFilterDisplay(req,res){
            res.render('universities/certificate/certificateFilter')
        }
    }
}

module.exports = universityCertificateController