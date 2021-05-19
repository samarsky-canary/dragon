import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1621434839475 implements MigrationInterface {
    name = 'UserMigration1621434839475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "curators" ("id" SERIAL NOT NULL, "id_curator" character varying NOT NULL, "id_user" character varying NOT NULL, "relation_name" character varying NOT NULL, CONSTRAINT "PK_3b54b0e2d17cf411915da8d385a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dragon_scheme" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "id_user" uuid NOT NULL, "data" jsonb NOT NULL, "last_changed" TIMESTAMP NOT NULL, "last_changed_by_id" uuid NOT NULL, CONSTRAINT "PK_12d635922803efaa80a109ff62b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "dragon_scheme"`);
        await queryRunner.query(`DROP TABLE "curators"`);
    }

}
