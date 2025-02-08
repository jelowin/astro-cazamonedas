import { getSession } from "auth-astro/server";
import { turso } from "../turso.js";
import { randomUUID } from "crypto";

export async function onRequest(context, next) {
  const session = await getSession(context.request);
  const cookies = context.cookies;

	if (cookies.get('caz_user_uuid') || !session) {
		return next();
	}

  if (session?.user?.email) {
		const {user} = session
    const {rows: dbUser} = await turso.execute({
        sql: "SELECT * FROM users WHERE email = ?",
        args: [user?.email],
    });

    if (!dbUser.length) {
        const uuid = randomUUID();
        await turso.execute(
            "INSERT INTO users (id, email) VALUES (?, ?) ON CONFLICT (email) DO NOTHING",
            [uuid, user?.email]
        );
    }

		const [{id}] = dbUser
		cookies.set("caz_user_uuid", id, {
			httpOnly: true,
			secure: true,
			sameSite: "Strict",
			maxAge: 60 * 60 * 24 * 7 // Expira en 7 días
		});

  }

  return next();
}