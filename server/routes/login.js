import { Router } from "express";
import {  getUsers, checkUser } from '../database/mysqldb.js';
import {createHash} from 'crypto';
const router = Router();


router.get("/", async (req, res) => {
    try{
       const users = await getUsers(); 
       res.send(users[0]);
    }
    catch(e) {
        res.send(e);
    }
});

router.post("/", async (req, res) => {
    const {username, password} = req.body;
    try {
        const hashedPassword = createHash('sha256').update(password).digest('hex');
        const sqlCountValue = await checkUser(username, hashedPassword);
        const data = sqlCountValue[0][0];

        const sqlNum = data.count;

        if(sqlNum === 1) { // user exists, send back a 200
            res.send(200);
        }
        else { // else user does not exist, send back an error
            res.send("User does not exist!");
        }
    }
    catch(e) {
        console.log("Error!", e);
        res.send(e);
    }
});


export default router;