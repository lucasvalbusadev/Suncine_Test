import { Entity } from "../../shared/domain/entity"
import { Uuid } from "../../shared/domain/value-objects/uuid.vo"
import { MovieValidatorFactory } from "./movie.validator"

export type MovieConstructorProps = {
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

export type MovieToJsonProps = {
  movie_id: string
  identifier_code: string
  user_liked: boolean
  backdrop_path: string
  title: string
  original_title: string
  poster_path: string
  release_date: string
  overview: string
  created_at: Date
}

export class MovieId extends Uuid {}

export class Movie extends Entity {
  movie_id: MovieId
  identifier_code: string
  user_liked: boolean
  backdrop_path: string
  title: string
  original_title: string
  poster_path: string
  release_date: string
  overview: string
  created_at: Date

  constructor(props: MovieConstructorProps, movie_id?: MovieId) {
    super()
    this.movie_id = movie_id || new MovieId()
    this.user_liked = props.user_liked ?? false
    this.backdrop_path = props.backdrop_path
    this.title = props.title
    this.original_title = props.original_title
    this.poster_path = props.poster_path
    this.release_date = props.release_date
    this.overview = props.overview
    this.created_at = props.created_at ?? new Date()
    this.identifier_code = props.identifier_code
  }

  static create(props: MovieConstructorProps, movie_id?: MovieId) {
    const user = new Movie(props, movie_id)
    user.validate(["backdrop_path", "poster_path", "release_date"])
    return user
  }

  get entityId() {
    return this.movie_id
  }

  like() {
    this.user_liked = true
  }

  unlike() {
    this.user_liked = false
  }

  validate(fields?: string[]) {
    const validator = MovieValidatorFactory.create()
    return validator.validate(this.notification, this, fields)
  }

  toJson(): MovieToJsonProps {
    return {
      movie_id: this.movie_id.id,
      identifier_code: this.identifier_code,
      title: this.title,
      backdrop_path: this.backdrop_path,
      created_at: this.created_at,
      original_title: this.original_title,
      overview: this.overview,
      poster_path: this.poster_path,
      release_date: this.release_date,
      user_liked: this.user_liked
    }
  }
}
