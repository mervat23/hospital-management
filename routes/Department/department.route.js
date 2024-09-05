const router=require("express").Router();
const departmentController=require("../../controllers/Department/department.controller")
const {createDepartmentValidation}=require("../../validation/Department/department.createValidation")
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")
let validator=require("../../helpers/common.validate") 



router.get("/getAllDepartments",authenticateToken(endPoints.GET_ALL_DEPARTMENTS),
departmentController.getAllDepartments) 

router.get("/department/:id",authenticateToken(endPoints.GET_DEPARTMENT_BY_ID),
departmentController.getDepartmentById)

router.post("/createDepartment",authenticateToken(endPoints.CREATE_DEPARTMENT),
validator(createDepartmentValidation),
departmentController.addDepartment) 


router.delete("/deleteDepartment/:id",authenticateToken(endPoints.DELETE_DEPARTMENT),
departmentController.deleteDepartment)  

module.exports=router