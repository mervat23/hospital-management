const repo=require("../../modules/Payment/payment.repo")
const {create_payment }=require("../../services/paypal.service");

const createPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const result = await repo.create(paymentData);
    const pay=req.body.amount
    const obj = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: pay,
            breakdown: {
              item_total: { currency_code: "USD", value: pay },
            },
          },

          shipping: {
            address: {
              address_line_1: "1234 Main St",
              address_line_2: "Apt 2B",
              admin_area_2: "San Jose",
              admin_area_1: "CA",
              postal_code: "95131",
              country_code: "US",
            },
          },
        },
      ],
    
      application_context: {
        hospital_name: " Hospital Name",
        locale: "en-US",
        landing_page: "LOGIN",
        shipping_preference: "SET_PROVIDED_ADDRESS",
        user_action: "PAY_NOW",
        return_url: "http://localhost:3000/payment/success",
        cancel_url: "http://localhost:3000/payment/cancel",
      },
    };

    const appointmentRes = await create_payment(obj);

    if (result.success) {
      return res.status(result.code).json({ ...result, appointmentRes });
    } else {
      return res.status(result.code).json({ error: result.error });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createPayment
}