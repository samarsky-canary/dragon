import { User } from "src/users/db/user.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('curators')
@Unique("relation",["uuid_user","uuid_curator"])
export class Curator {
    
    @PrimaryGeneratedColumn('increment')
    id : number

    @ManyToOne(() => User, user => user.curators)
    @JoinColumn({
        name: "id_curator"
    })
    uuid_curator: User

    @ManyToOne(() => User, user => user.curators)
    @JoinColumn({
        name: "id_user"
    })
    uuid_user: User;

    @Column({
        type: "text",
    })
    relation_name: string
}