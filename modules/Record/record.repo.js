const Record = require("./record.model");

exports.isExist = async(filter) => {
  try{
  let record = await Record.findOne(filter);
  if (record) {
    return {
      code: 200,
      success: true,
      data: record,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "record is not found",
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
  let records = await Record.find(filter)
  .populate({ path: "doctor",select: "name email" })
  .populate({ path: "patient",select: "name email" });

  if(records){
  return {
    code: 200,
    success: true,
    records,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "records not found",
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
  let record = await this.isExist({record_no:form.record_no});
  if (!record.success) {
    const newRecord = new Record(form);
    await newRecord.save();
    return {
      code: 201,
      success: true,
      data: newRecord,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Record already exists",
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
  let record = await this.isExist({ _id});
  if (record.success) {
    let result= await Record.findByIdAndUpdate(_id, form);
    return {
      code: 201,
      success: true,
      data: result,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: record.error,
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
    let record = await Record.findOne(filter);
    if(record){
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Record not found",
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
    const record = await this.isExist({ _id: id });
    if (id && record.success) {
      let result=await Record.findByIdAndDelete(id);
      return {
        code: 200,
        success: true,
        data:result
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "record not found",
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