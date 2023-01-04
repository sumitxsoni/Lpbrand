const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=> console.log('server is running on ',PORT))

app.get('/',express.json(),(req,res)=>{
    res.sendFile(__dirname+'/page1.html')
});
app.get('/page2',express.json(),(req,res)=>{
    res.sendFile(__dirname+'/page2.html')
});
