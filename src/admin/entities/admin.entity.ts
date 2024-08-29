import { Role } from "src/enums/role";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  fname: string;

  @Column({ nullable: false })
  lname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: Role.ADMIN })
  role: Role;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
