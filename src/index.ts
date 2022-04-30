import express from "express";
import path from 'path'
const app = express();
import routes from "./routes";
require('dotenv').config()
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
app.use(routes);
const port = 5000;

app.listen(port, () => console.log(`BackEnd rodando na porta ${port}`));
