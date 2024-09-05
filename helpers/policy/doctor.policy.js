const endPoints=require("../endPoints")


module.exports=[
    endPoints.REGISTERDOCTOR,
    endPoints.LOGINDOCTOR,
    endPoints.GET_ALL_DOCTORS,
    endPoints.GET_DOCTOR_BY_ID,
    endPoints.UPDATE_DOCTOR,
    endPoints.DELETE_DOCTOR,
    endPoints.RESET_PASSWORDDOCTOR,


    endPoints.GET_ALL_DEPARTMENTS,
    endPoints.GET_DEPARTMENT_BY_ID,

    endPoints.GET_ALL_APPOINTMENTS,
    endPoints.GET_APPOINTMENT_BY_ID,
    
    endPoints.CREATE_RECORD,
    endPoints.GET_ALL_RECORDS,
    endPoints.GET_RECORD_BY_ID,
    endPoints.UPDATE_RECORD,
    endPoints.DELETE_RECORD,
  
   endPoints.GET_ALL_PATIENTS,
   endPoints.GET_PATIENT_BY_ID
   
     
]

