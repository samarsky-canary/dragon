import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({
        type: "varchar",
        length: 50,
    })
    name: string;

    @Column()
    password: string;


    @Column()
    role: string;
};