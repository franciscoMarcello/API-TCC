import express from "express";

const app = express();
import routes from "./routes";

app.use(express.json());
app.use(routes);
const port = 5000;
app.get("/", (req, res) => {
  res.send("Hello TCC");
});
app.listen(port, () => console.log(`BackEnd rodando na porta ${port}`));
