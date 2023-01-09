const express = require('express')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express()

// Set up Global configuration access
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=> console.log('server is running on ',PORT))

app.get('/',express.json(),(req,res)=>{
    res.sendFile(__dirname+'/page1.html')
});
app.get('/page2',express.json(),(req,res)=>{
    res.sendFile(__dirname+'/page2.html')
});


app.post("/user/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
    console.log("generate token")
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.json(token);
});
  
// Verification of JWT
app.get("/user/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    // console.log(tokenHeaderKey,jwtSecretKey)
  
    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        console.log(verified)
        if(verified){
            return res.json({message : "Successfully Verified", data : verified});
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});