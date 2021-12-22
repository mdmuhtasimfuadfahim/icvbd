const University = require('../../../models/university')
const moment = require('moment')

function universityAccount(){
    return{
        async myAccount(req, res){
            const university = await University.findOne({ _id: req.user._id })
            console.log(university)
            res.render('universities/others/myAccount', { university: university, moment: moment })
        }
    }
}

module.exports = universityAccount