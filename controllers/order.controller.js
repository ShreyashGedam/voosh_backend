const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");

const getorder = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) return res.status(400).send("user id not present");

    const orders = await orderModel.find({ user_id: id });

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(400).send("invalid id");
  }
};

const addOrder = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) return res.status(400).send("user id not present");

    if (!req.body.total) return res.status(400).send("Enter the total amount");

    const user = await userModel.findOne({ _id: id });

    const neworder = new orderModel({
      user_id: user._id,
      phone: req.phone,
      total: req.body.total,
    });
    await neworder.save();

    return res.status(201).send({
      message: "order added successully",
      neworder,
    });
  } catch (error) {
    return res.status(400).send("invalid id");
  }
};
module.exports = { getorder, addOrder };
