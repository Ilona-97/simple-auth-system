import { auth } from "./api/auth/[...nextauth]/route";
import LogoutButton from "./components/LogoutButton";
import LoginForm from "./login/page"; 

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return <LoginForm />;
  }

  return (
    <main>
      <h1>Hello, {session.user?.email}!</h1>
      <LogoutButton />
    </main>
  );
}
