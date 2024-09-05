const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFkYmUwNTU0YWZlZWNlMjI4NDc3MzYiLCJuYW1lIjoibW9oYW5lZCBBbGkiLCJlbWFpbCI6Im1vaGFuZWQxMkBnbWFpbC5jb20iLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE3MTMyMjUyMjEsImV4cCI6MTcxNTgxNzIyMX0.lS7WkdWmgmykvZXZd0YMT_tCOAgcNeEgX2pfbl8JGgA"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Hospital App",()=>{

        describe("GET /getAllHospitals",()=>{
           test("should read all Hospitals",async()=>{
            const response=await request(app).get('/getAllHospitals')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get Hospitals failure",async()=>{
            const response=await request(app).get('/getAllHospitals')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })



        describe("GET /hospital/:id",()=>{
             test("should handle hospital not found",async()=>{
                 const response=await request(app).get('/hospital/661dbc94ccec739b6d62892a')
                .set("Authorization", `bearer ${token}`);
                 expect(response.body.code).toBe(404)
                })
 
             test("should return hospital",async()=>{
              const response=await request(app).get('/hospital/660f437b97b4063fdedc34e6')
             .set("Authorization", `bearer ${token}`);
              expect(response.body.code).toBe(200)
             })
 
 
             test("should handle hospital failure",async()=>{
                 const response=await request(app).get('/hospital/660f437b97b4063fdedc34e6')
                .set("Authorization", `bearer ${token}`);
                 expect(response.body.code).toBe(403)
                })

          })
  

        describe("POST /createHospital",()=>{
            let data={
                "hos_name":"mony",
                "hos_address":"minya",
                "hos_city":"ghjio"
            }
            test("should create a Hospital",async()=>{
             const response=await request(app)
             .post('/createHospital').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })
            test("should handle create Hospital failure",async()=>{
                const response=await request(app)
                .post('/createHospital').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               }) 

               test("should handle Hospital already exist",async()=>{
                const response=await request(app)
                .post('/createHospital').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.error).toBe("Hospital already exists")
               }) 
         })

         describe("PUT /updateHospitalData/:id",()=>{
            let data={
                "hos_address":"beni suef"
            }
            test("should update Hospital",async()=>{
             const response=await request(app)
             .put('/updateHospitalData/661dc0dcd395c66e668603aa')
             .send(data)
            .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })
    
            test("should handle update Hospital failure",async()=>{
                const response=await request(app)
                .put('/updateHospitalData/657826433f90a2dc3c79c3f2')
                .send(data)
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })
    
               test("should handle Hospital not found ",async()=>{
                const response=await request(app)
                .put('/updateHospitalData/6575a7398ba9587517ef77f2') 
                .send(data)
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(404)
               })
            })
    

       describe("DELETE /deleteHospital/:id",()=>{
        test("should delete Hospital",async()=>{
         const response=await request(app)
         .delete('/deleteHospital/661dc0dcd395c66e668603aa')
         .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })
        test("should handle delete Hospital failure",async()=>{
            const response=await request(app)
            .delete('/deleteHospital/657826433f90a2dc3c79c3f2')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle Hospital not found",async()=>{
            const response=await request(app)
            .delete('/deleteHospital/661c1f0232b4cc7622f64288') 
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

