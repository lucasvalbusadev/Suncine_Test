import type { UseCaseInterface } from "../../../../shared/application/use-case.interface"
import {
  DATABASE_DICTIONARY_ERRORS,
  DefaultDatabaseErrorCode
} from "../../../../shared/errors/dictionaries/dictionary-database-error"
import { generateErrorMessage } from "../../../../shared/errors/handlers/generate-error"
import { type User, UserId } from "../../../domain/user.entity"
import type { UserRepositoryInterface } from "../../../domain/user.repository"

export type GetUserByIdUseCaseInput = {
  user_id: string
}

export type GetUserByIdUseCaseOutput = {
  user: User
}

export class GetUserByIdUseCase
  implements UseCaseInterface<GetUserByIdUseCaseInput, GetUserByIdUseCaseOutput>
{
  constructor(private readonly user_repo: UserRepositoryInterface) {}

  async execute({ user_id }: GetUserByIdUseCaseInput): Promise<GetUserByIdUseCaseOutput> {
    const id = new UserId(user_id)
    const user = await this.user_repo.findById(id)

    if (!user) {
      return generateErrorMessage(
        DefaultDatabaseErrorCode.DB_NOT_FOUND_SCHEMA,
        DATABASE_DICTIONARY_ERRORS,
        {},
        "get-user-by-id.use-case"
      )
    }

    return {
      user: user
    }
  }
}
