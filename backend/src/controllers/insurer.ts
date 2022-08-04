import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Insurer } from "../db/entity";

const insurerRepository = AppDataSource.getRepository(Insurer);

export const createInsurer = async (req: Request, res: Response) => {
  if (!req.body.insurer?.name) {
    return res.status(400).send({ message: "Bad values!" });
  }
  await insurerRepository.insert({
    name: req.body.insurer.name,
  });

  res.send({ message: "Success!" });
};

export const getInsurers = async (req: Request, res: Response) => {
  const insurers = await insurerRepository.find();
  res.send({ message: "Success!", insurers });
};
