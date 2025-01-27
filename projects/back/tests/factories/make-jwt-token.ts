import { JwtEncrypter } from "../../src/core/user/infra/cryptography/jwt-encrypter"

// biome-ignore lint/suspicious/noExplicitAny: any valeu can be pass as payload
export async function makeJwtToken(payload?: any) {
  const jwt = new JwtEncrypter()
  const access_token = await jwt.encrypt({
    sub: {
      ...payload
    }
  })

  return access_token
}
