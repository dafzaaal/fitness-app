import { Router } from "express";
import {insertUser, checkEmail} from "../database/mysqldb.js";
import {createHash} from 'crypto';

const router = Router();

router.post("/", async (req, res) => {
    try{
        const {name, username, password, email} = req.body;
        const response = await checkEmail(email);
        const sqlCountValue = response[0][0];
        const countValue = sqlCountValue["count"];

        if(countValue === 1){
            res.send("This email is already tied to an account.")
        }
        else {
            const hashedPassword = createHash('sha256').update(password).digest('hex');
            insertUser(name, username, hashedPassword, email);
            res.send("User Created!");
        }

        
    }
    catch(e) {
        console.log("Error!", e);
        res.send(e);
    }
});



export default router;