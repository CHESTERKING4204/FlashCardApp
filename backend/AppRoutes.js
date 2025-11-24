const express = require('express');
const Qa = require('./model/question');
const User = require('./model/userInfo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const route = express.Router();

const createToken = (_id) => {
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'1d'});
}

//POST for user
route.post('/signup', async (request, response) => {
    try {
        const {username, password } = request.body;
        if(!password || !username){
            throw Error('All Fields are required!!')
        }
        // if(!validator.email){
        //     throw Error('!! This Type of Email is NOT VALID !!');
        // }
        const exist = await User.findOne({username});
        if(exist){
            throw Error('This Email already Exist Try some another one!!');
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        const userInfo = await User.create({
            username: username,
            password: hash
        });
        const token = createToken(userInfo._id);
        response.status(201).json({userInfo,token});
    }catch(error){
        console.log('POST user error');
        return response.status(404).json({message:error.message});
    }
});

//For the login credentials
route.post('/login',async (request,response)=>{
    try{
        const {username,password} = request.body;
        if(!username || !password){
            throw Error('All the fields are necessary!!');
        }
        const user = await User.findOne({username});
        
        if(!user){
            throw Error('No such Email Exist');
        }
        
        const see = user.password;
        const token = createToken(user._id);
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            throw Error('Password Incorrect');
        }
        response.status(201).json({username,token,see});
        // response.status(201).json({email,token,see,password});  /*This line can be used to see both the real and the hashed password*/
    }catch(error){
        console.log('Get The user error');
        return response.status(404).json({message:error.message});
    }
})

// POST - To insert the question
route.post('/question', async (req, res) => {

    const { question , answer } = req.body;
    
    try {
        if(!question || !answer){
            console.log("Missing");
            throw Error("Missing Data");
        }
        const QuestionAdded = await Qa.create({
            question:question,
            answer:answer
        });
        res.status(201).json(QuestionAdded);
    } catch (error) {
        console.log(error, 'not me must be another one');
        res.status(400).json({ error: error.message });
    }
});


//GET - To get the info for all
route.get("/question", async (req, res) => {
    try {
        const ShowAll = await Qa.find();
        return res.status(200).json(ShowAll);
    } catch (error) {
        console.log(error, 'thats the issue');
        res.status(500).json({ error: error.message });
    }
    // res.send("api running");
});

//To search the id of one question
route.get('/question/:id',async (req,res)=>{
    const {id} = req.params;

    try{
        const getOne = await Qa.findById(id);
        res.status(200).json(getOne);
    }catch (error){
        console.log(error,'may be another place but not here')
        res.status(500).json({error:error.message});
    }

});

//To delete the question
route.delete("/question/:_id", async (req, res) => {
    const { _id } = req.params;

    try {
        const deleteData = await Qa.findByIdAndDelete(_id);
        res.status(200).json(deleteData);
    } catch (error) {
        console.log(error, 'thats the issue');
        res.status(500).json({ error: error.message });
    }
});


//To update the data
route.patch("/question/:id", async (req, res) => {
    const { id } = req.params;
    const { question,answer } = req.body;
    try {
        const UpdateData = await Qa.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(200).json(UpdateData);
    } catch (error) {
        console.log(error, 'thats the issue');
        res.status(500).json({ error: error.message });
    }
    // res.send("api running");
});


module.exports = route;