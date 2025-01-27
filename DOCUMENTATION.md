<p align="center">
  <img src="./docs/img/SunCine.png" width="500" alt="SunCine Logo" />
</p>
</br>

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-%23339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Vite-%23646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Vitest-%236E9F18?style=for-the-badge&logo=vitest&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Fastify-%23FFFFFF?style=for-the-badge&logo=fastify&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/TMDB-%23006DBF?style=for-the-badge&logo=themoviedatabase&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white&labelColor=black" />
</div>

---

[🔙 Volta para documentação principal](./README.md)

# 📄 Documentação do Candidato

> Essa aplicação foi pensando para seguir os conceitos de DDD(Domain Driven Design) e Arquitetura Limpa. Optei por desenvolver a aplicação com SQL (Postgres) juntamente com o ORM(Sequelize). A aplicação contém exemplos de teste unitários, integração e E2E. Os exemplos estarão nas pastas \_\_tests\_\_

```plaintext
src/
├── core/                           # Aqui fica o core da aplicação isolado da interface (api)
│   ├── shared/                     # Recursos compartilhados
│   ├── bounded context/            # Aqui fica o bounded context da aplicação (Movie, User, Shared)
│       ├──  domain/                # Camada de domínio
│           ├── entity.ts/          # Entidades do domino
│           ├── repository.ts/      # Contrato de repository na camada de domino
│           └── validator.ts/       # Class que ira validar alguns parâmetros da entidade
│       ├── application/            # Camada de aplicação
│           ├── use-cases/          # Casos de uso
│           ├── http/               # Interfaces adaptadoras de consultas https para buscar a api de movie
│           ├── cryptography/       # Interfaces adaptadoras de criptografia
│           └── erros/              # Erros específicos da camada de aplicação
│       ├── infrastructure/         # Camada de infraestrutura
│           ├── db/                 # Configurações do banco de dados
│               ├── in-memory/      # Implementação do repositório em memoria
│               └── sequelize/      # Implementação do repositório sequelize
│           ├── http/               # Implementação da movie api (Api externa para buscar filmes)
│           └── cryptography/       # Implementação das libs para criptografia
├── fastify-presenter/              # Camada de apresentação
│   ├── database/                   # Configurações do sequelize
│   ├── plugins/                    # Plugins específicos do fastify
│   ├── http/                       # Camada para a chamadas http
│       ├── controllers/            # Controladores
│       └── presenter/              # Output de dados formatos corretamente
├── @types/                         # Types auxiliares do typescript
└── env/                            # Validação das variáveis de ambiente

tests/
├── factories/                      # Factories auxiliaries para testes
├── mocks/                          # Mocks auxiliaries para testes
└── cryptography/                   # Mocks de criptografia para auxiliar com testes

```

## 📄 Como executar o sistema

```bash
  # 1 - Execute o comando para subir o banco de dados SQL
  docker compose up -d
```

```bash
  # 2 - Execute o comando para rodar as migrations no banco
  pnpm run migrate:ts up

  # feche o terminal após o comando terminar de rodar
```

```bash
  # 3 - Execute o comando para rodar os seeds no banco
  pnpm run seeds:ts up

  # feche o terminal após o comando terminar de rodar
```

```bash
  # 4 - Execute o comando para rodar os teste unitários e integração
  pnpm run tests
```

```bash
  # 5- Execute o comando para rodar os teste E2E
  pnpm run tests:e2e
```

```bash
  # 6 - Execute o comando para rodar os coverages dos tests unitários e integração
  pnpm run tests:cov
```

```bash
  # 7 - Execute o comando para rodar os coverages dos tests E2E
  pnpm run tests:e2e:cov
```

## 📄 Melhorias na api

Foi feito uma melhoria na rota __/movie/like (PUT)__
Antes a rota recebia um id do filme no params da requisição
Agora ela se tornou uma rota __PATCH__ e recebe os dados do no body no seguinte formato:

```json
  {
    "movie_id": 939243,
    "like_or_unlike": true
  }
```

Essa alteração foi feita, pois a api do TMDB não possui uma rota para buscar um filme favoritado por id do filme, dessa forma para verificar se o filme foi ou não favoritado seria necessário percorrer todos o filmes favoritados fazendo várias consultas na API. Com a alteração só precisa ser feita uma consulta previa.

## 📄 Nova api

Vou deixar um link da collection do postman com as rotas da api para facilitar os teste.
[Link do arquivo postman](https://drive.google.com/file/d/15n2a5Qqlsfqx0yy_vIdT60urOIAZ8rDI/view?usp=sharing)

Faça o download do arquivo, importe no seu postman.

Esses vão ser o email e senha padrão

*** Atenção: Garanta que o seeds tenham rodado, para ter ao menos um usuário no banco ***

```json
{
    "login": "suncine@mail.com",
    "password": "123456"
}
```

---

[🔙 Volta para documentação principal](./README.md)
