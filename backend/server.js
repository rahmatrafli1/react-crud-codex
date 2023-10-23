import "dotenv/config";
import express from "express";
import router from "./router/router.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3500;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
