import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, unique: true })
  vin: string;

  @Column({ nullable: false })
  model: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  manufacturer: string;

  @Column({ nullable: false })
  class: string;

  @Column({ nullable: false })
  region: string;

  @Column({ nullable: false })
  wmi: string;

  @Column({ nullable: false })
  vds: string;

  @Column({ nullable: false })
  vis: string;

  @Column({ nullable: false })
  year: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}