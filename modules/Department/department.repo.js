const Department = require("./department.model");
const Doctor = require("../Doctor/doctor.model"); 
const Nurse = require("../Nurse/nurse.model"); 

exports.isExist = async(filter) => {
  try{
  let department = await Department.findOne(filter);
  if (department) {
    return {
      code: 200,
      success: true,
      data: department,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "department is not found",
    };
  }
}catch(error){
  console.log("error"+error.message)
  return{
   code:500,
   success:false,
   error:"unexpected error"
  }
}
};

exports.list = async (filter) => {
  try{
  let departments = await Department.find(filter)
  .populate({ path: "hospital",select: "hos_name" });
  if(departments){
  return {
    code: 200,
    success: true,
    departments,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "departments not found",
  }; 
}
}catch(error){
  console.log("error"+error.message)
  return{
   code:500,
   success:false,
   error:"unexpected error"
  }
}
};

exports.create = async (form) => {
  try{
  let department = await this.isExist({dep_name:form.dep_name});
  if (!department.success) {
    const newDepartment = new Department(form);
    await newDepartment.save();
    return {
      code: 201,
      success: true,
      data: newDepartment,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Department already exists",
    };
  }
}catch(error){
  console.log("error"+error.message)
  return{
   code:500,
   success:false,
   error:"unexpected error"
  }
}
}; 


exports.get = async (filter) => {
  try{
    let department = await Department.findOne(filter);
    if(department){
    return {
      code: 200,
      success: true,
      department,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Department not found",
    };
  }

}catch(error){
  console.log("error"+error.message)
  return{
   code:500,
   success:false,
   error:"unexpected error"
  }
}
};


exports.remove = async (_id) => {
    try{
    const department = await this.isExist({ _id });
    if (_id && department.success) {
      let result=await Department.findByIdAndDelete(_id);
      await Doctor.deleteMany({ "department": _id })
      await Nurse.deleteMany({ "department": _id })
      return {
        code: 200,
        success: true,
        data:result
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Department not found",
      };
    }
  
  }catch(error){
    console.log("error"+error.message)
    return{
     code:500,
     success:false,
     error:"unexpected error"
    }
  }
  };