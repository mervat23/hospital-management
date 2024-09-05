const repo=require("../../modules/Room/room.repo")
const loggingService=require("../../services/logger.services")
const roomLogger=new loggingService("room","room.controller")
const auditService=require("../../services/audit.services")


const dateFormat=()=>{
    return new Date(Date.now())
  }




let addRoom = async (req, res) => {
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


 const getRoomById=async(req,res)=>{
    try{
    let id=req.params.id;
     let room=await repo.get({_id:id}) 
     if(room.success){
     let info={Action:req.originalUrl,Status:200}
     roomLogger.info("Return All Rooms",info)      
     res.status(room.code).json(room)
     }else{
    res.status(room.code).json(room)
     }
    }catch(err){
    roomLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
    }
}

const getAllRooms=async(req,res)=>{
    try{
    let result=await repo.list()
    if(result.success){
    let info={Action:req.originalUrl,Status:200}
    roomLogger.info("Return All Rooms",info)  
    auditService.prepareAudit("GET_ALL_ROOMS",result,null,"room",dateFormat()) 
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
 }catch(err){
    roomLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_ROOMS",null,err,"room",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
 }
}

const updateRoomData=async(req,res)=>{
    try{
    const targetRoomId=req.params.id;
    let result=await repo.update({_id:targetRoomId},req.body);
    if(result.success){
        res.status(result.code).json(result)
        }else{
        res.status(result.code).json(result)
        }
  }catch(err){
    res.status(500).json({err: "unexpected error!"})  
 }
}
  
const deleteRoom=async(req,res)=>{
    try{
  const targetRoomId=req.params.id;
  let result= await repo.remove({_id:targetRoomId});
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
    addRoom,
    getRoomById,
    getAllRooms,
    updateRoomData,
    deleteRoom 
}