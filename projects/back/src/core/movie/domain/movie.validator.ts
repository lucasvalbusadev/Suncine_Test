import { IsDateString, IsUrl } from "class-validator"
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator"
import type { Notification } from "../../shared/domain/validators/notification"
import type { Movie } from "./movie.entity"

class MovieRules {
  @IsUrl({}, { groups: ["backdrop_path"] })
  backdrop_path: string

  @IsUrl({}, { groups: ["poster_path"] })
  poster_path: string

  @IsDateString({}, { groups: ["release_date"] })
  release_date: string

  constructor(entity: Movie) {
    Object.assign(this, entity)
  }
}

class MovieValidator extends ClassValidatorFields {
  validate(notification: Notification, data: Movie, fields?: string[]): boolean {
    const new_fields = fields?.length ? fields : ["backdrop_path", "poster_path", "release_date"]
    return super.validate(notification, new MovieRules(data), new_fields)
  }
}

// biome-ignore lint/complexity/noStaticOnlyClass: use static function to better declaration
export class MovieValidatorFactory {
  static create() {
    return new MovieValidator()
  }
}
