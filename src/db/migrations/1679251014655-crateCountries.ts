import { MigrationInterface, QueryRunner } from "typeorm"
import {Country} from '@models';

export class crateCountries1679251014655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const countryRepository = queryRunner.manager.getRepository(Country);
        await countryRepository.save([
            { name: "United States" },
            { name: "Canada" },
            { name: "Argentina" }
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `TRUNCATE TABLE "countries"`
        );
    }

}
