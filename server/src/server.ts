import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes";
import { errors } from "celebrate";

const portNumber = 3333;
export const serverURL = `http://10.0.0.172:${portNumber}`;

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(errors());

app.listen(portNumber);
