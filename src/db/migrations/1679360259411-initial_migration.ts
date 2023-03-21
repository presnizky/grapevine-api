import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1679360259411 implements MigrationInterface {
    name = 'initialMigration1679360259411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paymentMethods" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creditCardNumber" character varying NOT NULL, "expirationDate" TIMESTAMP NOT NULL, "ccv" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_a3541ea2a9f501304e8dcdd20e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" SERIAL NOT NULL, "startDate" TIMESTAMP NOT NULL, "interval" character varying NOT NULL, "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "paymentMethodId" integer, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "donations" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "nextPaymentDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "subscriptionId" integer, "paymentMethodId" integer, CONSTRAINT "PK_c01355d6f6f50fc6d1b4a946abf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "paymentMethods" ADD CONSTRAINT "FK_66534107d293cec1fa3794fc42a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_072c450d7113d25f1be09a3375b" FOREIGN KEY ("paymentMethodId") REFERENCES "paymentMethods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donations" ADD CONSTRAINT "FK_cfd5edc39019b9001bd86e90f77" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donations" ADD CONSTRAINT "FK_08a49ec377ce710b52eacde069f" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "donations" ADD CONSTRAINT "FK_2a93721ae5d01edb6f61e688d1e" FOREIGN KEY ("paymentMethodId") REFERENCES "paymentMethods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "donations" DROP CONSTRAINT "FK_2a93721ae5d01edb6f61e688d1e"`);
        await queryRunner.query(`ALTER TABLE "donations" DROP CONSTRAINT "FK_08a49ec377ce710b52eacde069f"`);
        await queryRunner.query(`ALTER TABLE "donations" DROP CONSTRAINT "FK_cfd5edc39019b9001bd86e90f77"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_072c450d7113d25f1be09a3375b"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84"`);
        await queryRunner.query(`ALTER TABLE "paymentMethods" DROP CONSTRAINT "FK_66534107d293cec1fa3794fc42a"`);
        await queryRunner.query(`DROP TABLE "donations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "paymentMethods"`);
    }

}
