import "reflect-metadata";
import { DataSource } from "typeorm";
import { PG_DATABASE, PG_PASSWORD, PG_PORT, PG_USER } from "../config";

import { Customer, Insurer, Policy, PolicyType } from "./entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  port: PG_PORT,
  username: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Customer, Insurer, Policy, PolicyType],
  subscribers: [],
  migrations: [],
});
