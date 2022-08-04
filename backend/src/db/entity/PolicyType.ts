import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Policy } from "./Policy";

@Entity("policy_type")
export class PolicyType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Policy, (policy) => policy.policyType)
  policies: Policy[];
}
