import express, { Application } from "express";
import pagosRoutes from "../routes/pagos";
import cors from "cors";
import db from "../database/connection";

class Server {

  private app: Application;
  private port: string;
  private paths = {
    pagos: "/api/pagos",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8084";
    this.dbConnection();
    this.middlewares();
    this.routes();
  }
  async dbConnection() {
    try {
      await db.authenticate();
      console.log("DB connected", db.getDialect(),db.getDatabaseName());
    } catch (error) {
      throw new Error(error);
    }
  }
  middlewares() {
    this.app.use(cors()); // config default del cors
    this.app.use(express.json()); // parse el body en json
    this.app.use(express.static("public")); //carpeta publica
  }
  routes() {
    this.app.use(this.paths.pagos, pagosRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en " + this.port);
    });
  }
}

export default Server;
