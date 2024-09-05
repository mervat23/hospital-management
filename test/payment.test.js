const request=require("supertest")
const app=require("../config/app")
const mongoDB=require("../config/database")

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFkZThlMWY3NDU0MGYyY2JkZDI5NmYiLCJuYW1lIjoibW9uYSBhc2hyYWYiLCJlbWFpbCI6Im1vbmExMkBnbWFpbC5jb20iLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTcxMzIzNjE5MywiZXhwIjoxNzE1ODI4MTkzfQ.SRvr-PmV4lLPJqCWUV_h2yCnPnZxLAkMXglp9fcyKyk"

describe("Testing Admin App",()=>{
    beforeEach(()=>{
     mongoDB.connect()

    })

    describe("Testing Payment App",()=>{

        describe("POST /createPayment",()=>{
            let data={
                "patient":"6618824876eafbb9b3706dbe",
                "amount":3000,
                "appointment":"6618824876eafbb9b3706dbe",
                "method":"paypal"
            }
            test("should create a Payment",async()=>{
             const response=await request(app)
             .post('/createPayment').send(data)
             .set("Authorization", `bearer ${token}`);
             expect(response.body.code).toBe(201)
            })
            test("should handle create payment failure",async()=>{
                const response=await request(app)
                .post('/createPayment').send(data)
                .set("Authorization", `bearer ${token}`);
                expect(response.body.code).toBe(403)
               }) 

         })
        })
     
    afterAll(()=>{
        mongoDB.disconnect()
    })
})

