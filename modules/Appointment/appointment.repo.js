const Appointment = require("./appointment.model");


exports.isExist = async(filter) => {
  try{
  let appointment = await Appointment.findOne(filter);
  if (appointment) {
    return {
      code: 200,
      success: true,
      data: appointment,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "appointment is not found",
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
  let appointments = await Appointment.find(filter)
  .populate({ path: "doctor",select: "name email" })
  .populate({ path: "patient",select: "name email" });
  
  if(appointments){
  return {
    code: 200,
    success: true,
    appointments,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "appointments not found",
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
  let appointment = await this.isExist({date_time:form.date_time});
  if (!appointment.success) {
    const newAppointment = new Appointment(form);
    await newAppointment.save();
    return {
      code: 201,
      success: true,
      data: newAppointment,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Appointment already exists",
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
    let appointment = await Appointment.findOne(filter);
    if(appointment){
    return {
      code: 200,
      success: true,
      appointment,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Appointment not found",
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
    let appointment = await this.isExist({ _id});
    if (appointment.success) {
      let result= await Appointment.findByIdAndUpdate(_id, form);
      return {
        code: 201,
        success: true,
        data: result,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: appointment.error,
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
    const appointment = await this.isExist({ _id: id });
    if (id && appointment.success) {
      let result=await Appointment.findByIdAndDelete(id);
      return {
        code: 200,
        success: true,
        data:result
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "Appointment not found",
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