const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFkYmM5NGNjZWM3MzliNmQ2Mjg5MmEiLCJuYW1lIjoibm9oYSBBbGkiLCJlbWFpbCI6Im5vaGExMkBnbWFpbC5jb20iLCJyb2xlIjoibnVyc2UiLCJpYXQiOjE3MTMyMjQ4NTIsImV4cCI6MTcxNTgxNjg1Mn0.cNFRtt6N63V8LLQmMU-u_c_KgWmt-oZsjZ95Rrd7_V8"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Nurse App",()=>{

        describe("GET /getAllNurses",()=>{
           test("should read all nurses",async()=>{
            const response=await request(app).get('/getAllNurses')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get nurses failure",async()=>{
            const response=await request(app).get('/getAllNurses')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })

        describe("GET /nurse/:id",()=>{
            test("should handle nurse not found",async()=>{
                const response=await request(app).get('/nurse/661c2082dde9a07dcac8292a')
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(404)
               })

            test("should return nurse",async()=>{
             const response=await request(app).get('/nurse/661dbc94ccec739b6d62892a')
            .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(200)
            })


            test("should handle nurse failure",async()=>{
                const response=await request(app).get('/nurse/661c2082dde9a07dcac8292a')
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

           
         })
 

        describe("POST /registerNurse",()=>{
            let data={
                "name":"noha Ali",
                "email":"noha12@gmail.com",
               "password":"mmgy34Z0$@&A",
               "address":"mansoura",
               "phone":"01123456789",
               "department":"66185299bb605f9ba39ba1fa",
               "role":"nurse"
            
            }

            test("should add an nurse",async()=>{
             const response=await request(app)
             .post('/registerNurse').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.result.code).toBe(201)
            })

            test("should handle add nurse failure",async()=>{
                const response=await request(app)
                .post('/registerNurse').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })

               test("should handle nurse already exists",async()=>{
                const response=await request(app)
                .post('/registerNurse').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.error).toBe("Nurse already exists")
               })
         })
 

         describe("POST /loginNurse",()=>{

            let data={
                "email":"noha12@gmail.com",
                "password":"mmgy34Z0$@&A"     
            }

            test("nurse should login ",async()=>{
             const response=await request(app).post('/loginNurse').send(data)
            .set("Authorization", `bearer ${token}`);
             expect(response.body.result.code).toBe(200)
            })

            test("should return 404 nurse not found",async()=>{
                const response=await request(app).post('/loginNurse').send({
                    "email":"mony89@gmail.com",
                    "password" : "34WEY@!ew",   
                })
                .set("Authorization", `bearer ${token}`);
                expect(response.body.result.code).toBe(404)
               })

               test("should return 401 incorrect password",async()=>{
                const response=await request(app).post('/loginNurse').send({
                    "email" : "noha12@gmail.com",
                    "password" : "34WEY@!mk",
                })
                .set("Authorization", `bearer ${token}`);
                expect(response.body.result.error).toBe("incorrect password")
               })

               test("should handle loginNurse failure",async()=>{
                const response=await request(app).post('/loginNurse').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })
         })
       
        
         describe("PUT /updateNurseData/:id",()=>{
        let data={
            "address" : "minya",
         }

        test("should update nurse",async()=>{
         const response=await request(app)
         .put('/updateNurseData/661dc629187d4085f09b0ae2')
         .send(data)
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(201)
        })

        test("should handle update nurse failure",async()=>{
            const response=await request(app)
            .put('/updateNurseData/65771f46bda5da899859097a')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle nurse not found",async()=>{
            const response=await request(app)
            .put('/updateNurseData/655f7f1bd829d045ed60b8d0')
            .send(data)
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })


     describe("DELETE /deleteNurse/:id",()=>{
        test("should delete nurse",async()=>{
         const response=await request(app)
         .delete('/deleteNurse/661de7e35cd12c331396a7c0')
        .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle delete nurse failure",async()=>{
            const response=await request(app)
            .delete('/deleteNurse/65771f46bda5da899859097a')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle nurse not found",async()=>{
            const response=await request(app)
            .delete('/deleteNurse/6562f7475cb6ae7b3a1cfae9')
           .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })

    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

