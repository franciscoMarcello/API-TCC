import express from "express";

const app = express();
import routes from "./routes";
require('dotenv').config()
app.use(express.json());
app.use(routes);
const port = 5000;

app.listen(port, () => console.log(`BackEnd rodando na porta ${port}`));
