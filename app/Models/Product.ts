import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category: string;

  @column()
  public name: string;

  @column()
  public price: number;

  @column()
  public description: string;

  // @column()
  // public image: any;

  @column()
  public created_by: number;

  @column()
  public isdeleted: boolean;
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static tolowercaseEmail(product: Product) {
    if (!product.$dirty.isdeleted) {
      product.isdeleted = false
    }
  }
}