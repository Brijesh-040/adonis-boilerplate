import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'staffs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string("name");
      table.string("role");
      table.string("address");
      table.string("city");
      table.string("state");
      table.string("country");
      table.integer("salary");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
