import {
  DEFAULT_DICTIONARY_ERROS,
  DefaultErrorsCode
} from "../../../../shared/errors/dictionaries/dictionary-default-errors"
import { generateErrorMessage } from "../../../../shared/errors/handlers/generate-error"
import { Movie, MovieId } from "../../../domain/movie.entity"
import { MovieModel } from "./movie.model"

// biome-ignore lint/complexity/noStaticOnlyClass: this class only needs static methods
export class MovieModelMapper {
  static toModel(entity: Movie): MovieModel {
    return MovieModel.build({
      movie_id: entity.movie_id.id,
      identifier_code: entity.identifier_code,
      user_liked: entity.user_liked,
      backdrop_path: entity.backdrop_path,
      original_title: entity.original_title,
      overview: entity.overview,
      poster_path: entity.poster_path,
      release_date: entity.release_date,
      title: entity.title,
      created_at: entity.created_at
    })
  }

  static toEntity(model: MovieModel): Movie {
    const user = Movie.create(
      {
        user_liked: model.user_liked,
        identifier_code: model.identifier_code,
        backdrop_path: model.backdrop_path,
        original_title: model.original_title,
        overview: model.overview,
        poster_path: model.poster_path,
        release_date: model.release_date,
        title: model.title,
        created_at: model.created_at
      },
      new MovieId(model.movie_id)
    )

    user.validate()
    if (user.notification.hasErrors()) {
      return generateErrorMessage(
        DefaultErrorsCode.ENTITY_VALIDATION,
        DEFAULT_DICTIONARY_ERROS,
        {
          reason: user.notification.toJson()
        },
        "user-model-mapper ::: toEntity"
      )
    }

    return user
  }
}
