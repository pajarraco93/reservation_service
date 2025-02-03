import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1738599841768 implements MigrationInterface {
  name = 'CreateTables1738599841768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tables" ("id" character varying NOT NULL, "capacity" integer NOT NULL, CONSTRAINT "PK_7cf2aca7af9550742f855d4eb69" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "reservations" ("id" character varying NOT NULL, "customer_name" character varying NOT NULL, "customer_email" character varying NOT NULL, "party_size" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" character varying, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "reservations" ADD CONSTRAINT "FK_eb7027e899ba8bd29f5bee39531" FOREIGN KEY ("client_id") REFERENCES "tables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservations" DROP CONSTRAINT "FK_eb7027e899ba8bd29f5bee39531"`
    );
    await queryRunner.query(`DROP TABLE "reservations"`);
    await queryRunner.query(`DROP TABLE "tables"`);
  }
}
