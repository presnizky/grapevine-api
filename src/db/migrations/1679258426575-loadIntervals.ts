import { MigrationInterface, QueryRunner } from "typeorm"
import {Interval} from '@models';

export class loadIntervals1679258426575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const paymentTypeRepository = queryRunner.manager.getRepository(Interval);
        await paymentTypeRepository.save([
            { name: "daily" },
            { name: "weekly" },
            { name: "monthly" },
            { name: "bi-monthly" },
            { name: "quarterly" },
            { name: "yearly" }
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
