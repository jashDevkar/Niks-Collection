import express from  'express';



const app = new express();


app.listen(8000,()=>{
    console.log("server is listening on port 8000")
})