const router=require("express").Router();
const doctorController=require("../../controllers/Doctor/doctor.controller")
const {createDoctorValidation,loginValidation,resetPasswordValidation}=require("../../validation/Doctor/doctor.createValidation")
const {updateDoctorValidation}=require("../../validation/Doctor/doctor.updateValidation")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")
let validator=require("../../helpers/common.validate") 


router.get("/getAllDoctors",authenticateToken(endPoints.GET_ALL_DOCTORS),
doctorController.getAllDoctors) 

router.get("/doctor/:id",authenticateToken(endPoints.GET_DOCTOR_BY_ID),
doctorController.getDoctorById)

router.post("/registerDoctor",authenticateToken(endPoints.REGISTERDOCTOR),
validator(createDoctorValidation),
doctorController.register) 

router.post("/loginDoctor",authenticateToken(endPoints.LOGINDOCTOR),
validator(loginValidation),
doctorController.login);

router.post("/resetPasswordDoctor",authenticateToken(endPoints.RESET_PASSWORDDOCTOR),
validator(resetPasswordValidation),
doctorController.resetPassword);

router.put("/updateDoctorData/:id",authenticateToken(endPoints.UPDATE_DOCTOR),
validator(updateDoctorValidation),
doctorController.updateDoctorData) 

router.delete("/deleteDoctor/:id",authenticateToken(endPoints.DELETE_DOCTOR),
doctorController.deleteDoctor)  

module.exports=router