const Room = require("./room.model");


exports.isExist = async(filter) => {
  try{
  let room = await Room.findOne(filter);
  if (room) {
    return {
      code: 200,
      success: true,
      data: room,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "room is not found",
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
  let rooms = await Room.find(filter)
  .populate({ path: "hospital",select: "hos_name" });

  if(rooms){
  return {
    code: 200,
    success: true,
    rooms,
  };
}else{
  return {
    code: 404,
    success: false,
    error: "rooms not found",
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
  let room = await this.isExist({room_number:form.room_number});
  if (!room.success) {
    const newRoom = new Room(form);
    await newRoom.save();
    return {
      code: 201,
      success: true,
      data: newRoom,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Room already exists",
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
  let room = await this.isExist({ _id});
  if (room.success) {
    let result= await Room.findByIdAndUpdate(_id, form);
    return {
      code: 201,
      success: true,
      data: result,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: room.error,
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
    let room = await Room.findOne(filter);
    if(room){
    return {
      code: 200,
      success: true,
      room,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Room not found",
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
    const room = await this.isExist({ _id: id });
    if (id && room.success) {
      let result=await Room.findByIdAndDelete(id);
      return {
        code: 200,
        success: true,
        data:result
      };
    } else {
      return {
        code: 404,
        success: false,
        error: "room not found",
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