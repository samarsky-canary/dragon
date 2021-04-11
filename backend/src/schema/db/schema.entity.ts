import {} from "@nestjs/common";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column("uuid",{
        name: "id_user"
    })
    idUser : string

    @Column("jsonb")
    data: JSON;

    @Column("timestamp")
    last_changed: Date;

    @Column("uuid")
    last_changed_by_id: string;
}