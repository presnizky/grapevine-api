import { MigrationInterface, QueryRunner } from "typeorm"
import { User, PaymentMethod } from '@models';

export class createPaymentMethods1679360978966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Get all users
        const users = await queryRunner.manager.find(User);
    
        // Create one payment method for each user
        const paymentMethods: PaymentMethod[] = [];
        users.forEach((user) => {
          const paymentMethod = new PaymentMethod();
          paymentMethod.user = user;
          paymentMethod.name = 'Visa';
          paymentMethod.creditCardNumber = Math.floor(Math.random() * 9000000000000000) + 1000000000000000 + '';
          paymentMethod.expirationDate = new Date('2025-01-01');
          paymentMethod.ccv = Math.floor(Math.random() * 900) + 100;
          paymentMethods.push(paymentMethod);
        });
    
        // Insert payment methods into database
        await queryRunner.manager.save(paymentMethods);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete all payment methods
        await queryRunner.manager.delete(PaymentMethod, {});
      }

}
