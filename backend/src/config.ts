import dotEnv from "dotenv";

dotEnv.config();

export const PG_HOST = process.env.PG_HOST as string;
export const PG_PORT = parseInt(process.env.PG_PORT || "5432");
export const PG_USER = process.env.PG_USER as string;
export const PG_PASSWORD = String(process.env.PG_PASSWORD);
export const PG_DATABASE = process.env.PG_DB as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = parseInt(process.env.PORT || "5000");
