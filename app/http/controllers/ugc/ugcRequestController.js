const Accounts = require('../../../models/university')
const FAQ = require('../../../models/faq')
const Others = require('../../../models/other')
const Certificate = require('../../../models/certificate')
const Log = require('../../../models/logging')
const moment = require('moment')

function ugcRequestController(){
    return{
        /* Approves Accounts Requests of Universities */
        async accountRequests(req, res){
            // const account = await Accounts.find()
            // console.log(account)
            var numOfAccounts = 0 
            const account = await Accounts.find({ registrationStatus: 'not_approved' }, null, { sort: { 'createdAt': -1 }})
            
            if(!account){
                req.flash('error','there are no pending account requests at this moment')
            }
            else{
                numOfAccounts = account.length
            }
            res.render('ugc/university/approval', { account: account,  moment: moment,numOfAccounts,user:req.session.user})   
        },
        accountApproval(req, res){
            Accounts.updateOne({ _id: req.body.accountId }, { registrationStatus: req.body.registrationStatus }, (err, data)=>{
                console.log(req.body.accountId, req.body.registrationStatus)
                if(err){
                    console.log(err)
                    return res.redirect('/ugc/accounts/request',{user:req.session.user})
                }
                return res.redirect('/ugc/accounts/request')
            })
        },
        /*Shows a list of University accounts with Approved Registration */ 
        async showCompleted(req, res){
            //Account corresponds to Universitiy Model
            const accounts = await Accounts.find({ registrationStatus: 'approved' }).sort({'updatedAt': -1 })
            
            res.render('ugc/university/approved', {accounts: accounts, moment: moment, user:req.session.user})
            
        },
        /*Shows a list of Corporate accounts with Not  Approved Registration */
        async accountOtherRequests(req, res){
            const account = await Others.find({registrationStatus: 'not_approved'}, null, {sort: { 'createdAt': -1 }})
            res.render('ugc/other/approval', {account: account, moment: moment,user:req.session.user})
        },

        /* Approves Corporate Account Requests */
        accounOthertApproval(req, res){
            Others.updateOne({ _id: req.body.accountId }, { registrationStatus: req.body.registrationStatus }, (err, data)=>{
                if(err){
                    console.log(err)
                    return res.redirect('/ugc/accounts/other/request',{user:req.session.user})
                }
                return res.redirect('/ugc/accounts/other/request',{user:req.session.user})
            })
        },
        /* Approves Corporate Account Requests */
        async showOtherCompleted(req, res){
            const accounts = await Others.find({ registrationStatus: 'approved' }).sort({ 'updatedAt': -1 })
            res.render('ugc/other/approved', { accounts: accounts, moment: moment,user:req.session.user})
        },
        /*Shows form for bulk Certificate Validation */ 
        async bulkCertificateValidationDisplay(req,res){
            res.render('ugc/bulk-certificate-check-form.ejs',{user:req.session.user})
        },

        /* POST handler for bulk certificate Validation */  
        async bulkCertificateValidation(req,res){
           
            var allID    = req.body.allID.split(/\r?\n/);
            res.render('ugc/bulk-certificate-check-form-result',{result:allID,user:req.session.user})
        },
        
        /* displays form for restricting universities from making certificates */ 

        async restrictUniversityDisplay(req,res){
            res.render('ugc/restrict-university-form.ejs',{user:req.session.user})
        },

        /* POST Handler process form for restricting universities */ 
        async restrictUniversityPost(req,res){
            console.log(req.body)
            res.redirect('/ugc/university/restricted-list') //url
        },

        /* displays list of restricted universities */ 
        async restrictedUniversityList(req,res){

            res.render('ugc/restricted-university-list',{user:req.session.user}) //view file
        },

        /* displays logs of university users */ 
        async varsityLogDisplay(req,res){
            let logs = false
            Log.find({},(err,result)=>{
                if (err)
                    console.log(err)
                else{
                    logs = result 
                    res.render('ugc/logs-university',{user:req.session.user,logs:result,moment:moment}) 
                }
            })
            
        },

        async certificateDeleteRequestShow(req,res){
            // show all certificates with delete Request 
            let certificates = []
            const filter = {deleteRequest :'submitted'}
            await Certificate.find(filter,(err,res)=>{
                if(err){
                    console.log(err)
                }
                else{
                    certificates = res 
                }
            })
            console.log(certificates)

        },

        /* Processes request to certificate delete */ 
        async certificateDeleteRequest(req,res){
            let message=''
            let student_id = req.body.student_id
            const filter = {student_id: student_id}
            const update = {deleteRequest:'approved'}
            let certificate = await Certificate.findOneAndUpdate(filter,update,{
                new: true,
                useFindAndModify: false
            })
            
            if (certificate.length>0)
                message = 'Certificate delete request sucessfully sent to UGC '
            else 
                message = 'No Certificate with this Student ID found. Try again please '
            
        },

        /** Function to create QA  **/
        async createQA(req,res){
            if(Object.keys(req.body).length !== 0 ){
            
                const faq = new FAQ ({
                    type: 'question',
                    question: req.body.question,
                    answer: req.body.answer,
                    order: 1
                })
                await faq.save().then(request=>{
                    console.log('Saved')
                })
                .catch(err=>{
                    console.log('error')
                    console.log(err)
                    
                })

            }
            
            var retrievedFaq = {}  // this will hold all faq read from db
            await FAQ.find({},(err,result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    retrievedFaq = result 
                    console.log(result)
                
                }
            })



            res.render('ugc/create-faq',{faqs:retrievedFaq})
        },


        /* experimental function */ 
        async certificateBulkUpdateCron(req,res){
            const filter = {}
            const update = {$set : {deleteRequest:'submitted'}}
            const options = {multi:true}
            const result = await Certificate.updateMany(filter,update,options,(err,res) => {
                if(err){
                    console.log(err)
                }
                else{
                    console.log(res)
                }
            })
            
        }

    }
}

module.exports = ugcRequestController