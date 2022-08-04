import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Policy } from "../db/entity";

const policyRepository = AppDataSource.getRepository(Policy);

export const createPolicy = async (req: Request, res: Response) => {
  if (
    !req.body.policy?.customer ||
    !req.body.policy?.insurer ||
    !req.body.policy?.policyType ||
    !req.body.policy?.premium
  ) {
    return res.status(400).send({ message: "Bad values!" });
  }
  await policyRepository.insert({
    customer: req.body.policy.customer,
    insurer: req.body.policy.insurer,
    policyType: req.body.policy.policyType,
    premium: req.body.policy.premium,
  });

  res.send({ message: "Success!" });
};

export const getPolicies = async (req: Request, res: Response) => {
  const policies = await policyRepository.find({
    relations: {
      customer: true,
      policyType: true,
      insurer: true,
    },
  });
  res.send({ message: "Success!", policies });
};
