import { MigrationInterface, QueryRunner } from "typeorm"
import {PaymentType} from '@models';

export class loadPaymentTypes1679258408436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const paymentTypeRepository = queryRunner.manager.getRepository(PaymentType);
        await paymentTypeRepository.save([
            { name: "National Id" },
            { name: "Passport" }
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
