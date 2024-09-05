const repo=require("../../modules/Patient/patient.repo")
const loggingService=require("../../services/logger.services")
const patientLogger=new loggingService("patient","patient.controller")
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


 const getPatientById=async(req,res)=>{
    try{
    let id=req.params.id;
     let patient=await repo.get({_id:id}) 
     if(patient.success){
     let info={Action:req.originalUrl,Status:200}
     patientLogger.info("Return All Patients",info)      
     res.status(patient.code).json(patient)
     }else{
    res.status(patient.code).json(patient)
     }
    }catch(err){
    patientLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
    }
}


const getAllPatients=async(req,res)=>{
    try{
    let result=await repo.list()
    if(result.success){
    let info={Action:req.originalUrl,Status:200}
    patientLogger.info("Return All Patients",info)  
    auditService.prepareAudit("GET_ALL_PATIENTS",result,null,"patient",dateFormat())    
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
 }catch(err){
    patientLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_PATIENTS",null,err,"patient",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
 }
}


const updatePatientData=async(req,res)=>{
    try{
    const targetPatientId=req.params.id;
    let result=await repo.update({_id:targetPatientId},req.body);
    if(result.success){
        res.status(result.code).json(result)
        }else{
        res.status(result.code).json(result)
        }
  }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
}
  
const deletePatient=async(req,res)=>{
    try{
  const targetPatientId=req.params.id;
  let result= await repo.remove({_id:targetPatientId});
  if(result.success){
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json(result)
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
    getPatientById,
    getAllPatients,
    updatePatientData,
    deletePatient,
    login,
    resetPassword
}