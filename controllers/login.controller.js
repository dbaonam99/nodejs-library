var bcrypt = require('bcrypt');
const shortid = require("shortid");
var db = require("../db.js");
var wrong = 0;

var nodemailer = require('nodemailer');

// send an Email
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '18521118@gm.uit.edu.vn',
    pass: 'Dbnbl08081999'
  }
});

var mailOptions = {
  from: '18521118@gm.uit.edu.vn',
  to: 'obamavn99@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

module.exports.index = function(req, res) {
  res.render("login/index");
};

module.exports.registerIndex = function(req, res) {
  res.render("login/register");
};

module.exports.addNewAccount = async function(req, res) {
  req.body.id = shortid.generate();
  
  var password = req.body.password;
  
  try {
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(password, salt);
  } catch {}
  
  db.get("users").push(req.body).write();
  res.redirect('/login');
};

module.exports.sendEmail = function(req, res) {
  
}

module.exports.postLogin = async function(req, res) {
  var email = req.body.email;
	var password = req.body.password;

  var user = db.get('users').find({email: email}).value();
  
  if(!user) {
    wrong++;
    res.cookie('wrong', wrong);
    res.render('login', {
      errors: ['Không tìm thấy email này!']
    })
    return;
  }

  try{
    if (await bcrypt.compare(password, user.password) == false) {
      wrong++;
      res.cookie('wrong', wrong);
      if (wrong > 4) {
        res.render('login', {
          errors: ['Nhập sai quá 4 lần!']
        })
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
        
      } else {
        res.render('login', {
          errors: ['Mật khẩu sai!']
        })
      }
      return;
    }
  } catch {
    res.status(500).send();
  }
  
  res.cookie('userId', user.id,{
    signed: true
  })
  
  res.redirect('/');
};
