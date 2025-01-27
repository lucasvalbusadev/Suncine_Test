import {
  DEFAULT_DICTIONARY_ERROS,
  DefaultErrorsCode
} from "../../../../shared/errors/dictionaries/dictionary-default-errors"
import { generateErrorMessage } from "../../../../shared/errors/handlers/generate-error"
import { User, UserId } from "../../../domain/user.entity"
import { UserModel } from "./user.model"

// biome-ignore lint/complexity/noStaticOnlyClass: this class only needs static methods
export class UserModelMapper {
  static toModel(entity: User): UserModel {
    return UserModel.build({
      user_id: entity.user_id.id,
      name: entity.name,
      login: entity.login,
      password: entity.password,
      created_at: entity.created_at
    })
  }

  static toEntity(model: UserModel): User {
    const user = User.create(
      {
        name: model.name,
        login: model.login,
        password: model.password,
        created_at: model.created_at
      },
      new UserId(model.user_id)
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
