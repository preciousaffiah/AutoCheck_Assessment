import { LoanStatus } from "src/enums/role";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false }) //TODO: connect to user entity
  user_id: string;

  @Column({ nullable: false })
  amount: string;

  @Column({ nullable: false, default: LoanStatus.PENDING })
  status: LoanStatus;

  @Column({ nullable: false , default: false})
  paid: boolean;

  @Column({ nullable: false })
  due_date: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
