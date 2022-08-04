import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./Customer";
import { Insurer } from "./Insurer";
import { PolicyType } from "./PolicyType";

@Entity("policy")
export class Policy extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  premium: number;

  @ManyToOne(() => Customer, (customer) => customer.policies, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "policy_id",
  })
  customer: Customer;

  @ManyToOne(() => PolicyType, (policyType) => policyType.policies, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "policy_type_id",
  })
  policyType: PolicyType;

  @ManyToOne(() => Insurer, (insurer) => insurer.policies, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "insurer_id",
  })
  insurer: Insurer;
}
