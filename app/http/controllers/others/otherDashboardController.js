

function otherDashboardController(){
    return{
        dashboardRender(req, res){
            res.render('others/dashboard')
        }
    }
}


module.exports = otherDashboardController