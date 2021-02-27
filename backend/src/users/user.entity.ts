import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;
    
    @Column({
        type: "varchar",
        length: 50,
    })
    name: string;

    @Column()
    password: string;
};