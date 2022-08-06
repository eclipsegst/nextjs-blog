# Prisma

- [Prisma setup]((https://next-auth.js.org/adapters/prisma#setup))
- [Models / Table](https://next-auth.js.org/adapters/models)
- [Github: schema.prisma](https://github.com/nextauthjs/next-auth/blob/main/apps/dev/prisma/schema.prisma)

Step 1. create a schema file in `prisma/schema.prisma` by following up the setup link and a .env file `prisma/.env`.

[.env file locations](https://www.prisma.io/docs/guides/development-environment/environment-variables#using-env-files):
- In the root folder of your project (`./.env`)
- From the ./prisma folder(`./prisma/.env`)

For `prisma/.env`, we need to add [`DATABASE_URL`](https://www.prisma.io/docs/guides/development-environment/environment-variables#example-set-the-database_url-environment-variable-in-an-env-file) like,

```
DATABASE_URL=postgresql://db_username:db_password@localhost:5432/db_name?schema=public
```

Step 2. Create the database schema with Prisma Migrate
```
npx prisma migrate dev
```

Step 3. Generate Client
```
npx prisma generate
```

To configure your database to use the new schema,
```
npx prisma migrate dev
```
