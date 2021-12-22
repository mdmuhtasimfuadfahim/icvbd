

var helper = {
    emailToStudent: function (certificate_id){
    
        var transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'jaylan.cummerata13@ethereal.email',
                pass: 'RcPDY8TjPF19ZHXS1E'
            }
          });
          
          var mailOptions = {
            from: email_address_personal,
            to: 'get.mitun@gmail.com',
            subject: 'Your UGC UniChain Certificate is Ready!!',
            text: 'Congrats! Certificate has been added to blockchain with certificate ID:' + certificate_id
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}

//module.exports.helper = helper 