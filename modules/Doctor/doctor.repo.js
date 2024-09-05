const Doctor = require("./doctor.model");
const Appointment=require("../Appointment/appointment.model") 
const Record = require("../Record/record.model"); 
const bcrypt=require("bcrypt")


exports.isExist = async(filter) => {
  try{
  let doctor = await Doctor.findOne(filter);
  console.log(doctor)
  if (doctor) {
    return {
      code: 200,
      success: true,
      data: doctor,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "doctor is not found",
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
  let doctors = await Doctor.find(filter)
  .populate({ path: "department", select: "dep_name" });
  if(doctors){
  return {
    code: 200,
    success: true,
    doctors,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "doctors not found",
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
  let doctor = await this.isExist({email:form.email});
  if (!doctor.success) {
    const newDoctor = new Doctor(form);
    await newDoctor.save();
    return {
      code: 201,
      success: true,
      data: newDoctor,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Doctor already exists",
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
  let doctor = await this.isExist({ _id});
  if (doctor.success) {
    let result= await Doctor.findByIdAndUpdate(_id, form);
    await Record.deleteMany({ "doctor": _id })
    await Appointment.deleteMany({ "doctor": _id });
    return {
      code: 201,
      success: true,
      data: result,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: doctor.error,
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
    let doctor = await Doctor.findOne(filter).select("-password");
    if(doctor){
    return {
      code: 200,
      success: true,
      doctor,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Doctor not found",
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
    const doctor = await this.isExist({ _id: id });
    if (id && doctor.success) {
      let result=await Doctor.findByIdAndDelete(id);
      await Record.deleteMany({ "doctor": id })
      await Appointment.deleteMany({ "doctor": id });
      return {
        code: 200,
        success: true,
        data:result
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "doctor not found",
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


  exports.comparePassword=async(email,password)=>{
    try{
    email=email.toLowerCase()
   let doctor=await this.isExist({email})
   console.log(doctor.success)
   if(doctor.success){
    let match=await bcrypt.compare(password,doctor.data.password)
    if(match){
      return{
      code:200,
      success:true,
      data:doctor.data,
      }
    }
    else{
      return{
        code:401,
        success:false,
        error:"incorrect password"
        } 
    }
  }
    else return {
      code: 404,
      success: false,
      error: doctor.error,
    }
    }catch(error){
      console.log("error"+error.message)
      return{
      code:500,
       success:false,
       error:"unexpected error"
      }
    }
  }
  
  
  exports.resetPassword = async (email, newPassword) => {
    try {
      email = email.toLowerCase()
      let doctor = await this.isExist({email})
      let saltrouds = 5;
      if (doctor.success) {
        let hashedPassword = await bcrypt.hash(newPassword, saltrouds)
      let result=await Doctor.findOneAndUpdate({email}, {password: hashedPassword })
  
        return {
          code: 200,
          success: true,
          data:result
        };
      } else return {
        code: 404,
        success: false,
        error: doctor.error,
      };
    } catch (err) {
      console.log(`err.message`, err.message);
      return {
        code: 500,
        success: false,
        error: "Unexpected Error!"
      };
    }
  }
