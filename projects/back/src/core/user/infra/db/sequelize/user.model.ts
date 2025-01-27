import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"

export type UserModelProps = {
  user_id: string
  name: string
  login: string
  password: string
  created_at: Date
}

// biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
@Table({ tableName: "users", timestamps: false })
export class UserModel extends Model<UserModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare user_id: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.STRING(255), unique: true })
  declare login: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.TEXT })
  declare password: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date
}
