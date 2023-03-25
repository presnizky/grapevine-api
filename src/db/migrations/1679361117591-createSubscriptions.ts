import { MigrationInterface, QueryRunner } from "typeorm"
import { User, Subscription } from '@models';
import { generateNextPaymentDates } from "@services/helpers/dates";

const INTERVALS = ['monthly', 'quarterly', 'annual'];

export class createSubscriptions1679361117591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Get all users and payment methods
        const userRepository = queryRunner.manager.getRepository(User);
        const users = await userRepository.find({relations: {paymentMethods: true}});

        // Create one subscription for each user and payment method
        const subscriptions: Subscription[] = [];
        users.forEach(async (user) => {
          const subscription = new Subscription();
          subscription.user = user;
          subscription.startDate = new Date(new Date().getTime() - Math.floor(Math.random() * 7889400000) - 2592000000 * 3); // Set start date to a random date between the past 3 months and now
          subscription.interval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
          subscription.paymentMethod = user.paymentMethods[0];
          subscription.amount = Math.floor(Math.random() * 100) + 10;
          subscription.nextPaymentDate = generateNextPaymentDates(subscription.startDate, subscription.interval)[0];
          subscriptions.push(subscription);
        });
    
        // Insert subscriptions into database
        await queryRunner.manager.save(subscriptions);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete all subscriptions
        await queryRunner.manager.delete(Subscription, {});
      }

}
