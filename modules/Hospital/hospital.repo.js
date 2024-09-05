const Hospital = require("./hospital.model");
const Department = require("../Department/department.model"); 
const Room = require("../Room/room.model"); 
const Employee = require("../Employee/employee.model"); 


exports.isExist = async(filter) => {
  try{
  let hospital = await Hospital.findOne(filter);
  if (hospital) {
    return {
      code: 200,
      success: true,
      data: hospital,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "hospital is not found",
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
  let hospitals = await Hospital.find(filter)
  if(hospitals){
  return {
    code: 200,
    success: true,
    hospitals,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "hospitals are not found",
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
  let hospital = await this.isExist({hos_name:form.hos_name});
  if (!hospital.success) {
    const newHospital = new Hospital(form);
    await newHospital.save();
    return {
      code: 201,
      success: true,
      data: newHospital,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Hospital already exists",
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

exports.update = async (_id, form) => {
  try{
  let hospital = await this.isExist({ _id});
  if (hospital.success) {
    let result= await Hospital.findByIdAndUpdate(_id, form);
    await Department.deleteMany({ "hospital": _id })
    await Room.deleteMany({ "hospital": _id }) 
    await Employee.deleteMany({ "hospital": _id }) 

    return {
      code: 201,
      success: true,
      data: result,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: hospital.error,
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
    let hospital = await Hospital.findOne(filter);
    if(hospital){
    return {
      code: 200,
      success: true,
      hospital,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Hospital not found",
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


exports.remove = async (id) => {
    try{
    const hospital = await this.isExist({ _id: id });
    if (id && hospital.success) {
      let result=await Hospital.findByIdAndDelete(id);
      await Department.deleteMany({ "hospital": id }) 
      await Room.deleteMany({ "hospital": id }) 
      await Employee.deleteMany({ "hospital": id }) 
      return {
        code: 200,
        success: true,
        data:result
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "hospital not found",
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