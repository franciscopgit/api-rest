import dotenv from "dotenv";
import { resolve } from "path";
import cors from "cors";
import helmet from "helmet";
import delay from "express-delay"; // deu certo!

dotenv.config();

import "./database";

import express from "express"; // eslint-disable-line import/no-extraneous-dependencies
import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import alunoRoutes from "./routes/alunoRoutes";
import fotoRoutes from "./routes/fotoRoutes";

// const whitelist = ["http://34.95.158.6:81/", "http://localhost:3001/"];

// const corsOptions = {
//   origin(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CROS"));
//     }
//   },
// };

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(delay(500));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      "/images/",
      express.static(resolve(__dirname, "..", "uploads", "images"))
    );
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users/", userRoutes);
    this.app.use("/tokens/", tokenRoutes);
    this.app.use("/alunos/", alunoRoutes);
    this.app.use("/fotos/", fotoRoutes);
  }
}

export default new App().app; //Exportando a class já instanciada com this.app
