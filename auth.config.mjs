//import GitHub from '@auth/core/providers/github';
import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account", // Esto asegura que siempre se pregunte por la cuenta
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const res = await fetch(
          `http://localhost:3001/api/user/${user.email}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!data.error && typeof data.body !== "object") {
          const dataUser = {
            name: user.name,
            email: user.email,
          };
          const res = await fetch(`http://localhost:3001/api/user/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataUser),
          });
          const resp = await res.json();
        }
        return true;
        //const links = data["body"];
      } catch (error) {}
    },
  },
});
