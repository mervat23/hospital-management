const Employee = require("./employee.model");
const bcrypt=require("bcrypt")

exports.isExist = async(filter) => {
  try{
  let employee = await Employee.findOne(filter);
  if (employee) {
    return {
      code: 200,
      success: true,
      data: employee,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "employee is not found",
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
  let employees = await Employee.find(filter)
  .populate({ path: "hospital",select: "hos_name" });
  if(employees){
  return {
    code: 200,
    success: true,
    employees,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "employees not found",
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
  let employee = await this.isExist({email:form.email});
  if (!employee.success) {
    const newEmployee = new Employee(form);
    await newEmployee.save();
    return {
      code: 201,
      success: true,
      data: newEmployee,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Employee already exists",
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
    let employee = await this.isExist({ _id});
    if (employee.success) {
      let result= await Employee.findByIdAndUpdate(_id, form);
      return {
        code: 201,
        success: true,
        data: result,
      };
    } else {
      return {
        code: 404,
        success: false,
        error: employee.error,
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
    let employee = await Employee.findOne(filter).select("-password");
    if(employee){
    return {
      code: 200,
      success: true,
      employee,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Employee not found",
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
    const employee = await this.isExist({ _id: id });
    if (id && employee.success) {
      let result=await Employee.findByIdAndDelete(id);
      return {
        code: 200,
        success: true,
        data:result
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "employee not found",
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
   let employee=await this.isExist({email})
   console.log(employee.success)
   if(employee.success){
    let match=await bcrypt.compare(password,employee.data.password)
    if(match){
      return{
      code:200,
      success:true,
      data:employee.data,
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
      error: employee.error,
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
      let employee = await this.isExist({email})
      let saltrouds = 5;
      if (employee.success) {
        let hashedPassword = await bcrypt.hash(newPassword, saltrouds)
      let result=await Employee.findOneAndUpdate({email}, {password: hashedPassword })
  
        return {
          code: 200,
          success: true,
          data:result
        };
      } else return {
        code: 404,
        success: false,
        error: employee.error,
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
