import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/usuario.entity";

@Entity("books")
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    description: string;

    @ManyToMany(type => User, user => user.books, { eager: true })
    @JoinColumn()
    authors: User[];

    @Column({ type: "varchar", default: "ACTIVE", length: 8 })
    status: string;

    @CreateDateColumn({ type: "timestamp", name: "created_at" })
    createAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}