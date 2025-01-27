import { sign } from "jsonwebtoken"
import { env } from "../../../../env"
import type { Encrypter } from "../../application/cryptography/encrypter"

export class JwtEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    // biome-ignore lint/style/useNamingConvention: jwt need options need to be camelCase
    const token = sign(payload, env.JWT_SECRET, { expiresIn: "1h" })
    return await Promise.resolve(token)
  }
}
