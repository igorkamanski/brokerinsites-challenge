import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export enum TokenExpirationEnum {
  SHORT = "1 days",
  LONG = "30 days",
}

export const signToken = (
  payload: any,
  expiresIn: TokenExpirationEnum | undefined
) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const validateToken = (token: string): any => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, function (error, payload) {
      if (error) {
        reject();
      } else {
        resolve(payload);
      }
    });
  });
};
