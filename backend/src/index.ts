import express from "express";
import cors from "cors";
import { AppDataSource } from "./db/data-source";
import { router } from "./routes";
import { PORT } from "./config";

AppDataSource.initialize()
  .then(async () => {
    console.log("CONNECTED TO POSTGRES");

    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use("/", router);

    app.listen(PORT, () =>
      console.log(`Started Listening at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
    throw new Error("UNABLE TO CONNECT TO POSTGRES");
  });
