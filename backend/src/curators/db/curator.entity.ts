import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('curators')
export class Curator {
    
    @PrimaryGeneratedColumn('increment')
    id : number

    @Column({
        name: "id_curator"
    })
    uuid_curator: string

    @Column({
        name: "id_user"
    })
    uuid_user: string;

    @Column()
    relation_name: string
}