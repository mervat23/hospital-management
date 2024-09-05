const repo=require("../../modules/Record/record.repo")
const loggingService=require("../../services/logger.services")
const recordLogger=new loggingService("record","record.controller")
const auditService=require("../../services/audit.services")


const dateFormat=()=>{
    return new Date(Date.now())
  }



let addRecord = async (req, res) => {
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


 const getRecordById=async(req,res)=>{
    try{
    let id=req.params.id;
     let record=await repo.get({_id:id}) 
     if(record.success){
    let info={Action:req.originalUrl,Status:200}
     recordLogger.info("Return All Records",info)   
     res.status(record.code).json(record)
     }else{
    res.status(record.code).json(record)
     }
    }catch(err){
    recordLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
    }
}

const getAllRecords=async(req,res)=>{
    try{
    let result=await repo.list()
    if(result.success){
    let info={Action:req.originalUrl,Status:200}
    recordLogger.info("Return All Records",info)  
    auditService.prepareAudit("GET_ALL_RECORDS",result,null,"record",dateFormat())    
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
 }catch(err){
    recordLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_RECORDS",null,err,"record",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
 }
}


const updateRecordData=async(req,res)=>{
    try{
    const targetRecordId=req.params.id;
    let result=await repo.update({_id:targetRecordId},req.body);
    if(result.success){
        res.status(result.code).json(result)
        }else{
        res.status(result.code).json(result)
        }
  }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
}
  
const deleteRecord=async(req,res)=>{
    try{
  const targetRecordId=req.params.id;
  let result= await repo.remove({_id:targetRecordId});
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
    addRecord,
    getRecordById,
    getAllRecords,
    updateRecordData,
    deleteRecord 
}