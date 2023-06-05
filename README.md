# Tatum with Wallet connect

## Stacks

- NextJS
- Prisma
- Supabase
- Tatum
- Wallet Connect

## Getting started

### copy .env.example to .env

just copy the .env.example to .env, or use this command

`cp .env.example .env`

### Declare your keys

please declare these values below with your own

- DATABASE_URL -> postgres shadow database url (i'm using supabase for this)
- TATUM_API_KEY -> your tatum API KEY, you can get from your tatum dashboard
- NEXT_PUBLIC_PROJECT_ID -> your wc projectId key, you can get from wc cloud dashboard

### Installation

run

```shell
yarn install
```

### Start dev server

run

```shell
yarn dev
```

and it should be run on 3001 port

### Migration

```shell
yarn db:migrate:dev
```

## References
