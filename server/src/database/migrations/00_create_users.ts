import knex from "knex";

export async function up(knex: knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("passwordResetToken");
    table.bigInteger("passwordResetExpires");
    table.string("token");
    table.string("avatar").defaultTo("");
    table.string("whatsapp").defaultTo("");
    table.string("bio").defaultTo("");
    table.boolean("proffy").notNullable().defaultTo(false);
  });
}

export async function down(knex: knex) {
  return knex.schema.dropTable("users");
}
