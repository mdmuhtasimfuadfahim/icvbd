
/*-------------Secure Student Routes Function-----------*/ 
function student(req, res, next){
    if(req.isAuthenticated() && req.user.role === 'Student'){
        return next()
    }

    return res.redirect('/student/login')
}


module.exports = student