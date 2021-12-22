

function authController(){
    return{
        index(req, res){
            res.render('auth/registration')
        },
        loginpage(req, res){
            res.render('auth/login')
        },
        logout(req, res){
            req.session.destroy()
            return res.redirect('/login')
        }
    }
}


module.exports = authController