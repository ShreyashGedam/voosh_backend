const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
var jwt = require("jsonwebtoken");

const adduser = async (req, res) => {
  try {
    let { name, phone, password } = req.body;
    if (!name || !phone || !password)
      return res.status(400).send({
        status: false,
        messsage: "Enter all the credentials",
      });

    const existingUsername = await userModel.findOne({ name });
    const existingUserpassword = await userModel.findOne({ phone });

    if (existingUsername || existingUserpassword)
      return res.status(400).send({
        status: false,
        messsage: "name and password already exist",
      });

    password = await bcrypt.hash(password, 10);

    const user = new userModel({
      ...req.body,
      password,
    });
    await user.save();
    return res.status(201).send({
      status: true,
      messsage: "user created successfully",
    });
  } catch (error) {
    return res.status(201).send({
      status: false,
      messsage: error,
    });
  }
};

const loginuser = async (req, res) => {
  try {
    let { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).send({
        status: false,
        messsage: "Enter all the credentials",
      });

    phone = await userModel.findOne({ phone });
    if (!phone)
      return res.status(400).send({
        status: false,
        messsage: "phone number or password is incorrect",
      });

    bcrypt.compare(password, phone.password, function (err, result) {
      if (err)
        return res.status(400).send({
          status: false,
          messsage: err,
        });
      else {
        if (!result)
          return res.status(400).send({
            status: false,
            messsage: "phone number or password is incorrect",
          });

        let { name, id } = phone;
        var token = jwt.sign({ phone: phone.phone, name: name }, "key", {
          expiresIn: "1d",
        });

        return res.status(200).send({
          status: true,
          messsage: "Login success",
          token,
          user: {
            name: name,
            phone: phone.phone,
            id: id,
          },
        });
      }
    });
  } catch (error) {
    return res.status(400).send({
      status: true,
      messsage: error,
    });
  }
};

module.exports = { adduser, loginuser };
