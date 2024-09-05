const router=require("express").Router();
const nurseController=require("../../controllers/Nurse/nurse.controller")
const {createNurseValidation,loginValidation,resetPasswordValidation}=require("../../validation/Nurse/nurse.createValidation")
const {updateNurseValidation}=require("../../validation/Nurse/nurse.updateValidation")
const validator=require("../../helpers/common.validate");
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")


router.get("/getAllNurses",authenticateToken(endPoints.GET_ALL_NURSES),
nurseController.getAllNurses) 

router.get("/nurse/:id",authenticateToken(endPoints.GET_NURSE_BY_ID),
nurseController.getNurseById)

router.post("/registerNurse",authenticateToken(endPoints.REGISTERNURSE),
validator(createNurseValidation),
nurseController.register) 

router.post("/loginNurse",authenticateToken(endPoints.LOGINNURSE),
validator(loginValidation),
nurseController.login);

router.post("/resetPasswordNurse",authenticateToken(endPoints.RESET_PASSWORDNURSE),
validator(resetPasswordValidation),
nurseController.resetPassword);


router.put("/updateNurseData/:id",authenticateToken(endPoints.UPDATE_NURSE),
validator(updateNurseValidation),
nurseController.updateNurseData) 

router.delete("/deleteNurse/:id",authenticateToken(endPoints.DELETE_NURSE),
nurseController.deleteNurse)  

module.exports=router