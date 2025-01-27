import axios, { type AxiosInstance } from "axios"

export class AxiosApiClient {
  private client: AxiosInstance

  // biome-ignore lint/style/useNamingConvention: use camelCase
  constructor(baseURL: string, apiKey: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    })
  }

  getClient(): AxiosInstance {
    return this.client
  }
}
