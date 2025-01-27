import type { Encrypter } from "../../src/core/user/application/cryptography/encrypter"

export class FakeEncrypter implements Encrypter {
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
