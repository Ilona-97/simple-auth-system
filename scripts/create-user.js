import { db } from '../app/lib/db.js';
import bcrypt from 'bcrypt';

const name = 'John';
const email = 'john@test.com';
const password = 'password0934';

async function createUser() {
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );

  console.log(`User ${email} added successfully`);
  await db.end();
}

createUser().catch(console.error);
