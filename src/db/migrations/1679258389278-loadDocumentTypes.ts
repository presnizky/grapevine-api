import { MigrationInterface, QueryRunner } from "typeorm"
import {DocumentType} from '@models';

export class loadDocumentTypes1679258389278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const documentTypeRepository = queryRunner.manager.getRepository(DocumentType);
        await documentTypeRepository.save([
            { name: "National Id" },
            { name: "Passport" }
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
