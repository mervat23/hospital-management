const repo=require("../../modules/Doctor/doctor.repo")
const loggingService=require("../../services/logger.services")
const doctorLogger=new loggingService("doctor","doctor.controller")
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
      "fosok82225@kravify.com",
      'Email Verification',
      activationLink,
    )
   
     res.status(result.code).json({token,result,activationLink})
    }
    else  {
      res.status(result.code).json(result);
    }
    
    }catch(err){
        res.status(500).json({err: "unexpected error!"})  
    }
 }


 const getDoctorById=async(req,res)=>{
    try{
    let id=req.params.id;
     let doctor=await repo.get({_id:id}) 
     if(doctor.success){
    let info={Action:req.originalUrl,Status:200}
    doctorLogger.info("Return All Doctors",info)      
     res.status(doctor.code).json(doctor)
     }else{
     res.status(doctor.code).json(doctor)
     }
    }catch(err){
    doctorLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
    }
}

const getAllDoctors=async(req,res)=>{
    try{
    let result=await repo.list()
    if(result.success){
    let info={Action:req.originalUrl,Status:200}
    doctorLogger.info("Return All Doctors",info)  
    auditService.prepareAudit("GET_ALL_DOCTORS",result,null,"user",dateFormat())    
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
 }catch(err){
    doctorLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_DOCTORS",null,err,"doctor",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
 }
}


const updateDoctorData=async(req,res)=>{
    try{
    const targetDoctorId=req.params.id;
    let result=await repo.update({_id:targetDoctorId},req.body);
    if(result.success){
        res.status(result.code).json(result)
        }else{
        res.status(result.code).json(result)
        }
  }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
}
  
const deleteDoctor=async(req,res)=>{
    try{
  const targetDoctorId=req.params.id;
  let result= await repo.remove({_id:targetDoctorId});
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
    getDoctorById,
    getAllDoctors,
    updateDoctorData,
    deleteDoctor,
    login,
    resetPassword
    
}