

/*-------------Secure Other Routes Function-----------*/ 
function other(req, res, next){
    if(req.isAuthenticated() && req.user.role === 'Other'){
        return next()
    }

    return res.redirect('/other/login')
}


module.exports = other