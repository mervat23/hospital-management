const repo=require("../../modules/Employee/employee.repo")
const loggingService=require("../../services/logger.services")
const employeeLogger=new loggingService("employee","employee.controller")
const auditService=require("../../services/audit.services")
let{sendMail}=require("../../utils/email.util")
const utils=require("../../utils/token.util")


const dateFormat=()=>{
    return new Date(Date.now())
  }


let register = async(req, res) => {
    try{
    const result=await repo.create(req.body)    
    if (result.success) {
    payload = {
        _id: result.data._id, name: result.data.name, email: result.data.email,
        role: result.data.role
      }
    const token = utils.generateToken(payload);
    const activationLink=`Hi! There, You have recently visited 
    our website and entered your email. 
    Please follow the given link to verify your email 
    http://localhost:3000/verify/${token} 
    Thanks` 
    await sendMail(
      result.data.email,
      "lorog17256@felibg.com",
      'Email Verification',
      activationLink,
    )
   
     res.status(result.code).json({token,result,activationLink})
    }
    else {
      res.status(result.code).json(result);
    }
    }catch(err){
        res.status(500).json({err: "unexpected error!"})  
    }
 }

 const getEmployeeById=async(req,res)=>{
    try{
    let id=req.params.id;
     let employee=await repo.get({_id:id}) 
     if(employee.success){
     let info={Action:req.originalUrl,Status:200}
     employeeLogger.info("Return All Employees",info)     
     res.status(employee.code).json(employee)
     }else{
    res.status(employee.code).json(employee)
     }
    }catch(err){
    employeeLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
    }
}

const getAllEmployees=async(req,res)=>{
    try{
    let result=await repo.list()
    if(result.success){
    let info={Action:req.originalUrl,Status:200}
    employeeLogger.info("Return All Employees",info)  
    auditService.prepareAudit("GET_ALL_EMPLOYEES",result,null,"employee",dateFormat())  
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
 }catch(err){
    employeeLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_EMPLOYEES",null,err,"employee",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
 }
}


const updateEmployeeData=async(req,res)=>{
    try{
    const targetEmployeeId=req.params.id;
    let result=await repo.update({_id:targetEmployeeId},req.body);
    if(result.success){
        res.status(result.code).json(result)
        }else{
        res.status(result.code).json({error:result.error})
        }
  }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
}
  
const deleteEmployee=async(req,res)=>{
    try{
  const targetEmployeeId=req.params.id;
  let result= await repo.remove({_id:targetEmployeeId});
  if(result.success){
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
}catch(err){
    res.status(500).json({err: "unexpected error!"})  
}

}

let login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await repo.comparePassword(email, password);
    if (result.success) {
       payload = {
        _id: result.data._id,name: result.data.name, email: result.data.email,
        role: result.data.role
      }
      const token = utils.generateToken(payload);
      res.status(result.code).json({token,result})
    }
    else {
      res.status(result.code).json({result})
    }
  } catch (err) {
    res.status(500).json({err: "unexpected error!"})  

  }
}


let resetPassword = async (req, res) => {
    try {
        const result = await repo.resetPassword(req.body.email, req.body.newPassword);
        if(result.success){
        res.status(result.code).json({result});
        }
        else{
          res.status(result.code).json({error:result.error}); 
        }
    } catch (err) {
      res.status(500).json({err: "unexpected error!"})  
    }
}

  
  


module.exports = {
    register,
    getEmployeeById,
    getAllEmployees,
    updateEmployeeData,
    deleteEmployee,
    login,
    resetPassword
}