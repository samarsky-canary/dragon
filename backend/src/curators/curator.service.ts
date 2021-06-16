import { BadRequestException, ConflictException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Curator } from './db/curator.entity';
import { CreateCuratorDto } from './dto/create-curator.dto';
import { CuratorDto } from './dto/curatorDTO';

@Injectable()
export class CuratorService {
    constructor(
    @InjectRepository(Curator) private CuratorRepository : Repository<Curator>
    ) {}

    async findAll(): Promise<Curator[]> {
        return this.CuratorRepository.find();
    }

    async findOneById(id: number) {
        return await this.CuratorRepository.findOne(id).then(
            user => {
                if (user) return user;
                throw new NotFoundException("Relation not found");
            } 
        )
    }

    async findStudents(id_curator: string) {
        return this.CuratorRepository.find({where: {uuid_curator: id_curator}})
    }

    async update(payload: CuratorDto) {
        return this.CuratorRepository.findOne(payload.id).then(async relation => {
           return this.CuratorRepository.save({...relation, ...payload}).catch(err =>
            { throw new BadRequestException(err.message)});
        })
    }


    async create(curator: CreateCuratorDto) {
        const relation = this.CuratorRepository.create(curator);
        return this.CuratorRepository.save(relation).catch(err =>
            {throw new BadRequestException(err.message)});
    }

    async delete(id: number) : Promise<DeleteResult>{
        const deleterRelation = this.CuratorRepository.delete(id);
        if ((await deleterRelation).affected === 0) {
            throw new NotFoundException("Relation not found");
        }
        return deleterRelation;
    }

    // async deletebyUserId(user_id: string) {
    //     return this.CuratorRepository.findOne({where: { uuid_user: user_id}})
    //     .then(relation=> this.CuratorRepository.delete(relation));
    // }
}
