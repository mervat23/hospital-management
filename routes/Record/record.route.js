const router=require("express").Router();
const recordController=require("../../controllers/Record/record.controller")
const {createRecordValidation}=require("../../validation/Record/record.createValidation")
const {updateRecordValidation}=require("../../validation/Record/record.updateValidation")
const validator=require("../../helpers/common.validate");
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")



router.get("/getAllRecords",authenticateToken(endPoints.GET_ALL_RECORDS),
recordController.getAllRecords) 

router.get("/record/:id",authenticateToken(endPoints.GET_RECORD_BY_ID),
recordController.getRecordById)

router.post("/createRecord",authenticateToken(endPoints.CREATE_RECORD),
validator(createRecordValidation),
recordController.addRecord) 

router.put("/updateRecordData/:id",authenticateToken(endPoints.UPDATE_RECORD),
validator(updateRecordValidation),
recordController.updateRecordData) 

router.delete("/deleteRecord/:id",authenticateToken(endPoints.DELETE_RECORD),
recordController.deleteRecord)  

module.exports=router