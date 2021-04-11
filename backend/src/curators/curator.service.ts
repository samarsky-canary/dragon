import { BadRequestException, ConflictException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Curator } from './db/curator.entity';
import { CuratorDto } from './dto/create-curator.dto';

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

    async findStudents(id_curator: number) {
        throw NotImplementedException;
    }

    async findCurators(id_user: number) {
        throw NotImplementedException;
    }

    async update(id: number, payload: CuratorDto) {
        return this.CuratorRepository.findOne({id: id }).then(async relation => {
           return this.CuratorRepository.save({...relation, ...payload}).catch(err =>
            { throw new BadRequestException(err.message)});
        })
    }


    async create(curator: CuratorDto) {
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
}
