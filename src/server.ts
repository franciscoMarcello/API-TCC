import express from "express";
import path from "path";
import routes from "./routes";
import cors from "cors";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

const port = 5000;

app.listen(port, () => console.log(`BackEnd rodando na porta ${port}🔥`));
