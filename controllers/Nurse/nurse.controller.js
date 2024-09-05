const repo=require("../../modules/Nurse/nurse.repo")
const loggingService=require("../../services/logger.services")
const nurseLogger=new loggingService("nurse","nurse.controller")
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


 const getNurseById=async(req,res)=>{
    try{
    let id=req.params.id;
     let nurse=await repo.get({_id:id}) 
     if(nurse.success){
     let info={Action:req.originalUrl,Status:200}
     nurseLogger.info("Return All Nurses",info)      
     res.status(nurse.code).json(nurse)
     }else{
    res.status(nurse.code).json(nurse)
     }
    }catch(err){
    nurseLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
    }
}

const getAllNurses=async(req,res)=>{
    try{
    let result=await repo.list()
    if(result.success){
    let info={Action:req.originalUrl,Status:200}
    nurseLogger.info("Return All Nurses",info)  
    auditService.prepareAudit("GET_ALL_NURSES",result,null,"nurse",dateFormat())    
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
 }catch(err){
    nurseLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_NURSES",null,err,"nurse",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
 }
}


const updateNurseData=async(req,res)=>{
    try{
    const targetNurseId=req.params.id;
    let result=await repo.update({_id:targetNurseId},req.body);
    if(result.success){
        res.status(result.code).json(result)
        }else{
        res.status(result.code).json(result)
        }
  }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
}
  
const deleteNurse=async(req,res)=>{
    try{
  const targetNurseId=req.params.id;
  let result= await repo.remove({_id:targetNurseId});
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
    getNurseById,
    getAllNurses,
    updateNurseData,
    deleteNurse,
    login,
    resetPassword
}