
/*-------------Secure University Routes Function-----------*/ 
function university(req, res, next){
    if(req.isAuthenticated() && req.user.role === 'University'){
        return next()
    }

    return res.redirect('/university/login')
}


module.exports = university