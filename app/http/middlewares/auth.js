
/*-------------Secure All Routes After Login Function-----------*/ 
function auth(req, res, next){
    //if(req.isAuthenticated()){
        //return next()
    //}

    //return res.redirect('/login')
    return next()
}



module.exports = auth