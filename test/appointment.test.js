const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFlYzg2Y2YyYmJhM2YxNmJhMmI2NWEiLCJuYW1lIjoibW9oYW5lZCBBbGkiLCJlbWFpbCI6Im1vaGFuZWQxMkBnbWFpbC5jb20iLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE3MTMyOTM0MjEsImV4cCI6MTcxNTg4NTQyMX0.PukYN3ELU6uSw2x3ulrjqUuTT7bCY_IUMEanvIIK_2s"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Appointment App",()=>{

        describe("GET /getAllAppointments",()=>{
           test("should read all appointments",async()=>{
            const response=await request(app).get('/getAllAppointments')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get appointments failure",async()=>{
            const response=await request(app).get('/getAllAppointments')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })

        describe("GET /appointment/:id",()=>{
             test("should handle appointment  not found",async()=>{
                 const response=await request(app).get('/appointment/660f437b97b4063fdedc34e6')
                .set("Authorization", `bearer ${token}`);
                 expect(response.body.code).toBe(404)
                })
 
             test("should return appointment",async()=>{
              const response=await request(app).get('/appointment/661ec97ce90e0b9939f7cf4e')
             .set("Authorization", `bearer ${token}`);
              expect(response.body.code).toBe(200)
             })
 
 
             test("should handle appointment failure",async()=>{
                 const response=await request(app).get('/appointment/660f437b97b4063fdedc34e6')
                .set("Authorization", `bearer ${token}`);
                 expect(response.body.code).toBe(403)
                })
 
            
          })
  

        describe("POST /createAppointment",()=>{
            let data={
                "patient" :"6618824876eafbb9b3706dbe",
                "doctor" : "6619b0f4feb8e329203c5b7c",
                "date_time" : "5/2/2022" 
            }
            test("should create an appointment",async()=>{
             const response=await request(app)
             .post('/createAppointment').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })
            test("should handle create appointment failure",async()=>{
                const response=await request(app)
                .post('/createAppointment').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               }) 

               test("should handle appointment already exist",async()=>{
                const response=await request(app)
                .post('/createAppointment').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(400)
               }) 
         })

    
         describe("PUT /updateAppointmentData/:id",()=>{
        let data={
            "date_time" : "3/6/2024"
        }

        test("should update appointment",async()=>{
         const response=await request(app)
         .put('/updateAppointmentData/661ecaf59cd591440e8bcc4a')
         .send(data)
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(201)
        })

        test("should handle update appointment failure",async()=>{
            const response=await request(app)
            .put('/updateAppointmentData/661d6f5b3cbb84ca3dd8054b')
            .send(data)
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle appointment not found ",async()=>{
            const response=await request(app)
            .put('/updateAppointmentData/661d6f5b3cbb84ca3dd8054b') 
            .send(data)
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
        })


       describe("DELETE /deleteAppointment/:id",()=>{

        test("should delete appointment",async()=>{
         const response=await request(app)
         .delete('/deleteAppointment/661ecaf59cd591440e8bcc4a')
         .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle delete appointment failure",async()=>{
            const response=await request(app)
            .delete('/deleteAppointment/661d6f5b3cbb84ca3dd8054b')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle appointment not found",async()=>{
            const response=await request(app)
            .delete('/deleteAppointment/661d6f5b3cbb84ca3dd8054b') 
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

