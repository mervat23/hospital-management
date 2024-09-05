const roles=require("../roles")
const doctor=require("./doctor.policy")
const employee=require("./employee.policy")
const nurse=require("./nurse.policy")
const patient=require("./patient.policy")

const opts={
    [roles.DOCTOR]:{can:doctor},
    [roles.EMPLOYEE]:{can:employee},
    [roles.NURSE]:{can:nurse},
    [roles.PATIENT]:{can:patient},
}

module.exports=opts