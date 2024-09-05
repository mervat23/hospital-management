const router=require("express").Router();
const appointmentController=require("../../controllers/Appointment/appointment.controller")
const {createAppointmentValidation}=require("../../validation/Appointment/appointment.createValidation")
const {updateAppointmentValidation}=require("../../validation/Appointment/appointment.updateValidation")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")
let validator=require("../../helpers/common.validate") 




router.get("/getAllAppointments",authenticateToken(endPoints.GET_ALL_APPOINTMENTS),
appointmentController.getAllAppointments) 

router.get("/appointment/:id",authenticateToken(endPoints.GET_APPOINTMENT_BY_ID),
appointmentController.getAppointmentById)

router.post("/createAppointment" ,authenticateToken(endPoints.CREATE_APPOINTMENT)
,validator(createAppointmentValidation),
appointmentController.addAppointment) 

router.put("/updateAppointmentData/:id",authenticateToken(endPoints.UPDATE_APPOINTMENT)
,validator(updateAppointmentValidation),
appointmentController.updateAppointmentData) 

router.delete("/deleteAppointment/:id",authenticateToken(endPoints.DELETE_APPOINTMENT),
appointmentController.deleteAppointment)  

module.exports=router