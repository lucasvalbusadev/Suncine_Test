<p align="center">
  <img src="./docs/img/SunCine.png" width="500" alt="SunCine Logo" />
</p>
</br>

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-%23339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Vitest-%236E9F18?style=for-the-badge&logo=vitest&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Fastify-%23FFFFFF?style=for-the-badge&logo=fastify&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/TMDB-%23006DBF?style=for-the-badge&logo=themoviedatabase&logoColor=white&labelColor=black" />
  <img src="https://img.shields.io/badge/Docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white&labelColor=black" />
</div>

---

[🔙 Volta para documentação principal](./README.md)

# 🎯 Desafio (Backend Senior)
O desafio consiste desenvolver os ponto descritos abaixo utilizando [TypeScript](https://www.typescriptlang.org/), [Fastify](https://fastify.dev/), [MongoDB + Mongoose](https://mongoosejs.com/) and  [Vitest](https://vitest.dev/).

> O arquivo [README.md](./README.md) já contém comandos importantes, como rodar a aplicação, executar as seeds, entre outros. O comportamento desses comandos deve ser mantido, sem modificar os `scripts` definidos no `package.json`.

#### 🎬 TMDB
A maior parte das informações que serão expostas pela API deve ser obtida por meio da [TMDB API](https://developer.themoviedb.org/docs/getting-started). Portanto, será necessário realizar a integração com essa API.

#### 🏗️ "Arquitetura" do Projeto
No arquivo [DOCUMENTATION.md](./DOCUMENTATION.md), você deve descrever como organizaria as **camadas** do projeto, detalhando suas responsabilidades. Caso utilize algum **Design Pattern**, justifique sua escolha.

> **Nota:** Como algumas funcionalidades serão implementadas, elas poderão servir como exemplos para as camadas descritas. Caso alguma camada não seja utilizada, explique os motivos e forneça exemplos para outras camadas.

#### 🗃️ Database 
Você pode optar por utilizar qualquer **banco de dados**, seja ele **SQL** ou **NoSQL**, desde que configure o `docker-compose.yml` de forma adequada. O comportamento descrito no arquivo [README.md](./README.md) deve ser mantido.

#### 👾 API 
Implementar **algumas** `funcionalidades` que estão documentadas em `projects/back/openapi.yaml`

1. **POST** - `/login` 
1. **GET** - `/movie/most-trended` 
1. **PUT** - `/movie/like/:tmdb_id` 

#### 🧪 Testes Automatizados
Desenvolva testes automatizados para as funções que considerar necessárias, utilizando a biblioteca [Vitest](https://vitest.dev/), que já está instalada no projeto.

## ✅ Avaliação 
O objetivo do desafio é avaliar suas habilidades como desenvolvedor Backend, incluindo:

- Desenvolvimento de funcionalidades completas.
- Implementação de testes automatizados.
- Tomada de decisões em relação ao design do projeto.

### 👀 Pontos que Serão Avaliados

#### **1. Funcionalidades Implementadas**
- A aplicação cumpre os requisitos funcionais descritos no desafio.

#### **2. Qualidade do Código**
- Organização e estrutura dos arquivos e componentes.
- Legibilidade e clareza do código.
- Adoção de boas práticas de programação.

#### **3. Uso de Tecnologias**
- Utilização correta das ferramentas e bibliotecas obrigatórias, como **TypeScript**, **Fastify**, **Vitests**, e outras mencionadas no desafio.

#### **4. Testes**
- Presença de testes unitários ou de integração utilizando **Vitest**, bem como a qualidade dos mesmos.

#### **5. UX da API**
- Tratamento de erros e respostas da API.

#### **6. Documentação**
- DOCUMENTACAO.md bem estruturado, explicando claramente como configurar e rodar o projeto.
- Detalhes adicionais sobre decisões técnicas, se necessário.

#### **7. Comunicação com a TMDB API**
- Requisições HTTP realizadas corretamente.
- Tratamento de erros e respostas da API.

#### **8. Outras Observações**
- Capacidade de explicar e justificar as escolhas feitas durante o desenvolvimento.
- Organização geral do projeto, incluindo como as dependências são gerenciadas e configuradas.
- Criatividade e soluções além do esperado, sem fugir dos requisitos principais.
- Habilidades de depuração e resolução de problemas caso seja necessário durante a apresentação.
- Qualquer outro ponto relevante para o desafio.

## 🏗️ Estrutura do Projeto
Este projeto utiliza a arquitetura **monorepo** com o gerenciador de pacotes `pnpm`. O seu código deve ser desenvolvido dentro do subprojeto: `projects/back/`

---

[🔙 Volta para documentação principal](./README.md)
