require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const authuser = require('./routes/user');
const authjob = require('./routes/job');
const authimage = require('./routes/image');
const authsearch = require('./routes/search');
const verifyjwt = require('./middlewares/verifyjwt');
const path = require('path');
const cors = require('cors');


app.use(express.static(path.join(__dirname,"images")));
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello world');
})

app.use('/api/user' , authuser);
app.use('/api/job', verifyjwt , authjob);
app.use('/api/search', verifyjwt , authsearch);
app.use('/api/image', authimage);





const port = 3000;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();