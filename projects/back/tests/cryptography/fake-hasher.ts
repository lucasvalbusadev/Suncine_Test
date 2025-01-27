import type { HashComparer } from "../../src/core/user/application/cryptography/hash-comparer"
import type { HashGenerator } from "../../src/core/user/application/cryptography/hash-generator"

export class FakeHasher implements HashGenerator, HashComparer {
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async hash(plain: string): Promise<string> {
    return plain.concat("-hashed")
  }

  // biome-ignore lint/suspicious/useAwait: <explanation>
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat("-hashed") === hash
  }
}
