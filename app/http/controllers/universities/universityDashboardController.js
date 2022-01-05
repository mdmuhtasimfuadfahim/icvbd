const crypto = require('crypto')
const secret = process.env.SECRET_TO_HASH_DB_VALUES
const { v4:  uuid} = require('uuid')
const Certificate = require('../../../models/certificate')
const Student = require('../../../models/student')
const moment = require('moment')
const axios = require('axios')
var helper = require('../../../helper')

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




function universityDashboardController(){
    return{
        dashboardRender(req, res){
            checkMakerLogin(req,res)
            if (!req.session.user){
                req.flash('error','You are probably not logged. Please log in to continue')
            }
            res.render('universities/others/dashboard',{user:req.session.user})
        },
        async verifyCertificate(req,res){
            if(!req.body.uniqueID)
                res.render('universities/others/dashboard',{certificate:[], moment:moment, empty:true, user:req.session.user})
            const certificate = await Certificate.findOne({uniqueID : req.body.uniqueID },(err,result)=>{
                if(err){
                    console.log(error)
                }
                if(result){  
                //    console.log('route1')      
                   res.render('universities/others/dashboard',{certificate:result, moment:moment, empty:false, user:req.session.user})
                }else{
                //    console.log('route2')    
                   req.flash('error','No certificate with this id found')
                   res.render('universities/others/dashboard', {certificate:null,moment:moment,empty:true, user:req.session.user})
                }
                
            })
        },
    }
}

module.exports = universityDashboardController