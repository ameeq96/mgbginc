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

Use Laravel-style database environment values:

```env
DB_CONNECTION="mysql"
DB_HOST="localhost"
DB_PORT="3306"
DB_DATABASE="DATABASE_NAME"
DB_USERNAME="DATABASE_USER"
DB_PASSWORD="DATABASE_PASSWORD"
```

The app builds Prisma's internal `DATABASE_URL` from these values. Password
special characters such as `@`, `#`, `:`, `/`, or spaces are OK in `DB_PASSWORD`.

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
NEXT_PUBLIC_SITE_URL="https://mgbginc.ca"
DB_CONNECTION="mysql"
DB_HOST="localhost"
DB_PORT="3306"
DB_DATABASE="mgbginc"
DB_USERNAME="mgbg_user"
DB_PASSWORD="strong_password"
JWT_SECRET="use-a-long-random-secret"
ADMIN_EMAIL="admin@mgbginc.ca"
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

If Prisma prints `Environment variable not found: DATABASE_URL`, the command
does not have access to your production database environment variables. Confirm
that the `DB_*` values are set in **Plesk > Node.js > Environment variables**. If
you are running commands from SSH/Terminal and Plesk does not inject those
variables into the shell session, create a server-only `.env` file in the
application root with the same values, or export the variables before running
Prisma:

```bash
export DB_CONNECTION='mysql'
export DB_HOST='localhost'
export DB_PORT='3306'
export DB_DATABASE='DATABASE_NAME'
export DB_USERNAME='DATABASE_USER'
export DB_PASSWORD='DATABASE_PASSWORD'
npm run db:deploy
```

Do not place the `.env` file inside the public document root.

## 6. Plesk Buttons

If you prefer Plesk buttons:

1. Click **NPM install**.
2. Run script: `db:deploy` for first database setup.
3. Run script: `build`.
4. Click **Restart App**.

For later content edits, use the admin dashboard. Do not run seed again unless you intentionally want demo records checked/created.

## 7. Live Checks

After restart, check:

- Website: `https://mgbginc.ca`
- Admin login: `https://mgbginc.ca/admin/login`
- Health check: `https://mgbginc.ca/api/health`
- Sitemap: `https://mgbginc.ca/sitemap.xml`
- Robots: `https://mgbginc.ca/robots.txt`

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
