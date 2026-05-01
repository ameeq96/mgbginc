# Vercel Deployment Guide

This app can run on Vercel, but the admin dashboard needs an external MySQL database. Vercel cannot use `localhost` MySQL or the temporary local database used for development.

## 1. Create A MySQL Database

Use any MySQL provider that Vercel can reach, for example:

- PlanetScale
- Aiven
- Railway
- Plesk/MySQL with remote access enabled

Copy the provider connection string in this format:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"
```

If the password contains `@`, `#`, `:`, `/`, or spaces, URL-encode it.

## 2. Add Vercel Environment Variables

In **Vercel > Project > Settings > Environment Variables**, add these for Production:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"
JWT_SECRET="use-a-long-random-secret"
ADMIN_EMAIL="admin@your-domain.com"
ADMIN_PASSWORD="change-this-password"
NEXT_PUBLIC_SITE_URL="https://your-vercel-domain.vercel.app"
```

Use the same values for Preview if you want preview deployments to access the same admin database.

## 3. Create Database Tables

After setting `DATABASE_URL`, run this once from your local terminal with the Vercel database URL in `.env`:

```bash
npx prisma db push
```

Optional demo content seed:

```bash
npm run db:seed
```

The admin user is also created automatically on first successful login when `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set, so seed is not required only for login.

## 4. Deploy

In Vercel:

- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`

After deploy, open:

```text
https://your-vercel-domain.vercel.app/admin/login
```

Log in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## Notes

- `/api/health` should show `database: "connected"`.
- Media uploads currently write to `public/uploads`, which is not persistent on Vercel serverless deployments. Use Plesk for persistent local uploads, or add object storage for Vercel media uploads.
