import express from "express";
import cors from "cors";
import LoginRoute from "./routes/login.js";
import CreateRoute from "./routes/create_acc.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());



app.use("/api/v1/login", LoginRoute);
app.use("/api/v1/create", CreateRoute);

app.listen(port);