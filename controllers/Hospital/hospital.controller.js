const repo=require("../../modules/Hospital/hospital.repo")
const loggingService=require("../../services/logger.services")
const hospitalLogger=new loggingService("hospital","hospital.controller")
const auditService=require("../../services/audit.services")


const dateFormat=()=>{
    return new Date(Date.now())
  }


let addHospital = async (req, res) => {
    try{
    let result= await repo.create(req.body)    
    if(result.success){
     res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
    }catch(err){
        res.status(500).json({err: "unexpected error!"})  
    }
 }


 const getHospitalById=async(req,res)=>{
    try{
    let id=req.params.id;
     let hospital=await repo.get({_id:id}) 
     if(hospital.success){
     let info={Action:req.originalUrl,Status:200}
     hospitalLogger.info("Return All Hospitals",info)      
     res.status(hospital.code).json(hospital)
     }else{
    res.status(hospital.code).json(hospital)
     }
    }catch(err){
    hospitalLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
    }
}


const getAllHospitals=async(req,res)=>{
    try{
    let result=await repo.list()
    if(result.success){
    let info={Action:req.originalUrl,Status:200}
    hospitalLogger.info("Return All Hospitals",info)  
    auditService.prepareAudit("GET_ALL_HOSPITALS",result,null,"hospital",dateFormat())    
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
 }catch(err){
    hospitalLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_HOSPITALS",null,err,"hospital",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
 }
}


const updateHospitalData=async(req,res)=>{
    try{
    const targetHospitalId=req.params.id;
    let result=await repo.update({_id:targetHospitalId},req.body);
    if(result.success){
        res.status(result.code).json(result)
        }else{
        res.status(result.code).json(result)
        }
  }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
}
  
const deleteHospital=async(req,res)=>{
    try{
  const targetHospitalId=req.params.id;
  let result= await repo.remove({_id:targetHospitalId});
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
    addHospital,
    getHospitalById,
    getAllHospitals,
    updateHospitalData,
    deleteHospital 
}