import { Router } from "express";
import {  getUsers, checkUser } from '../database/mysqldb.js';
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
        const count = await checkUser(username, password);
        res.send(count[0]);
    }
    catch(e) {
        console.log("Error!", e);
        res.send(e);
    }
});


export default router;