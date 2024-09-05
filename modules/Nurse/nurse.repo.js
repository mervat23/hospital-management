const Nurse = require("./nurse.model");
const bcrypt=require("bcrypt")


exports.isExist = async(filter) => {
  try{
  let nurse = await Nurse.findOne(filter);
  if (nurse) {
    return {
      code: 200,
      success: true,
      data: nurse,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "nurse is not found",
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
  let nurses = await Nurse.find(filter)
  .populate({ path: "department",select: "dep_name" });

  if(nurses){
  return {
    code: 200,
    success: true,
    nurses,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "nurses not found",
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
  let nurse = await this.isExist({email:form.email});
  if (!nurse.success) {
    const newNurse = new Nurse(form);
    await newNurse.save();
    return {
      code: 201,
      success: true,
      data: newNurse,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Nurse already exists",
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
  let nurse = await this.isExist({ _id});
  if (nurse.success) {
    let result= await Nurse.findByIdAndUpdate(_id, form);
    return {
      code: 201,
      success: true,
      data: result,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: nurse.error,
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
    let nurse = await Nurse.findOne(filter).select("-password");
    if(nurse){
    return {
      code: 200,
      success: true,
      nurse,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Nurse not found",
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
    const nurse = await this.isExist({ _id: id });
    if (id && nurse.success) {
      let result=await Nurse.findByIdAndDelete(id);
      return {
        code: 200,
        success: true,
        data:result
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "nurse not found",
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
   let nurse=await this.isExist({email})
   console.log(nurse.success)
   if(nurse.success){
    let match=await bcrypt.compare(password,nurse.data.password)
    if(match){
      return{
      code:200,
      success:true,
      data:nurse.data,
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
      error: nurse.error,
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
      let nurse = await this.isExist({email})
      let saltrouds = 5;
      if (nurse.success) {
        let hashedPassword = await bcrypt.hash(newPassword, saltrouds)
      let result=await Nurse.findOneAndUpdate({email}, {password: hashedPassword })
  
        return {
          code: 200,
          success: true,
          data:result
        };
      } else return {
        code: 404,
        success: false,
        error: nurse.error,
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
