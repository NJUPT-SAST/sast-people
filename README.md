# SAST Pass(People)

[![License](https://img.shields.io/badge/license-AGPLv3-blue.svg)](https://choosealicense.com/licenses/agpl-3.0/)

SAST Pass(People) is an all in one platform for all post or pre SASTer to manage their profile.

> [!WARNING]
> This repo is under active development! Formats, schemas, and APIs are subject to rapid and backward incompatible changes!

## Get Started

### Pre-requisites

- Node.js >= 20
- pnpm >= 8

### Clone and Run

To get started, clone the repository and install dependencies with:

```bash
pnpm intsall
```

prepare postgresql database and drizzle with the following command:

```bash
docker run --name postgres-server --restart=always -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

copy `.env.example` to `.env` and fill in the required environment variables.

> [!NOTE]
> 
> DATABASE_URL example: postgres://user:password@127.0.0.1:5432/sast_people
>
> it's convenient to use openssl to generate a secrets
> ```bash
> openssl rand -base64 32  
> ```

after database is ready, run the following command to create the database and tables:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit push
```

if you want to view tables

```bash
npx drizzle-kit studio
```

To start a dev server, run:

```bash
pnpm dev
```

To compile for production deployment, run:

```bash
pnpm build
```

The output will be in the `.next` directory, you can run it with:

```bash
pnpm start
```

## Development

## Roadmap

Goals and Vision for SAST People

[SAST People PRD](https://njupt-sast.feishu.cn/wiki/BVcSwcRu2ixn84k5yjFcnaYInkg?from=from_copylink)

## Contributing

Pull requests and any feedback are welcome. For major changes, please open an issue first to discuss what you would like to change.

> [!warning]
> Prior to submitting a pull request, please ensure that your code is properly formatted, linted and builds successfully.

## License

[AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)
