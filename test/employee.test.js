const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFkOWFmNmM5MzMzZmIyMjU3Y2Y5NjEiLCJuYW1lIjoibW9oYW5lZCBBbGkiLCJlbWFpbCI6Im1vaGFuZWQxMkBnbWFpbC5jb20iLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE3MTMyMTYyNDYsImV4cCI6MTcxNTgwODI0Nn0.x4ZMzW8E3wXDlEguigo5LvESFPboz3rZBveYCuxg_Qw"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Employee App",()=>{

        describe("GET /getAllEmployees",()=>{
           test("should read all employees",async()=>{
            const response=await request(app).get('/getAllEmployees')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get employees failure",async()=>{
            const response=await request(app).get('/getAllEmployees')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })

        describe("GET /employee/:id",()=>{
            test("should handle employee not found",async()=>{
                const response=await request(app).get('/employee/661af7a4535b5c505ca8dd59')
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(404)
               })

            test("should return employee",async()=>{
             const response=await request(app).get('/employee/661d9af6c9333fb2257cf961')
            .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(200)
            })


            test("should handle employee failure",async()=>{
                const response=await request(app).get('/employee/661af7a4535b5c505ca8dd59')
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

           
         })

        describe("POST /registerEmployee",()=>{
            let data={
                "name":"mohaned Ali",
                "email":"mohaned12@gmail.com",
               "password":"mmgy34Z0$@&A",
               "address":"minya",
               "phone":"01123456789",
               "position":"Head of Department",
               "role":"employee"
            
            }

            test("should add an employee",async()=>{
             const response=await request(app)
             .post('/registerEmployee').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.result.code).toBe(201)
            })

            test("should handle add employee failure",async()=>{
                const response=await request(app)
                .post('/registerEmployee').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

               test("should handle employee already exists",async()=>{
                const response=await request(app)
                .post('/registerEmployee').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.error).toBe("Employee already exists")
               })
         })
 

         describe("POST /loginEmployee",()=>{

            let data={
                "email":"mohaned12@gmail.com",
                "password":"mmgy34Z0$@&A",       
            }

            test("employee should login ",async()=>{
             const response=await request(app).post('/loginEmployee').send(data)
            .set("Authorization", `bearer ${token}`);
             expect(response.body.result.code).toBe(200)
            })

            test("should return 404 employee not found",async()=>{
                const response=await request(app).post('/loginEmployee').send({
                    "email" : "aml@gmail.com",
                    "password" : "34WEY@!ew",   
                })
                .set("Authorization", `bearer ${token}`);
                expect(response.body.result.code).toBe(404)
               })

               test("should return 401 incorrect password",async()=>{
                const response=await request(app).post('/loginEmployee').send({
                    "email": "mohaned12@gmail.com",
                    "password" : "34WEY@!mk",
                })
                .set("Authorization", `bearer ${token}`);
                expect(response.body.result.error).toBe("incorrect password")
               })

               test("should handle loginEmployee failure",async()=>{
                const response=await request(app).post('/loginEmployee').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })
         })
       

         describe("PUT /updateEmployeeData/:id",()=>{
        let data={
            "address" : "fayoum",
         }

        test("should update employee",async()=>{
         const response=await request(app)
         .put('/updateEmployeeData/661dae3db8e4dcb930487079')
         .send(data)
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(201)
        })

        test("should handle update employee failure",async()=>{
            const response=await request(app)
            .put('/updateEmployeeData/65771f46bda5da899859097a')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle employee not found",async()=>{
            const response=await request(app)
            .put('/updateEmployeeData/655f7f1bd829d045ed60b8d0')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.error).toBe("employee is not found")
           })
     })


     describe("DELETE /deleteEmployee/:id",()=>{
        test("should delete employee",async()=>{
         const response=await request(app)
         .delete('/deleteEmployee/661dbe0554afeece22847736')
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle delete employee failure",async()=>{
            const response=await request(app)
            .delete('/deleteEmployee/65771f46bda5da899859097a')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle employee not found",async()=>{
            const response=await request(app)
            .delete('/deleteEmployee/661dae3db8e4dcb930487079')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.error).toBe("employee not found")
           })
     })

    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

