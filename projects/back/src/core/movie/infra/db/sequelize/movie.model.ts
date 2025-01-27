import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"

export type MovieModelProps = {
  movie_id: string
  identifier_code: string
  user_liked: boolean
  backdrop_path: string
  title: string
  original_title: string
  poster_path: string
  release_date: string
  overview: string
  created_at?: Date
}

// biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
@Table({ tableName: "movies", timestamps: false })
export class MovieModel extends Model<MovieModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare movie_id: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.TEXT })
  declare identifier_code: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.BOOLEAN })
  declare user_liked: boolean

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.TEXT })
  declare backdrop_path: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.TEXT })
  declare title: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.TEXT })
  declare original_title: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.TEXT })
  declare poster_path: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.TEXT })
  declare release_date: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.TEXT })
  declare overview: string

  // biome-ignore lint/style/useNamingConvention: sequelize need to be camel case
  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date
}
