import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { UserModel } from "./data/user";
import { LoginSchema } from "./schemas";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";

type UserResponse = {
    name: string;
    username: string;
    email: string;
    role: string;
    is_verified: boolean;
    token: string;
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({

    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            if(session.user){
                session.user.token = token.token;
            }
            return session;
        },
        async jwt({ token, user, account, session }) {
            
            if (account) {
                console.log("account access_token ||||||| ", account.access_token);

                const newUser = await fetch(`${process.env.BASE_API_URL}/api/accounts/v2/google/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "App-Package-Name": "com.one.pte_exam_practice",
                    },
                    body: JSON.stringify({
                        access_token: account.access_token
                    })
                })
                    .then((res) => {
                        console.log("res", res);
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error('Login failed');
                        }
                    })
                    .then((data) => {
                        return data as { token: string, user: any };
                    })
                    .catch((err) => {
                        return null;
                    });
                
                if (newUser) {
                    token.token = newUser.token;
                }
            } else if (user) {
                const usermodel = user as UserResponse;
                token.token = usermodel.token;
            }
            return token;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (!validatedFields.success) {
                    console.error(validatedFields.error.errors);
                    return null;
                }

                const { email, password } = validatedFields.data;

                const user = await fetch(`${process.env.BASE_API_URL}/api/accounts/v2/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error('Login failed');
                        }
                    })
                    .then((data) => {
                        return UserModel(data);
                    })
                    .catch((err) => {
                        return null;
                    });


                return user;
            },
        }),
        Google,
        Apple,

    ],
    session: {
        strategy: "jwt",
    }
});