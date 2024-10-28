const express = require("express")
const app = express()
const port = 8080

app.get("/",(res,req) => {
  res.send("Hello");
});

app.listen(port,()=>{
  console.log("Node.js 실행");
});