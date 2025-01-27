export type AuthenticateInputDto = {
  email: string
  password: string
}

export type AuthenticateOutputDto = {
  access_token: string
}
