const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFkZThlMWY3NDU0MGYyY2JkZDI5NmYiLCJuYW1lIjoibW9uYSBhc2hyYWYiLCJlbWFpbCI6Im1vbmExMkBnbWFpbC5jb20iLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTcxMzIzNjE5MywiZXhwIjoxNzE1ODI4MTkzfQ.SRvr-PmV4lLPJqCWUV_h2yCnPnZxLAkMXglp9fcyKyk"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Patient App",()=>{

        describe("GET /getAllPatients",()=>{
           test("should read all patients",async()=>{
            const response=await request(app).get('/getAllPatients')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get patients failure",async()=>{
            const response=await request(app).get('/getAllPatients')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })

        describe("GET /patient/:id",()=>{
            test("should handle patient not found",async()=>{
                const response=await request(app).get('/patient/661c2a68e980c6bf5fd3c43e')
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(404)
               })

            test("should return patient",async()=>{
             const response=await request(app).get('/patient/661de8e1f74540f2cbdd296f')
            .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(200)
            })


            test("should handle patient failure",async()=>{
                const response=await request(app).get('/patient/661c2251c30bb15b402bad02')
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

           
         })

        describe("POST /registerPatient",()=>{
            let data={
                "name":"alaa mohammed",
                "email":"alaa12@gmail.com",
                "password":"mmgy34Z0$@&A",
                "address":"fayoum",
                "phone":"01123456234",
                "gender":"female",
                "role":"patient"
            
            }

            test("should add a patient",async()=>{
             const response=await request(app)
             .post('/registerPatient').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.result.code).toBe(201)
            })

            test("should handle add patient failure",async()=>{
                const response=await request(app)
                .post('/registerPatient').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

               test("should handle patient already exists",async()=>{
                const response=await request(app)
                .post('/registerPatient').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.error).toBe("Patient already exists")
               })
         })
 

    describe("POST /loginPatient",()=>{

            let data={
                "email":"alaa12@gmail.com",
                "password":"mmgy34Z0$@&A",     
            }

            test("patient should login ",async()=>{
             const response=await request(app).post('/loginPatient').send(data)
            .set("Authorization", `bearer ${token}`);
             expect(response.body.result.code).toBe(200)
            })

            test("should return 404 patient not found",async()=>{
                const response=await request(app).post('/loginPatient').send({
                    "email":"mony89@gmail.com",
                    "password" : "34WEY@!ew",   
                })
                .set("Authorization", `bearer ${token}`);
                expect(response.body.result.code).toBe(404)
               })

               test("should return 401 incorrect password",async()=>{
                const response=await request(app).post('/loginPatient').send({
                    "email" : "alaa12@gmail.com",
                    "password" : "mmgy34Z0$@",
                })
                .set("Authorization", `bearer ${token}`);
                expect(response.body.result.error).toBe("incorrect password")
               })

               test("should handle loginPatient failure",async()=>{
                const response=await request(app).post('/loginPatient').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })
         })
       
        
         describe("PUT /updatePatientData/:id",()=>{
        let data={
            "address" : "aswan",
         }

        test("should update patient",async()=>{
         const response=await request(app)
         .put('/updatePatientData/661ded1150992af6dedbf7e5')
         .send(data)
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(201)
        })

        test("should handle update patient failure",async()=>{
            const response=await request(app)
            .put('/updatePatientData/65771f46bda5da899859097a')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle patient not found",async()=>{
            const response=await request(app)
            .put('/updatePatientData/655f7f1bd829d045ed60b8d0')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })


     describe("DELETE /deletePatient/:id",()=>{
        test("should delete patient",async()=>{
         const response=await request(app)
         .delete('/deletePatient/661ded1150992af6dedbf7e5')
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle delete patient failure",async()=>{
            const response=await request(app)
            .delete('/deletePatient/65771f46bda5da899859097a')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle patient not found",async()=>{
            const response=await request(app)
            .delete('/deletePatient/6562f7475cb6ae7b3a1cfae9')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })


    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

