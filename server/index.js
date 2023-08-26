import express from "express";
import cors from "cors";
import LoginRoute from "./routes/login.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());



app.use("/api/v1/login", LoginRoute);

app.listen(port);