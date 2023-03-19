import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1679247862657 implements MigrationInterface {
    name = 'initialMigration1679247862657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "intervals" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7e4b9f86ec6cdbdbf21c19f79b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "documentTypes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2738c35707d8919a4c7d15ae510" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "donations" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "nextDonation" TIMESTAMP NOT NULL, "paymentMethod" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "intervalId" integer, CONSTRAINT "PK_c01355d6f6f50fc6d1b4a946abf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paymentTypes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0171f8b6d91e784ea6a4f9ca2cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "states" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "countryId" integer, CONSTRAINT "REL_76ac7edf8f44e80dff569db732" UNIQUE ("countryId"), CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userPaymentTypes" ("id" SERIAL NOT NULL, "paymentNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "paymentTypeId" integer, CONSTRAINT "PK_1c7247d738297f97b76234fe811" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "documentNumber" character varying NOT NULL, "city" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "whatsapp" character varying NOT NULL, "email" character varying NOT NULL, "facebook" character varying NOT NULL, "twitter" character varying NOT NULL, "instagram" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "documentTypeId" integer, "stateId" integer, "countryId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "donations" ADD CONSTRAINT "FK_b72508f993f31e7a2eabe76b174" FOREIGN KEY ("intervalId") REFERENCES "intervals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "states" ADD CONSTRAINT "FK_76ac7edf8f44e80dff569db7321" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userPaymentTypes" ADD CONSTRAINT "FK_689b197758900ac85064679f5db" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userPaymentTypes" ADD CONSTRAINT "FK_38d72a314350bab199383a71766" FOREIGN KEY ("paymentTypeId") REFERENCES "paymentTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8ba1eab72ad9e9c722e67d4a8db" FOREIGN KEY ("documentTypeId") REFERENCES "documentTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_17bdaad57c3360aae9fb9a1741f" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_cc0dc7234854a65964f1a268275" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_cc0dc7234854a65964f1a268275"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_17bdaad57c3360aae9fb9a1741f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8ba1eab72ad9e9c722e67d4a8db"`);
        await queryRunner.query(`ALTER TABLE "userPaymentTypes" DROP CONSTRAINT "FK_38d72a314350bab199383a71766"`);
        await queryRunner.query(`ALTER TABLE "userPaymentTypes" DROP CONSTRAINT "FK_689b197758900ac85064679f5db"`);
        await queryRunner.query(`ALTER TABLE "states" DROP CONSTRAINT "FK_76ac7edf8f44e80dff569db7321"`);
        await queryRunner.query(`ALTER TABLE "donations" DROP CONSTRAINT "FK_b72508f993f31e7a2eabe76b174"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "userPaymentTypes"`);
        await queryRunner.query(`DROP TABLE "states"`);
        await queryRunner.query(`DROP TABLE "paymentTypes"`);
        await queryRunner.query(`DROP TABLE "donations"`);
        await queryRunner.query(`DROP TABLE "documentTypes"`);
        await queryRunner.query(`DROP TABLE "intervals"`);
        await queryRunner.query(`DROP TABLE "countries"`);
    }

}
