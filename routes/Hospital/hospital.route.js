const router=require("express").Router();
const hospitalController=require("../../controllers/Hospital/hospital.controller")
const {createHospitalValidation}=require("../../validation/Hospital/hospital.createValidation")
const {updateHospitalValidation}=require("../../validation/Hospital/hospital.updateValidation")
const validator=require("../../helpers/common.validate");
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")


router.get("/getAllHospitals",authenticateToken(endPoints.GET_ALL_HOSPITALS),
hospitalController.getAllHospitals) 

router.get("/hospital/:id",authenticateToken(endPoints.GET_HOSPITAL_BY_ID),
hospitalController.getHospitalById)

router.post("/createHospital",authenticateToken(endPoints.CREATE_HOSPITAL),
validator(createHospitalValidation),
hospitalController.addHospital) 

router.put("/updateHospitalData/:id",authenticateToken(endPoints.UPDATE_HOSPITAL),
validator(updateHospitalValidation),
hospitalController.updateHospitalData) 

router.delete("/deleteHospital/:id",authenticateToken(endPoints.DELETE_HOSPITAL),
hospitalController.deleteHospital)  

module.exports=router