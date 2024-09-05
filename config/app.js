const express=require("express")
const app=express()
const path=require("path")
require('dotenv').config()
const connection=require('./database').connection
connection()

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public/")));

const indexRoutes=require("../routes/index.route")
const {handleCorsPolicy}=require("../helpers/cors")

app.use(express.json())
app.use(indexRoutes)
app.use(handleCorsPolicy)

module.exports=app

