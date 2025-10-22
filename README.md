# Simple Auth System

This is a [Next.js](https://nextjs.org) project of simple authorization system made using NextAuth.

## How to set up project locally:
0. Requirements: Node.js, MySQL, npm
1. Clone repository.
2. Open the '.env.example' file, rename it to '.env' and replace `USER` and `PASSWORD` in your `.env` file with your actual MySQL credentials. You also need to remember to generate secret and put it in the right place there.
3. Start MySQL (XAMPP). Create new database 'nextauth_db'
4. Create table 'users' - you can use '/scripts/schema.sql'
5. Install all required Node.js packages:
```bash
npm install
```
6. Insert test user to the table:
```bash
node scripts/create-user.js
```
7. Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation
- NextAuth for authentication because it integrates well with Next.js and provides built-in session management
- Passwords are hashed with bcrypt
- Environment variables are used to avoid committing sensitive data
- SQL schema is provided in `scripts/schema.sql` to allow easy database setup
- Responsive design is made using flexbox and media queries (I would use Tailwind but I wasn't sure if that was the point because in the task description only CSS was mentioned)
