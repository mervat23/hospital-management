const router=require("express").Router();
const employeeController=require("../../controllers/Employee/employee.controller")
const {createEmployeeValidation,loginValidation,resetPasswordValidation}=require("../../validation/Employee/employee.createValidation")
const {updateEmployeeValidation}=require("../../validation/Employee/employee.updateValidation")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")
let validator=require("../../helpers/common.validate") 


router.get("/getAllEmployees",authenticateToken(endPoints.GET_ALL_EMPLOYEES),
employeeController.getAllEmployees) 

router.get("/employee/:id",authenticateToken(endPoints.GET_EMPLOYEE_BY_ID),
employeeController.getEmployeeById)

router.post("/registerEmployee",authenticateToken(endPoints.REGISTEREMPLOYEE),
validator(createEmployeeValidation),
employeeController.register) 

router.post("/loginEmployee",authenticateToken(endPoints.LOGINEMPLOYEE),
validator(loginValidation),
employeeController.login);

router.post("/resetPasswordEmployee",authenticateToken(endPoints.RESET_PASSWORDEMPLOYEE),
validator(resetPasswordValidation),
employeeController.resetPassword);


router.put("/updateEmployeeData/:id",authenticateToken(endPoints.UPDATE_EMPLOYEE),
validator(updateEmployeeValidation),
employeeController.updateEmployeeData) 

router.delete("/deleteEmployee/:id",authenticateToken(endPoints.DELETE_EMPLOYEE),
employeeController.deleteEmployee)  

module.exports=router