const router=require("express").Router();
const patientController=require("../../controllers/Patient/patient.controller")
const {createPatientValidation,loginValidation,resetPasswordValidation}=require("../../validation/Patient/patient.createValidation")
const {updatePatientValidation}=require("../../validation/Patient/patient.updateValidation")
const validator=require("../../helpers/common.validate");
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")



router.get("/getAllPatients",authenticateToken(endPoints.GET_ALL_PATIENTS),
patientController.getAllPatients) 

router.get("/patient/:id",authenticateToken(endPoints.GET_PATIENT_BY_ID),
patientController.getPatientById)

router.post("/registerPatient",authenticateToken(endPoints.REGISTERPATIENT),
validator(createPatientValidation),
patientController.register) 

router.post("/loginPatient",authenticateToken(endPoints.LOGINPATIENT),
validator(loginValidation),
patientController.login);

router.post("/resetPasswordPatient",authenticateToken(endPoints.RESET_PASSWORDPATIENT),
validator(resetPasswordValidation),
patientController.resetPassword);


router.put("/updatePatientData/:id",authenticateToken(endPoints.UPDATE_PATIENT),
validator(updatePatientValidation),
patientController.updatePatientData) 

router.delete("/deletePatient/:id",authenticateToken(endPoints.DELETE_PATIENT),
patientController.deletePatient)  

module.exports=router