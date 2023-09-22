const mongoose=require('mongoose')
const mongoURI=process.env.MONGODB

mongoose
.connect(mongoURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>{
  console.log("mongodb connected")
})
.catch((err)=>{
  console.error("err in connection of mongo",err)
})