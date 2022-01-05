const Student = require('../../../models/student')
const Certificate = require('../../../models/certificate')
const Log = require('../../../models/logging')
const moment = require('moment')
const flash = require('connect-flash')

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

function universityRequestController(){
    return{
        async showCompleted(req, res){
            checkMakerLogin(req,res) //checks whether user is logged in or not 
            const accounts = await Student.find({ uniName : req.session.user.uniName }, null, { registrationStatus: 'approved' })
            res.render('universities/students/approved', {accounts: accounts, moment: moment})
        },
        /* List of students whose accounts were not approved */ 
        async accountRequests(req, res){
            checkMakerLogin(req,res)
            const account = await Student.find({ registrationStatus: 'not_approved',uniName : req.session.user.uniName}, null, {sort: { 'createdAt': -1 }})
            res.render('universities/students/approval', {account: account, moment: moment,user:req.session.user})
        },
        /* Handle POST for approving account which were not approved */ 
        accountApproval(req, res){
            Student.updateOne({ _id: req.body.accountId }, { registrationStatus: req.body.registrationStatus }, (err,data) =>{
                if(err){
                    console.log(err)
                    return res.redirect('/university/accounts/request')
                }
                return res.redirect('/university/accounts/request')
            })
        },

        /**Displays Certificate Delete Form*/
        async certificateDeleteForm(req, res){
            
            if( typeof req.session.user.role === 'undefined' || req.session.user.role !== 'University'){
                req.flash('error','To access this page Please login again with proper credentials')
                res.redirect('/university/login')

            }
            //fetch all student ids for this university 
            //process the form values 

            // redirect to delete form again with appropriate message 
            let studentIDs = []
            await Certificate.find({university_name:req.session.user.uniName}, 'student_id',(err,res)=>{
                if (err){
                    console.log(err)
                }
                else
                    studentIDs = res
            })
            console.log(studentIDs)
            req.flash('error','An error occured')
            res.render('universities/certificate-delete-request-form',{studentIDs:studentIDs,
                                                                      studentCount:studentIDs.length,
                                                                      message: "my message",
                                                                      
                                                                    })   

        },

        /**Processes Certificate Delete Form*/
        async certificateDeletePost(req, res){
            let message=''
            let student_id = req.body.student_id
            const filter = {student_id: student_id}
            const update = {deleteRequest:'submitted'}
            let certificate = await Certificate.findOneAndUpdate(filter,update,{
                new: true,
                useFindAndModify: false
            })
            
            if (certificate.length>0)
                message = 'Certificate delete request sucessfully sent to UGC '
            else 
                message = 'No Certificate with this Student ID found. Try again please '
            


        },
        
        /* Displays intra-organization logs */ 
        async varsityLogDisplay(req,res){
            Log.find({uniName:req.session.user.uniName},null, {sort: { 'createdAt': -1 }},(err,result)=>{
                if (err)
                    console.log(err)
                else{
                    console.log(result)
                    res.render('universities/logs-university',{user:req.session.user,logs:result,moment:moment}) 
                }
            })
            
        },

        


    }
}


module.exports = universityRequestController