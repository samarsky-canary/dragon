import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid",{
        name: "id"
    })
    uuid: string;
    
    @Column({
        type: "varchar",
        length: 50,
    })
    username: string;

    @Column()
    password: string;


    @Column()
    role: string;
}