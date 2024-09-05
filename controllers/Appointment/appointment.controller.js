const repo=require("../../modules/Appointment/appointment.repo")
const loggingService=require("../../services/logger.services")
const appointmentLogger=new loggingService("appointment","appointment.controller")
const auditService=require("../../services/audit.services")


const dateFormat=()=>{
    return new Date(Date.now())
  }


let addAppointment = async (req, res) => {
    try{
    let result= await repo.create(req.body)    
    if(result.success){
     res.status(result.code).json(result)
    }else{
    res.status(result.code).json(result)
    }
    }catch(err){
        res.status(500).json({err: "unexpected error!"})  
    }
 }


 const getAppointmentById=async(req,res)=>{
    try{
    let id=req.params.id;
     let appointment=await repo.get({_id:id}) 
     if(appointment.success){
    let info={Action:req.originalUrl,Status:200}
    appointmentLogger.info("Return All Appointments",info)      
     res.status(appointment.code).json(appointment)
     }else{
    res.status(appointment.code).json(appointment)
     }
    }catch(err){
    appointmentLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
    }
}

const getAllAppointments=async(req,res)=>{
    try{
    let result=await repo.list()
    if(result.success){
    let info={Action:req.originalUrl,Status:200}
    appointmentLogger.info("Return All Appointments",info)  
    auditService.prepareAudit("GET_ALL_APPOINTMENTS",result,null,"appointment",dateFormat())    
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
 }catch(err){
    appointmentLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_APPOINTMENTS",null,err,"appointment",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
 }
}


const updateAppointmentData=async(req,res)=>{
    try{
    const targetAppointmentId=req.params.id;
    let result=await repo.update({_id:targetAppointmentId},req.body);
    if(result.success){
        res.status(result.code).json(result)
        }else{
        res.status(result.code).json(result)
        }
  }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
}
  
const deleteAppointment=async(req,res)=>{
    try{
  const targetAppointmentId=req.params.id;
  let result= await repo.remove({_id:targetAppointmentId});
  if(result.success){
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json(result)
    }
}catch(err){
    res.status(500).json({err: "unexpected error!"})  
}

}



module.exports = {
    addAppointment,
    getAppointmentById,
    getAllAppointments,
    updateAppointmentData,
    deleteAppointment 
}