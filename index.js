const express=require('express');
require("dotenv").config();
const cors=require('cors');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
mongoose.connect("mongodb+srv://adarsh-admin:AoUJo2luTwjrCDHv@cluster0.jjs5s.mongodb.net/doubt");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error:'));
db.once('open', () => {
     console.log('Mongodb Connection Successful');
});
const app=express();
const PORT=process.env.PORT || 8080;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
// app.use(express.static(__dirname+'/public'));
 app.use(cors({credentials:true,origin:"http://localhost:8001"}))
const router = require("./routes/api");
app.use("/api", router);

app.get("/api/", (req, res) => {
  console.log("GET /api");
  console.log(req.query);
  // console.log(req.body);
  // console.log(req.headers);
  
  res.status(400).send({"fevr":"fv"})
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
