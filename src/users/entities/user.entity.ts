import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserRoleEnum } from "../enums/UserEnum";

@Entity()
export class UserEntity {
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
    role: UserRoleEnum;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
