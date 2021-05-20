import { Curator } from "src/curators/db/curator.entity";
import { Schema } from "src/schema/db/schema.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid",{
        name: "id"
    })
    uuid: string;
    
    @Column({
        type: "varchar",
        length: 50,
        unique: true,
    })
    username: string;

    @Column()
    password: string;


    @Column()
    role: string;

    @OneToMany(()=> Curator, curator => curator.uuid_curator)
    curators: Curator[]

    @OneToMany(()=> Curator, curator => curator.uuid_curator)
    schemas: Schema[]
}