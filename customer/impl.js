var config = require('../config.js');
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.web3Provider));
var session = require('express-session');
var customerdb = require('./db');
const SendOtp = require('sendotp');

module.exports = {

  getIndex: function(req, res) {
    var aadhar = req.body.aadhar;
    customerdb.getCustomerFromAadhar(aadhar, validateMobile.bind({

    }));
  }

}

function validateMobile(err, customer) {
  if (err) {
    console.error(err);
    return err;
  }

  if (!customer) {//No customer with aadhar found
    res.render('buyerlogin.ejs', {
      message: "Customer with this Aadhar number does not exist!"
    });
  }

  var mobile = "91" + customer.mobile;
  const sendOtp = new SendOtp(config.MSG91_AUTH_KEY);
  sendOtp.send(mobile, "ZEONBC", function (error, data, response) {
    console.log(data);
  });

}
