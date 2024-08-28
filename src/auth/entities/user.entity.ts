import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  fname: string;

  @Column({ nullable: false })
  lname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  mobile: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  BVN: string;

  @Column({ nullable: false })
  role: string; //TODO://enum //default REGULAR 

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
