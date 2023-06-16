const { default: mongoose } = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    phone: { type: String, required: true },
    total: { type: Number, required: true },
    order_name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
