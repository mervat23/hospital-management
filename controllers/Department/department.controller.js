const repo=require("../../modules/Department/department.repo")
const loggingService=require("../../services/logger.services")
const departmentLogger=new loggingService("department","department.controller")
const auditService=require("../../services/audit.services")


const dateFormat=()=>{
    return new Date(Date.now())
  }


let addDepartment = async (req, res) => {
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


 const getDepartmentById=async(req,res)=>{
    try{
    let id=req.params.id;
     let department=await repo.get({_id:id}) 
     if(department.success){
        let info={Action:req.originalUrl,Status:200}
        departmentLogger.info("Return All Departments",info)      
     res.status(department.code).json(department)
     }else{
    res.status(department.code).json(department)
     }
    }catch(err){
    departmentLogger.error(err.message)
    res.status(500).json({err: "unexpected error!"})  
    }
}

const getAllDepartments=async(req,res)=>{
    try{
    let result=await repo.list()
    if(result.success){
        let info={Action:req.originalUrl,Status:200}
        departmentLogger.info("Return All Departments",info)  
        auditService.prepareAudit("GET_ALL_DEPARTMENTS",result,null,"user",dateFormat())  
    res.status(result.code).json(result)
    }else{
    res.status(result.code).json({error:result.error})
    }
 }catch(err){
    departmentLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_DEPARTMENTS",null,err,"department",dateFormat())
    res.status(500).json({err: "unexpected error!"})  
 }
}

  
const deleteDepartment=async(req,res)=>{
    try{
  const targetDepartmentId=req.params.id;
  let result= await repo.remove({_id:targetDepartmentId});
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
    addDepartment,
    getDepartmentById,
    getAllDepartments,
    deleteDepartment 
}