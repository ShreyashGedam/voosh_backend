const { Router } = require("express");
const { getorder, addOrder } = require("../controllers/order.controller");

const orderRouter = Router();

orderRouter.get("/getorder", getorder);
orderRouter.post("/addorder/:id", addOrder);

module.exports = orderRouter;
