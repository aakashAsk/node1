const UserModel = require('../Model/userModel');
const jwt = require("jsonwebtoken");
const config = require('../../config/property');
module.exports = {
  SignUp: async (req, res) => {
    try {
      const check = await UserModel.findOne({ email: req.body.email });
      if (req.body.password === req.body.confirmPassword) {
        if (!check) {
          new UserModel(req.body).save()
            .then(result => {
              const token = jwt.sign({
                id: result._id,
                email: result.email,
                userName: result.name,
                phone: result.number,
              },
                config.secretKey, {
                expiresIn: "100 days",
              });

              res.status(200).json({
                status: true,
                result: result,
                token: token
              })
            })
        }
        else {
          res.status(200).json({
            status: false,
            message: `User with ${req.body.email} is already register with us`
          })
        }
      }
      else {
        res.status(200).json({
          status: false,
          message: `Password does not match`
        })

      }
    }
    catch (err) {
      res.status(409).json({
        status: false,
        result: err
      })
    }
  },

  Login: async (req, res) => {
    try {
      console.log(req.body);
      UserModel.findOne({ $and: [{ email: req.body.email }, { password: req.body.password }] })
        .then(result => {
          if(result != null){
            const token = jwt.sign({
              id: result._id,
              email: result.email,
              userName: result.name,
              phone: result.number,
            },
              config.secretKey, {
              expiresIn: "100 days",
            });

            res.status(200).json({
              status: true,
              result: result,
              token: token
            })
          }
          else{
            res.status(200).json({
              status: false,
              message: 'Email or password wrong',
            })
          }
        })
    }
    catch (err) {
      res.status(409).json({
        status: false,
        result: err
      })
    }
  }
}