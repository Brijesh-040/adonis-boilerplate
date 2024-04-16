import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Staff extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public role: string;

  @column()
  public address: string;

  @column()
  public city: string;

  @column()
  public state: string;

  @column()
  public country: string;

  @column()
  public salary: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
