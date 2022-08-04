import { Request, Response } from "express";
import { AppDataSource } from "../db/data-source";
import { Customer } from "../db/entity";

const customerRepository = AppDataSource.getRepository(Customer);

export const createCustomer = async (req: Request, res: Response) => {
  if (!req.body.customer?.name || !req.body.customer?.address) {
    return res.status(400).send({ message: "Bad values!" });
  }
  await customerRepository.insert({
    name: req.body.customer.name,
    address: req.body.customer.address,
  });

  res.send({ message: "Success!" });
};

export const getCustomers = async (req: Request, res: Response) => {
  const customers = await customerRepository.find();
  res.send({ message: "Success!", customers });
};
