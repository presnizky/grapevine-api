import { MigrationInterface, QueryRunner } from "typeorm"
import { User } from '@models';

export class createUsers1679360657417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);  

        // Insert users into database
        await userRepository.save([
          { 
            firstName: "John",
            lastName: "Doe",
          },
          {
              firstName: "Jane",
              lastName: "Doe",
          },
          {
              firstName: "Alice",
              lastName: "Smith",
          },
        ]);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete all users
        await queryRunner.manager.delete(User, {});
      }

}
