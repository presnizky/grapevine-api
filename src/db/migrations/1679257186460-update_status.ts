import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1679257186460 implements MigrationInterface {
    name = 'initialMigration1679257186460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "states" DROP CONSTRAINT "FK_76ac7edf8f44e80dff569db7321"`);
        await queryRunner.query(`ALTER TABLE "states" DROP CONSTRAINT "REL_76ac7edf8f44e80dff569db732"`);
        await queryRunner.query(`ALTER TABLE "states" ADD CONSTRAINT "FK_76ac7edf8f44e80dff569db7321" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "states" DROP CONSTRAINT "FK_76ac7edf8f44e80dff569db7321"`);
        await queryRunner.query(`ALTER TABLE "states" ADD CONSTRAINT "REL_76ac7edf8f44e80dff569db732" UNIQUE ("countryId")`);
        await queryRunner.query(`ALTER TABLE "states" ADD CONSTRAINT "FK_76ac7edf8f44e80dff569db7321" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
