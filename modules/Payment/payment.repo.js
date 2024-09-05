const Payment = require("./payment.model");

exports.create = async (paymentData) => {
    try{
    const payment = new Payment(paymentData);
    const savedPayment = await payment.save();
    return { code: 201, success: true, data: savedPayment};
  } catch (error) {
    return { code: 500, success: false, error: error.message };
  }
}

  