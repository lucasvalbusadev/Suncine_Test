import { Op } from "sequelize"
import {
  DATABASE_DICTIONARY_ERRORS,
  DefaultDatabaseErrorCode
} from "../../../../shared/errors/dictionaries/dictionary-database-error"
import { generateErrorMessage } from "../../../../shared/errors/handlers/generate-error"
import { type Movie, MovieId } from "../../../domain/movie.entity"
import type { MovieRepositoryInterface } from "../../../domain/movie.repository"
import { MovieModelMapper } from "./movie-model-mapper"
import type { MovieModel } from "./movie.model"

export class MovieSequelizeRepository implements MovieRepositoryInterface {
  constructor(private movie_model: typeof MovieModel) {}

  async insert(entity: Movie): Promise<void> {
    try {
      const model_props = MovieModelMapper.toModel(entity)
      await this.movie_model.create(model_props.toJSON())
    } catch (error) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_CANNOT_INSERT,
        DATABASE_DICTIONARY_ERRORS,
        { message: error.message },
        "movie-sequelize ::: insert"
      )
    }
  }

  async bulkInsert(entities: Movie[]): Promise<void> {
    try {
      const models_props = entities.map((entity) => MovieModelMapper.toModel(entity).toJSON())
      await this.movie_model.bulkCreate(models_props)
    } catch (error) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_CANNOT_INSERT,
        DATABASE_DICTIONARY_ERRORS,
        { error },
        "movie-sequelize ::: bulkInsert"
      )
    }
  }

  async update(entity: Movie): Promise<void> {
    const id = entity.movie_id.id

    const model_props = MovieModelMapper.toModel(entity)
    const [affected_rows] = await this.movie_model.update(model_props.toJSON(), {
      where: { movie_id: id }
    })

    if (affected_rows !== 1) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        DATABASE_DICTIONARY_ERRORS,
        {},
        "movie-sequelize ::: update"
      )
    }
  }

  async delete(movie_id: MovieId): Promise<void> {
    const id = movie_id.id

    const affected_rows = await this.movie_model.destroy({
      where: { movie_id: id }
    })

    if (affected_rows !== 1) {
      generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        DATABASE_DICTIONARY_ERRORS,
        {},
        "movie-sequelize ::: delete"
      )
    }
  }

  async findByIds(ids: MovieId[]): Promise<Movie[]> {
    const models = await this.movie_model.findAll({
      where: {
        movie_id: {
          [Op.in]: ids.map((id) => id.id)
        }
      }
    })
    return models.map((m) => MovieModelMapper.toEntity(m))
  }

  async existsById(ids: MovieId[]): Promise<{ exists: MovieId[]; not_exists: MovieId[] }> {
    const exists_movie_models = await this.movie_model.findAll({
      attributes: ["movie_id"],
      where: {
        movie_id: {
          [Op.in]: ids.map((id) => id.id)
        }
      }
    })
    const exists_movie_ids = exists_movie_models.map((m) => new MovieId(m.movie_id))
    const not_exists_movie_ids = ids.filter((id) => !exists_movie_ids.some((e) => e.equals(id)))
    return {
      exists: exists_movie_ids,
      not_exists: not_exists_movie_ids
    }
  }

  async findById(entity_id: MovieId): Promise<Movie | null> {
    const model = await this.movie_model.findByPk(entity_id.id)

    return model ? MovieModelMapper.toEntity(model) : null
  }

  async findByIdentifierCode(identifier_code: string[]): Promise<Movie[]> {
    const models = await this.movie_model.findAll({
      where: {
        identifier_code: {
          [Op.in]: identifier_code.map((id) => id)
        }
      }
    })

    return models.map((m) => MovieModelMapper.toEntity(m))
  }

  async findAll(): Promise<Movie[]> {
    const models = await this.movie_model.findAll()
    return models.map((model) => {
      return MovieModelMapper.toEntity(model)
    })
  }
}
