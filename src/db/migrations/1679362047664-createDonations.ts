import { MigrationInterface, QueryRunner } from "typeorm"
import { User, PaymentMethod, Subscription, Donation } from '@models';

function generatePaymentDates(startDate: Date, interval: string): Date[] {
    const paymentDates: Date[] = [];
    const today = new Date();
    let date = new Date(startDate);
  
    for (let i = 0; i < 3; i++) {
      paymentDates.push(date);
      date = incrementDate(date, interval);
    }
  
    return paymentDates;
  }
  
  function incrementDate(date: Date, interval: string): Date {
    const nextDate = new Date(date);
  
    switch (interval) {
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(nextDate.getMonth() + 3);
        break;
      case 'annual':
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
    }
  
    return nextDate;
  }

export class createDonations1679362047664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);
        // const subscriptionRepository = queryRunner.manager.getRepository(Subscription);
        // const paymentMethodRepository = queryRunner.manager.getRepository(PaymentMethod);
        const donationRepository = queryRunner.manager.getRepository(Donation);
    
        const users = await userRepository.find({relations: {subscriptions: true, paymentMethods: true}});
        const donations: Donation[] = [];

        users.forEach(user => {
          const paymentDates = generatePaymentDates(user.subscriptions[0].startDate, user.subscriptions[0].interval);

          paymentDates.forEach(paymentDate => {
            const donation = new Donation();
            donation.user = user;
            donation.subscription = user.subscriptions[0];
            donation.paymentMethod = user.paymentMethods[0];
            donation.amount = user.subscriptions[0].amount;
            donation.nextPaymentDate = paymentDate;
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