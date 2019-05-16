const nodemailer = require('nodemailer'); 

/*const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 23,
  secure: false, // true for 465, false for other ports
  auth: {
  	user: "no-reply@coneboard.com",
  	pass: "senhaqualquerdeteste"
  },
  tls: { rejectUnauthorized: false }
});*/

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'devehtal@gmail.com',
        pass: '.,er+ou-1'
    }
});


const mailOptions = {
  from: 'no-reply@coneboard.com',
  to: 'si.erickluiz@gmail.com',
  subject: 'ConeBoard! O Board da Magia :D',
  html: `<h1>Bem vindo ao cone Board Amiguinho!</h1>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});