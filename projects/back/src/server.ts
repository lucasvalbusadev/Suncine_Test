import { app } from "./app"
import { env } from "./env"

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT
  })
  .then(() => {
    // biome-ignore lint/suspicious/noConsoleLog: information for view its server is running
    console.log("🚀 HTTP Server Running!")
  })
