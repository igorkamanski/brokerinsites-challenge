import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { PolicyType } from "../db/entity";

const policyTypeRepository = AppDataSource.getRepository(PolicyType);

export const createPolicyType = async (req: Request, res: Response) => {
  if (!req.body.policyType?.name) {
    return res.status(400).send({ message: "Bad values!" });
  }
  await policyTypeRepository.insert({
    name: req.body.policyType.name,
  });

  res.send({ message: "Success!" });
};

export const getPolicyTypes = async (req: Request, res: Response) => {
  const policyTypes = await policyTypeRepository.find();
  res.send({ message: "Success!", policyTypes });
};
