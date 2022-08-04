import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Policy } from "./Policy";

@Entity("insurer")
export class Insurer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Policy, (policy) => policy.insurer)
  policies: Policy[];
}
