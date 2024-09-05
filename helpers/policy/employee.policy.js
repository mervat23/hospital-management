const endPoints=require("../endPoints")


module.exports=[
    endPoints.REGISTEREMPLOYEE,
    endPoints.LOGINEMPLOYEE,
    endPoints.GET_ALL_EMPLOYEES,
    endPoints.GET_EMPLOYEE_BY_ID,
    endPoints.UPDATE_EMPLOYEE,
    endPoints.DELETE_EMPLOYEE,
    endPoints.RESET_PASSWORDEMPLOYEE,


    endPoints.CREATE_DEPARTMENT,
    endPoints.GET_ALL_DEPARTMENTS,
    endPoints.GET_DEPARTMENT_BY_ID,
    // endPoints.DELETE_DEPARTMENT,
   
    endPoints.GET_ALL_DOCTORS,
    endPoints.GET_DOCTOR_BY_ID,
   
   
    endPoints.CREATE_HOSPITAL,
    endPoints.GET_ALL_HOSPITALS,
    endPoints.GET_HOSPITAL_BY_ID,
    endPoints.UPDATE_HOSPITAL,
    endPoints.DELETE_HOSPITAL,


    endPoints.CREATE_APPOINTMENT,
    endPoints.GET_ALL_APPOINTMENTS,
    endPoints.GET_APPOINTMENT_BY_ID,
    endPoints.UPDATE_APPOINTMENT,
    endPoints.DELETE_APPOINTMENT,


    endPoints.CREATE_ROOM,
    endPoints.GET_ALL_ROOMS,
    endPoints.GET_ROOM_BY_ID,
    endPoints.UPDATE_ROOM,
    endPoints.DELETE_ROOM,
     
]

