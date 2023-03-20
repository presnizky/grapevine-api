import { MigrationInterface, QueryRunner } from "typeorm"
import { User, Donation, PaymentType, Interval } from '@models';

export class loadDonations1679259447480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const users = await queryRunner.manager.find(User);
        const intervals = await queryRunner.manager.find(Interval);
        const paymentTypes = await queryRunner.manager.find(PaymentType);

        const donationsData = users.flatMap((user) => {
            const donations: any[] = [];
      
            for (let i = 0; i < 5; i++) {
              const interval = intervals[Math.floor(Math.random() * intervals.length)];
              const paymentType = paymentTypes[Math.floor(Math.random() * paymentTypes.length)];
      
              donations.push({
                amount: Math.floor(Math.random() * 100) + 1,
                interval,
                nextDonation: new Date(),
                paymentMethod: paymentType.id,
                user,
              });
            }
      
            return donations;
          });
      
          await queryRunner.manager.save(Donation, donationsData);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
