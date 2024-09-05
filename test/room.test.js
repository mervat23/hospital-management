const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFkYmUwNTU0YWZlZWNlMjI4NDc3MzYiLCJuYW1lIjoibW9oYW5lZCBBbGkiLCJlbWFpbCI6Im1vaGFuZWQxMkBnbWFpbC5jb20iLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE3MTMyMjUyMjEsImV4cCI6MTcxNTgxNzIyMX0.lS7WkdWmgmykvZXZd0YMT_tCOAgcNeEgX2pfbl8JGgA"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Room App",()=>{

        describe("GET /getAllRooms",()=>{
           test("should read all Rooms",async()=>{
            const response=await request(app).get('/getAllRooms')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(200)
           })

           test("should handle get Rooms failure",async()=>{
            const response=await request(app).get('/getAllRooms')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })
        })



        describe("GET /room/:id",()=>{
             test("should handle room not found",async()=>{
                 const response=await request(app).get('/room/661c259719269e046532c75b')
                .set("Authorization", `bearer ${token}`);
                 expect(response.body.code).toBe(404)
                })
 
             test("should return room",async()=>{
              const response=await request(app).get('/room/661dfb46c9f71c92a901f45c')
             .set("Authorization", `bearer ${token}`);
              expect(response.body.code).toBe(200)
             })
 
 
             test("should handle room failure",async()=>{
                 const response=await request(app).get('/room/661c272f8ddabc1e8a77dfa')
                .set("Authorization", `bearer ${token}`);
                 expect(response.body.code).toBe(403)
                })
 
            
          })
  

        describe("POST /createRoom",()=>{
            let data={
                "room_type" : "double",
                "room_number" : 1,
                "status" : "dtyy",
                "hospital":"660f437b97b4063fdedc34e6"
            }
            test("should create a Room",async()=>{
             const response=await request(app)
             .post('/createRoom').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })
            test("should handle create Room failure",async()=>{
                const response=await request(app)
                .post('/createRoom').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               }) 

               test("should handle Room already exist",async()=>{
                const response=await request(app)
                .post('/createRoom').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(400)
               }) 
         })

         describe("PUT /updateRoomData/:id",()=>{
            let data={
                "room_type" : "single"
            }
            test("should update Room",async()=>{
             const response=await request(app)
             .put('/updateRoomData/661ec5156729f75a6b224f53')
             .send(data)
            .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })
    
            test("should handle update Room failure",async()=>{
                const response=await request(app)
                .put('/updateRoomData/657826433f90a2dc3c79c3f2')
                .send(data)
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               })
    
               test("should handle Room not found ",async()=>{
                const response=await request(app)
                .put('/updateRoomData/6575a7398ba9587517ef77f2') 
                .send(data)
               .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(404)
               })
            })
    

       describe("DELETE /deleteRoom/:id",()=>{


        test("should delete Room",async()=>{
         const response=await request(app)
         .delete('/deleteRoom/661ec5156729f75a6b224f53')
         .set("Authorization", `bearer ${token}`);
         expect(response.body.code).toBe(200)
        })

        test("should handle delete Room failure",async()=>{
            const response=await request(app)
            .delete('/deleteRoom/657826433f90a2dc3c79c3f2')
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(403)
           })

           test("should handle Room not found",async()=>{
            const response=await request(app)
            .delete('/deleteRoom/6575b356230bb11b0163a877') 
            .set("Authorization", `bearer ${token}`);
            expect(response.body.code).toBe(404)
           })
     })
    })


    afterAll(()=>{
        mongoDB.disconnect()
    })
})

