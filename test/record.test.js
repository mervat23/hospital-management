const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFhZjgxYTgxYmM1NGQ3ZjlhY2Q4YmUiLCJuYW1lIjoibWVydmF0IGdvbWFhIiwiZW1haWwiOiJtZXJvMTJAZ21haWwuY29tIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTcxMzA0MzQ4MiwiZXhwIjoxNzE1NjM1NDgyfQ.O0H5Z2WUIdsi4r7BAlA9xEiI7nhqL_rH2QDQzwzhctE"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Record App",()=>{

        describe("GET /getAllRecords",()=>{
           test("should read all Records",async()=>{
            const response=await request(app).get('/getAllRecords')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get Records failure",async()=>{
            const response=await request(app).get('/getAllRecords')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })

             describe("GET /record/:id",()=>{
             test("should handle record not found",async()=>{
                 const response=await request(app).get('/record/661df27eab087f264a77a79a')
                .set("Authorization", `bearer ${token}`);
                 expect(response.body.code).toBe(404)
                })
 
             test("should return record",async()=>{
              const response=await request(app).get('/record/661c259719269e046532c75b')
             .set("Authorization", `bearer ${token}`);
              expect(response.body.code).toBe(200)
             })
 
 
             test("should handle record failure",async()=>{
                 const response=await request(app).get('/record/661c248e19269e046532c74a')
                .set("Authorization", `bearer ${token}`);
                 expect(response.body.code).toBe(403)
                })
 
            
          })
  

        describe("POST /createRecord",()=>{
            let data={
                "record_no":"1",
                "diagnosis":"trghu",
                "treatment":"take one pike",
                "patient":"6618824876eafbb9b3706dbe",
                "doctor":"6619b0f4feb8e329203c5b7c"
            }
            test("should create a Record",async()=>{
             const response=await request(app)
             .post('/createRecord').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })
            test("should handle create Record failure",async()=>{
                const response=await request(app)
                .post('/createRecord').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               }) 

               test("should handle Record already exist",async()=>{
                const response=await request(app)
                .post('/createRecord').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(400)
               }) 
         })

         describe("PUT /updateRecordData/:id",()=>{
            let data={
                "record_no" : 2
            }
            test("should update Record",async()=>{
             const response=await request(app)
             .put('/updateRecordData/661c259719269e046532c75b')
             .send(data)
            .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })
    
            test("should handle update Record failure",async()=>{
                const response=await request(app)
                .put('/updateRecordData/657826433f90a2dc3c79c3f2')
                .send(data)
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })
    
               test("should handle Record not found",async()=>{
                const response=await request(app)
                .put('/updateRecordData/6575a7398ba9587517ef77f2') 
                .send(data)
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(404)
               })
            })
    

       describe("DELETE /deleteRecord/:id",()=>{


        test("should delete Record",async()=>{
         const response=await request(app)
         .delete('/deleteRecord/661df6d56f30dd1b9ebc16c3')
         .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })
        test("should handle delete Record failure",async()=>{
            const response=await request(app)
            .delete('/deleteRecord/657826433f90a2dc3c79c3f2')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle Record not found",async()=>{
            const response=await request(app)
            .delete('/deleteRecord/6575b356230bb11b0163a877') 
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

