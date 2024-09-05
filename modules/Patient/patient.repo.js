const Patient = require("./patient.model");
const Record = require("../Record/record.model"); 
const Appointment=require("../Appointment/appointment.model") 
const Payment=require("../Payment/payment.model") 
const bcrypt=require("bcrypt")


exports.isExist = async(filter) => {
  try{
  let patient = await Patient.findOne(filter);
  if (patient) {
    return {
      code: 200,
      success: true,
      data: patient,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "patient is not found",
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
  let patients = await Patient.find(filter)
  if(patients){
  return {
    code: 200,
    success: true,
    patients,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "patients not found",
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
  let patient = await this.isExist({emil:form.emil});
  if (!patient.success) {
    const newPatient = new Patient(form);
    await newPatient.save();
    return {
      code: 201,
      success: true,
      data: newPatient,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Patient already exists",
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
  let patient = await this.isExist({ _id});
  if (patient.success) {
    let result= await Patient.findByIdAndUpdate(_id, form);
     await Record.deleteMany({ "patient": _id })
      await Appointment.deleteMany({ "patient": _id })
      await Payment.deleteMany({ "patient": _id });

    return {
      code: 201,
      success: true,
      data: result,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: patient.error,
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
    let patient = await Patient.findOne(filter).select("-password");
    if(patient){
    return {
      code: 200,
      success: true,
      patient,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Patient not found",
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
    const patient = await this.isExist({ _id: id });
    if (id && patient.success) {
      let result=await Patient.findByIdAndDelete(id);
      await Record.deleteMany({ "patient": id })
      await Appointment.deleteMany({ "patient": id })
      await Payment.deleteMany({ "patient": id });

      return {
        code: 200,
        success: true,
        data:result
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "patient not found",
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
   let patient=await this.isExist({email})
   console.log(patient.success)
   if(patient.success){
    let match=await bcrypt.compare(password,patient.data.password)
    if(match){
      return{
      code:200,
      success:true,
      data:patient.data,
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
      error: patient.error,
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
      let patient = await this.isExist({email})
      let saltrouds = 5;
      if (patient.success) {
        let hashedPassword = await bcrypt.hash(newPassword, saltrouds)
      let result=await Patient.findOneAndUpdate({email}, {password: hashedPassword })
  
        return {
          code: 200,
          success: true,
          data:result
        };
      } else return {
        code: 404,
        success: false,
        error: patient.error,
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
