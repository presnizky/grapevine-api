import { MigrationInterface, QueryRunner } from 'typeorm';
import { User, DocumentType, State, Country } from '@models';

export class loadUsers1679259425936 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);
        const documentType = await queryRunner.manager.findOneOrFail(DocumentType, {
          where: {name: 'National Id'},
        });
    
        const country = await queryRunner.manager.findOneOrFail(Country, {
          where: {name: 'United States'},
        });
    
        const state = await queryRunner.manager.findOneOrFail(State, {
          where: {name: 'California'},
        });

        await userRepository.save([
            { 
                name: "John",
                lastName: "Doe",
                documentType,
                documentNumber: "12345678",
                city: "Los Angeles",
                state,
                country,
                phoneNumber: "1234567890",
                whatsapp: "1234567890",
                email: "john.doe@example.com",
                facebook: "johndoe",
                twitter: "johndoe",
                instagram: "johndoe",
            },
            {
                name: "Jane",
                lastName: "Doe",
                documentType,
                documentNumber: "87654321",
                city: "San Francisco",
                state,
                country,
                phoneNumber: "1234567890",
                whatsapp: "1234567890",
                email: "jane.doe@example.com",
                facebook: "janedoe",
                twitter: "janedoe",
                instagram: "janedoe",
            },
            {
                name: "Alice",
                lastName: "Smith",
                documentType,
                documentNumber: "ABC12345",
                city: "Los Angeles",
                state,
                country,
                phoneNumber: "1234567890",
                whatsapp: "1234567890",
                email: "alice.smith@example.com",
                facebook: "alicesmith",
                twitter: "alicesmith",
                instagram: "alicesmith",
            },
        ]);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.delete(User, {});
      }

}
