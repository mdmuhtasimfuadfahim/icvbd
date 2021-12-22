const Student = require('../../../models/student')
const moment = require('moment')

function studentDashboardController(){
    return{
        dashboardRender(req, res){
            res.render('students/dashboard', { student: req.session.user, moment: moment })
        },
        async showMyAccount(req, res){
            if(req.session.user.role!=='Student'){
                req.flash('error','Something went wrong. Try again please')
                res.redirect('/login')
            }
            
            res.render('students/myAccount', { student: req.session.user, moment: moment })
        }
    }
}


module.exports = studentDashboardController