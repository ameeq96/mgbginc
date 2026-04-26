# MGBG Inc. Corporate Website

Modern dynamic website and admin dashboard for **MGBG Inc. / Meta Genie Business Group**.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- Prisma ORM
- MySQL database, manageable through phpMyAdmin
- Custom HTTP-only JWT admin auth
- Local media uploads in `public/uploads`
- SMTP-ready email notification helper

## MySQL / phpMyAdmin Setup

1. Open phpMyAdmin.
2. Create a database named `mgbginc`.
3. Open `.env` and set your MySQL connection:

```env
DATABASE_URL="mysql://root:your_mysql_password@localhost:3306/mgbginc"
```

Common local examples:

```env
DATABASE_URL="mysql://root:@localhost:3306/mgbginc"
DATABASE_URL="mysql://mgbg_user:mgbg_password@localhost:3306/mgbginc"
```

Then run:

```bash
npx prisma db push
npm run db:seed
```

## Local Setup

After setting `DATABASE_URL`, run:

```bash
npm install
npx prisma db push
npm run db:seed
npm run build
npm run start
```

Local site:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

Seeded admin:

- Email: `admin@mgbginc.com`
- Password: `Admin@12345`

Change `JWT_SECRET`, `ADMIN_PASSWORD`, and SMTP values before production deployment.

## Admin Capabilities

- Website settings, logo, contact details, socials, footer, and SEO defaults
- Home page hero, CTA links, dynamic section headings, and visibility toggles
- CRUD for services, projects, partnerships/R&D, experts, blog/news, testimonials, useful links, and dynamic pages
- Consultation request management with status workflow
- Contact inquiry management with search, filtering, deletion, and replied state
- Media library uploads and reusable media selection
- Rich text editing for pages, posts, service descriptions, expert bios, and project/partnership content

## Deployment Notes

The app is configured for MySQL via Prisma. You can create and inspect the database in phpMyAdmin, while Prisma manages the table structure through `npx prisma db push`.

Email notifications are sent only when SMTP variables are configured. Without SMTP, the app stores submissions and logs that email was skipped.

The production build uses `next build --webpack` for compatibility with restricted build environments.

For Plesk deployment, use [DEPLOY-PLESK.md](./DEPLOY-PLESK.md). The app includes a root `server.js` startup file, production environment example, MySQL setup commands, and a `/api/health` endpoint for live checks.
