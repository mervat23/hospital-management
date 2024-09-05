const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFkYjFlMWVjOGUxYTAxYTY5ZWRkNGQiLCJuYW1lIjoibW9uYSBhc2hyYWYiLCJlbWFpbCI6Im1vbmExMkBnbWFpbC5jb20iLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTcxMzIyMjExMywiZXhwIjoxNzE1ODE0MTEzfQ.QW2uM5mNGio-uhXtH8oBRRQ-rYjKjVUQ7dgEXeW5Mkw"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Doctor App",()=>{

        describe("GET /getAllDoctors",()=>{
           test("should read all doctors",async()=>{
            const response=await request(app).get('/getAllDoctors')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get doctors failure",async()=>{
            const response=await request(app).get('/getAllDoctors')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })

        
        describe("GET /doctor/:id",()=>{
            test("should handle doctor not found",async()=>{
                const response=await request(app).get('/doctor/661c2a3ce980c6bf5fd3c43c')
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(404)
               })

            test("should return doctor",async()=>{
             const response=await request(app).get('/doctor/661d9fc8cd1278e0452f0ad6')
            .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(200)
            })


            test("should handle doctor failure",async()=>{
                const response=await request(app).get('/doctor/661d9cd29a52fe9ff945d648')
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

           
         })

        describe("POST /registerDoctor",()=>{
            let data={
                "name":"ahmed raffat",
                "email":"ahmed12@gmail.com",
                "password":"rtyi34Z0$@&Q",
                "specialization":"surgical",
                "phone":"01123456789",
                "department":"66185299bb605f9ba39ba1fa",
                "role":"doctor"
            
            }

            test("should add an doctor",async()=>{
             const response=await request(app)
             .post('/registerDoctor').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.result.code).toBe(201)
            })

            test("should handle add doctor failure",async()=>{
                const response=await request(app)
                .post('/registerDoctor').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

               test("should handle doctor already exists",async()=>{
                const response=await request(app)
                .post('/registerDoctor').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.error).toBe("Doctor already exists")
               })
         })
 

         describe("POST /loginDoctor",()=>{

            let data={
                "email":"mero12@gmail.com",
                "password":"rtyi34Z0$@&Q"            
            }

            test("doctor should login ",async()=>{
             const response=await request(app).post('/loginDoctor').send(data)
            .set("Authorization", `bearer ${token}`);
             expect(response.body.result.code).toBe(200)
            })

            test("should return 404 doctor not found",async()=>{
                const response=await request(app).post('/loginDoctor').send({
                    "email" : "aml@gmail.com",
                    "password" : "34WEY@!ew",   
                })
                .set("Authorization", `bearer ${token}`);
                expect(response.body.result.code).toBe(404)
               })

               test("should return 401 incorrect password",async()=>{
                const response=await request(app).post('/loginDoctor').send({
                    "email" : "mero12@gmail.com",
                    "password" : "34WEY@!mk",
                })
                .set("Authorization", `bearer ${token}`);
                expect(response.body.result.error).toBe("incorrect password")
               })

               test("should handle loginDoctor failure",async()=>{
                const response=await request(app).post('/loginDoctor').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })
         })
       
        

         describe("PUT /updateDoctorData/:id",()=>{
        let data={
            "specialization" : "operations"
         }

        test("should update doctor",async()=>{
         const response=await request(app)
         .put('/updateDoctorData/661da1bae982e0f5353bedc2')
         .send(data)
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(201)
        })

        test("should handle update doctor failure",async()=>{
            const response=await request(app)
            .put('/updateDoctorData/661da1bae982e0f5353bedc2')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle doctor not found",async()=>{
            const response=await request(app)
            .put('/updateDoctorData/661da1bae982e0f5353bed')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })


     describe("DELETE /deleteDoctor/:id",()=>{
        test("should delete doctor",async()=>{
         const response=await request(app)
         .delete('/deleteDoctor/661daad4a03750d28f9e0cb2')
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle delete doctor failure",async()=>{
            const response=await request(app)
            .delete('/deleteDoctor/661d9818f6f10c52a10e53a4')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle doctor not found",async()=>{
            const response=await request(app)
            .delete('/deleteDoctor/661d9818f6f10c52a10e53a4')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })

    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

