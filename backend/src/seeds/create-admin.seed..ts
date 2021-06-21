import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { User } from "../users/db/user.entity";

export default class CreateAdmin implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      await factory(User)().createMany(1)
    }
  }