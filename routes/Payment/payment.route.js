const router=require("express").Router();
const paymentController=require("../../controllers/Payment/payment.controller")
const {createPaymentValidation}=require("../../validation/Payment/payment.createValidation")
const validator=require("../../helpers/common.validate");
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints");


router.post("/createPayment",authenticateToken(endPoints.CREATE_PAYMENT),
validator(createPaymentValidation),
paymentController.createPayment) 

router.get("/", (req, res) =>
  res.render("index.ejs" )
);

module.exports=router