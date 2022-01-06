const crypto = require('crypto')
const secret = process.env.SECRET_TO_HASH_DB_VALUES
const { v4:  uuid} = require('uuid')
const Certificate = require('../../models/certificate')
const Student = require('../../models/student')
const moment = require('moment')
const axios = require('axios')

function homeController(){
    return{
        index(req, res){
            console.log(req.session.user)
            res.render('home',{certificate:[],moment:moment,empty:true})
        },
        async verifyCertificate(req,res){
            if(!req.body.uniqueID)
                res.render('home',{certificate:[],moment:moment,empty:true})
            const certificate = await Certificate.findOne({uniqueID : req.body.uniqueID },(err,result)=>{
                if(err){
                    console.log(error)
                }
                if(result){  
                //    console.log('route1')      
                   res.render('home',{certificate:result,moment:moment,empty:false})
                }else{
                //    console.log('route2')    
                   req.flash('error','No certificate with this id found')
                   res.render('home', {certificate:null,moment:moment,empty:true})
                }
                
            })
        },
        globalRedirect(req,res){
            console.log('came to global redirect')
            if(!req.session.user)
                res.redirect('/')
            else{
                //if university user is logged in then redirect him to appropriate Dashboard
                if(req.session.user.role === "University" || req.session.user.role === "university"  ){
                    if(req.session.uniUserType=="Maker"|| req.session.uniUserType=="maker"){
                        res.redirect('/university/dashboard')
                    }

                    if(req.session.uniUserType=="Checker"|| req.session.uniUserType=="checker"){
                        res.redirect('/university/checker/dashboard')
                    }
                }

                //if ugc user is logged in then redirect him to appropriate Dashboard
                if(req.session.user.role === "UGC" || req.session.user.role === "Ugc"  ){
                    res.redirect('/ugc/dashboard')       
                }

                //if student user is logged in then redirect him to appropriate Dashboard
                if(req.session.user.role === "Student" || req.session.user.role === "student"  ){
                    res.redirect('/student/dashboard')       
                }

                //if other user is logged in then redirect him to appropriate Dashboard
                if(req.session.user.role === "Other" || req.session.user.role === "other"  ){
                    res.redirect('/other/dashboard')       
                }
            }
            
        },
        /* Experimental Route */
        async fetchCertificate(req, res){
            const certificates = Certificate.find({},(err,result)=>{
                if(err)
                    console.log(err)
                if(result)
                    console.log(result)
                else
                    console.log('db has no certificates')
            })
            
        }
    }
}

module.exports = homeController