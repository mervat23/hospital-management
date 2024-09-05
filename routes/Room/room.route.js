const router=require("express").Router();
const roomController=require("../../controllers/Room/room.controller")
const {createRoomValidation}=require("../../validation/Room/room.createValidation")
const {updateRoomValidation}=require("../../validation/Room/room.updateValidation")
const validator=require("../../helpers/common.validate");
const { authenticateToken} = require("../../utils/token.util");
const endPoints=require("../../helpers/endPoints")



router.get("/getAllRooms",authenticateToken(endPoints.GET_ALL_ROOMS),
roomController.getAllRooms) 

router.get("/room/:id",authenticateToken(endPoints.GET_ROOM_BY_ID),
roomController.getRoomById)

router.post("/createRoom",authenticateToken(endPoints.CREATE_ROOM),
validator(createRoomValidation),
roomController.addRoom) 

router.put("/updateRoomData/:id",authenticateToken(endPoints.UPDATE_ROOM),
validator(updateRoomValidation),
roomController.updateRoomData) 

router.delete("/deleteRoom/:id",authenticateToken(endPoints.DELETE_ROOM),
roomController.deleteRoom)  

module.exports=router