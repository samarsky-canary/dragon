import {} from "@nestjs/common";
import { User } from "src/users/db/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("dragon_scheme")
export class Schema {
    @PrimaryGeneratedColumn("uuid",{
        name: "id",
    })
    uuid: string;

    @Column({
        type: "varchar",
        length: 50
    })
    name : string;

    @ManyToOne(() => User, user => user.curators)
    @JoinColumn({
        name: "id_user"
    })
    id_user : User

    @Column("jsonb")
    data: JSON;

    @Column("timestamp")
    last_changed: Date;

    @ManyToOne(() => User, user => user.curators)
    @JoinColumn({
        name: "last_changed_by_id"
    })
    last_changed_by_id: string;
}