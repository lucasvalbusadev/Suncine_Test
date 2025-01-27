import type { UseCaseInterface } from "../../../../shared/application/use-case.interface"
import { generateErrorMessage } from "../../../../shared/errors/handlers/generate-error"
import type { User } from "../../../domain/user.entity"
import type { UserRepositoryInterface } from "../../../domain/user.repository"
import type { Encrypter } from "../../cryptography/encrypter"
import type { HashComparer } from "../../cryptography/hash-comparer"
import { USER_DICTIONARY_ERROS, UserErrorCode } from "../../errors/user-errors"

export type AuthenticateUserInput = {
  login: string
  password: string
}

export type AuthenticateUserOutput = {
  access_token: string
  user: User
}

export class AuthenticateUserUseCase
  implements UseCaseInterface<AuthenticateUserInput, AuthenticateUserOutput>
{
  constructor(
    private readonly user_repo: UserRepositoryInterface,
    private hash_comparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async execute({ login, password }: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const user = await this.user_repo.findByLogin(login)

    if (!user) {
      return generateErrorMessage(
        UserErrorCode.INVALID_CREDENTIALS_ERROR,
        USER_DICTIONARY_ERROS,
        {},
        "authenticate-user.use-case"
      )
    }

    const is_password_valid = await this.hash_comparer.compare(password, user.password)

    if (!is_password_valid) {
      return generateErrorMessage(
        UserErrorCode.INVALID_CREDENTIALS_ERROR,
        USER_DICTIONARY_ERROS,
        {},
        "authenticate-user.use-case"
      )
    }

    const access_token = await this.encrypter.encrypt({
      sub: {
        user_id: user.user_id.id
      }
    })

    return {
      access_token,
      user: user
    }
  }
}
