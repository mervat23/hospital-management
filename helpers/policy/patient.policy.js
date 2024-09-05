const endPoints=require("../endPoints")


module.exports=[
    endPoints.REGISTERPATIENT,
    endPoints.LOGINPATIENT,
    endPoints.GET_ALL_PATIENTS,
    endPoints.GET_PATIENT_BY_ID,
    endPoints.UPDATE_PATIENT,
    endPoints.DELETE_PATIENT,
    endPoints.RESET_PASSWORDPATIENT,


    endPoints.GET_ALL_DEPARTMENTS,
    endPoints.GET_DEPARTMENT_BY_ID,

    endPoints.GET_ALL_APPOINTMENTS,

    endPoints.GET_ALL_DOCTORS,

    endPoints.GET_ALL_EMPLOYEES,

    endPoints.GET_ALL_HOSPITALS,
    endPoints.GET_HOSPITAL_BY_ID,

    endPoints.CREATE_PAYMENT,

    endPoints.CREATE_RECORD,
    endPoints.GET_RECORD_BY_ID,
    endPoints.UPDATE_RECORD,
    endPoints.DELETE_RECORD,
  

    endPoints.GET_ALL_ROOMS,
    endPoints.GET_ROOM_BY_ID
   
     
]

