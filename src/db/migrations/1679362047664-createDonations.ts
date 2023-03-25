import { MigrationInterface, QueryRunner } from "typeorm"
import { User, PaymentMethod, Subscription, Donation } from '@models';
import { generateNextPaymentDates, getPreviousPaymentDate } from "@services/helpers/dates";

export class createDonations1679362047664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);   
        const users = await userRepository.find({relations: {subscriptions: true, paymentMethods: true}});
        const donations: Donation[] = [];

        users.forEach(user => {
          const nextPaymentDates = generateNextPaymentDates(user.subscriptions[0].startDate, user.subscriptions[0].interval, 3);

          nextPaymentDates.forEach(nextPaymentDate => {
            const donation = new Donation();

            donation.user = user;
            donation.subscription = user.subscriptions[0];
            donation.paymentMethod = user.paymentMethods[0];
            donation.amount = user.subscriptions[0].amount;
            donation.paymentDate = getPreviousPaymentDate(user.subscriptions[0].startDate, user.subscriptions[0].interval);
            donations.push(donation);
          });
        });

        // Insert subscriptions into database
        await queryRunner.manager.save(donations);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM donations');
      }
}