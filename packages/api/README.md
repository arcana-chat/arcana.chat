# 🌌 Arcana API 🌠

**Dive into the mystic realms with the Arcana API, a powerful tarot reading chat AI.** Built on the prowess of OpenAI, this API lets you harness the wisdom of the Tarot, right from the digital space.🔮✨

## 🚀 Features

- 🗣️ **OpenAI Based Tarot Reading**: Deliver profound tarot readings to your users, powered by OpenAI.
- ☁️ **Cloudflare Workers**: Swift and secure deployment for a seamless user experience.
- 📡 **tRPC API**: Fast and type-safe API endpoints.
- 🗄️ **Cloudflare D1 & Drizzle ORM**: Efficient, affordable database management and operations.
- 🔒 **Supabase**: Robust user authentication system.
- 🛡️ **Typescript & Valibot**: Type-safe code and efficient validation for better development.

## 💡 What's an ORM and Why Use It?

**ORM**, which stands for **Object-Relational Mapping**, is a programming technique that abstracts the way we interact with databases. Instead of writing raw SQL queries, developers interact with their database like they would with OOP objects. This means:

1. **Less Code**: You can perform database operations without writing verbose SQL queries.
2. **Maintainability**: ORM provides a consistent pattern, making the codebase easier to understand and refactor.
3. **Database Agnostic**: With ORM, switching to another database often requires minimal code changes.

With Drizzle ORM, we simplify the process of making SQLite queries. It offers a structured way to define and manipulate our data, ensuring code clarity and easier maintenance. So, instead of grappling with raw SQL strings, we engage with well-structured, object-oriented paradigms.🍃

## 🛠️ Commands and Their Magic ✨

- `dev`: Start all development processes including the [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview). 🧑‍💻
- `dev:wrangler`: Start the wrangler development environment. 🌀
- `dev:studio`: Start the Drizzle ORM studio. 🎬
- `generate`: Generate SQLite migrations from your schema. 📜
- `migrate`: Apply production migrations via wrangler. 🔧
- `migrate:local`: Apply local production migrations via wrangler. 🏠
- `seed`: Seed your production database. 🌱
- `seed:local`: Seed your local production database. 🌱🏠
- `deploy`: Deploy your application, optimizing with minify. 🚀
- `postinstall`: Automatically generate after installations. 🔧
- `with-env`: Load the environment from a local `.env` file. 🌍
- `clean`: Clean out redundant directories and modules. 🧹

## 📦 Tech Stack

- **API Building**: [tRPC](https://trpc.io/)
- **Database Communication**: [Drizzle ORM](https://github.com/drizzle-orm/drizzle)
- **User Authentication**: [Supabase](https://supabase.io/)
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/)
- **Package Management**: [PNPM](https://pnpm.io/)
- **Type Validation**: [Valibot](https://github.com/valibot/valibot) (A zod alternative)
- **Programming Language**: [Typescript](https://www.typescriptlang.org/)

## 🛡️ Setup & Installation

1. Clone this repository.
2. Ensure you have `pnpm` installed. If not, get it [here](https://pnpm.io/installation).
3. Install the project dependencies:

```bash
pnpm install
```

4. Start the development environment:

```bash
pnpm dev
```

For more detailed instructions, refer to the commands section above.

## 🤝 Contributing

We welcome contributions! Please see CONTRIBUTING.md for more details.

## 📜 License

This project is licensed under the MIT License. See LICENSE.md for more details.

**Made with 💖 by the Arcana Team. Dive deeper, and may the cards guide your path. 🌌🔮🌠**
