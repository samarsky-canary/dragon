// import {} from "@nestjs/common";
// import { User } from "src/users/db/user.entity";
// import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity("schema")
// export class Schema {
//     @PrimaryGeneratedColumn('uuid')
//     uuid: string;

//     @Column()
//     schema_name : string;


//     @OneToOne(type => User)
//     @JoinColumn()
//     user : User;

//     @Column({
//         type: "jsonb",
//         array: false,
//         default: () => "'[]'",
//         nullable: false,
//     })
//     users : Array<{id: number}> = [];
// }