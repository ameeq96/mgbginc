# Plesk Deployment Guide

This project is ready to run as a Plesk Node.js application with MySQL/phpMyAdmin.

## 1. Plesk Requirements

- Node.js 20.9+ or Node.js 22
- MySQL database with phpMyAdmin access
- SSH/Terminal access is recommended for first setup

## 2. Upload Files

Upload the project files to your domain application folder. Do not upload:

- `node_modules`
- `.next`
- `.env`
- local database files such as `*.db`

Keep these files/folders included:

- `package.json`
- `package-lock.json`
- `server.js`
- `.npmrc`
- `prisma/`
- `src/`
- `public/`
- `next.config.mjs`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `tsconfig.json`

## 3. Create MySQL Database

In Plesk:

1. Open **Databases**.
2. Create a database, for example `mgbginc`.
3. Create a database user with full access to that database.
4. Open phpMyAdmin only to inspect data. Prisma will create tables.

Use this URL format:

```env
DATABASE_URL="mysql://DATABASE_USER:DATABASE_PASSWORD@localhost:3306/DATABASE_NAME"
```

If the password contains special characters such as `@`, `#`, `:`, `/`, or spaces, URL-encode it.

## 4. Configure Plesk Node.js

In **Plesk > Node.js**:

- Node.js version: `20.9+` or `22`
- Application mode: `production`
- Application root: your uploaded project folder
- Document root: your domain public folder as Plesk requires
- Application startup file: `server.js`
- Custom environment variables: copy values from `.env.plesk.example`

Important production values:

```env
NODE_ENV="production"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
DATABASE_URL="mysql://mgbg_user:strong_password@localhost:3306/mgbginc"
JWT_SECRET="use-a-long-random-secret"
ADMIN_EMAIL="admin@your-domain.com"
ADMIN_PASSWORD="change-before-first-seed"
RESET_ADMIN_PASSWORD="false"
```

## 5. First Deployment Commands

Run these in the Plesk terminal inside the app folder:

```bash
npm install
npm run db:deploy
npm run build
```

Then restart the Node.js application from Plesk.

## 6. Plesk Buttons

If you prefer Plesk buttons:

1. Click **NPM install**.
2. Run script: `db:deploy` for first database setup.
3. Run script: `build`.
4. Click **Restart App**.

For later content edits, use the admin dashboard. Do not run seed again unless you intentionally want demo records checked/created.

## 7. Live Checks

After restart, check:

- Website: `https://your-domain.com`
- Admin login: `https://your-domain.com/admin/login`
- Health check: `https://your-domain.com/api/health`
- Sitemap: `https://your-domain.com/sitemap.xml`
- Robots: `https://your-domain.com/robots.txt`

Seeded admin is controlled by `ADMIN_EMAIL` and `ADMIN_PASSWORD` during first seed.

## 8. Media Uploads

Admin uploads are stored in:

```text
public/uploads
```

Make sure this folder is writable by the Plesk application user. Before replacing the app folder during future deployments, back up `public/uploads` if you have uploaded live media.

## 9. Updating Later

For normal code updates:

```bash
npm install
npm run build
```

If the database schema changed:

```bash
npm run db:push
npm run build
```

Only set `RESET_ADMIN_PASSWORD="true"` and rerun `npm run db:seed` when you intentionally want to reset the seeded admin password.
