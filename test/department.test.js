const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFlYzg2Y2YyYmJhM2YxNmJhMmI2NWEiLCJuYW1lIjoibW9oYW5lZCBBbGkiLCJlbWFpbCI6Im1vaGFuZWQxMkBnbWFpbC5jb20iLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE3MTMyOTM0MjEsImV4cCI6MTcxNTg4NTQyMX0.PukYN3ELU6uSw2x3ulrjqUuTT7bCY_IUMEanvIIK_2s"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Department App",()=>{

        describe("GET /getAllDepartments",()=>{
           test("should read all Departments",async()=>{
            const response=await request(app).get('/getAllDepartments')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get Departments failure",async()=>{
            const response=await request(app).get('/getAllDepartments')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })


        describe("GET /department/:id",()=>{
             test("should handle department not found",async()=>{
                 const response=await request(app).get('/department/661d799944a502bdf57a802e')
                .set("Authorization", `bearer ${token}`);
                 expect(response.body.code).toBe(404)
                })
 
             test("should return department",async()=>{
              const response=await request(app).get('/department/661ece87dfdcd2be93768c5b')
             .set("Authorization", `bearer ${token}`);
              expect(response.body.code).toBe(200)
             })
 
 
             test("should handle department failure",async()=>{
                 const response=await request(app).get('/department/661d799944a502bdf57a802e')
                .set("Authorization", `bearer ${token}`);
                 expect(response.body.code).toBe(403)
                })
 
          })
  

        describe("POST /createDepartment",()=>{
            let data={
                "dep_name":"surgical department",
                "hospital":"660f437b97b4063fdedc34e6"
            }
            test("should create a Department",async()=>{
             const response=await request(app)
             .post('/createDepartment').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })
            test("should handle create department failure",async()=>{
                const response=await request(app)
                .post('/createDepartment').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               }) 

               test("should handle department already exist",async()=>{
                const response=await request(app)
                .post('/createDepartment').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(400)
               }) 
         })
         

       describe("DELETE /deleteDepartment/:id",()=>{

        test("should delete department",async()=>{
         const response=await request(app)
         .delete('/deleteDepartment/661ed03e7c293514f8db32a9')
         .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle delete department failure",async()=>{
            const response=await request(app)
            .delete('/deleteDepartment/661d799944a502bdf57a802e')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle department not found",async()=>{
            const response=await request(app)
            .delete('/deleteDepartment/661d799944a502bdf57a802e') 
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

