import { Op } from "sequelize"
import {
  DATABASE_DICTIONARY_ERRORS,
  DefaultDatabaseErrorCode
} from "../../../../shared/errors/dictionaries/dictionary-database-error"
import { generateErrorMessage } from "../../../../shared/errors/handlers/generate-error"
import { type User, UserId } from "../../../domain/user.entity"
import type { UserRepositoryInterface } from "../../../domain/user.repository"
import { UserModelMapper } from "./user-model-mapper"
import type { UserModel } from "./user.model"

export class UserSequelizeRepository implements UserRepositoryInterface {
  constructor(private user_model: typeof UserModel) {}

  async insert(entity: User): Promise<void> {
    try {
      const model_props = UserModelMapper.toModel(entity)
      await this.user_model.create(model_props.toJSON())
    } catch (error) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_CANNOT_INSERT,
        DATABASE_DICTIONARY_ERRORS,
        { message: error.message },
        "user-sequelize ::: insert"
      )
    }
  }

  async bulkInsert(entities: User[]): Promise<void> {
    try {
      const models_props = entities.map((entity) => UserModelMapper.toModel(entity).toJSON())
      await this.user_model.bulkCreate(models_props)
    } catch (error) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_CANNOT_INSERT,
        DATABASE_DICTIONARY_ERRORS,
        { error },
        "user-sequelize ::: bulkInsert"
      )
    }
  }

  async update(entity: User): Promise<void> {
    const id = entity.user_id.id

    const model_props = UserModelMapper.toModel(entity)
    const [affected_rows] = await this.user_model.update(model_props.toJSON(), {
      where: { user_id: id }
    })

    if (affected_rows !== 1) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        DATABASE_DICTIONARY_ERRORS,
        {},
        "user-sequelize ::: update"
      )
    }
  }

  async delete(user_id: UserId): Promise<void> {
    const id = user_id.id

    const affected_rows = await this.user_model.destroy({
      where: { user_id: id }
    })

    if (affected_rows !== 1) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        DATABASE_DICTIONARY_ERRORS,
        {},
        "user-sequelize ::: delete"
      )
    }
  }

  async findByIds(ids: UserId[]): Promise<User[]> {
    const models = await this.user_model.findAll({
      where: {
        user_id: {
          [Op.in]: ids.map((id) => id.id)
        }
      }
    })
    return models.map((m) => UserModelMapper.toEntity(m))
  }

  async existsById(ids: UserId[]): Promise<{ exists: UserId[]; not_exists: UserId[] }> {
    const exists_user_models = await this.user_model.findAll({
      attributes: ["user_id"],
      where: {
        user_id: {
          [Op.in]: ids.map((id) => id.id)
        }
      }
    })
    const exists_user_ids = exists_user_models.map((m) => new UserId(m.user_id))
    const not_exists_user_ids = ids.filter((id) => !exists_user_ids.some((e) => e.equals(id)))
    return {
      exists: exists_user_ids,
      not_exists: not_exists_user_ids
    }
  }

  async findById(entity_id: UserId): Promise<User | null> {
    const model = await this.user_model.findByPk(entity_id.id)

    return model ? UserModelMapper.toEntity(model) : null
  }

  async findAll(): Promise<User[]> {
    const models = await this.user_model.findAll()
    return models.map((model) => {
      return UserModelMapper.toEntity(model)
    })
  }

  async findByLogin(login: string): Promise<User | null> {
    const model = await this.user_model.findOne({
      where: {
        login
      }
    })

    return model ? UserModelMapper.toEntity(model) : null
  }
}
