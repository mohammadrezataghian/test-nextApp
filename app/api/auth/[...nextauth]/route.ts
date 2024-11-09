import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import axios from "axios"

const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          const { username, password } = credentials || {};
            
          try {
            const response = await axios.get('https://66f7f9772a683ce9730e4bd7.mockapi.io/userauth')
  
            // Check if there is a user that matches the username and password
            const user = response.data.find(
              (user: { username: string, password: string }) =>
                user.username === username && user.password === password
            )
  
            if (user) {
              // If a matching user is found, return the user object
              return { id: user.username, name: user.username, username: user.username }
            } else {
              // If no user is found or credentials are incorrect, return null
              return null
            }
          } catch (error) {
            console.error("Error during authentication", error)
            return null
          }
        },
      }),
    ],
    pages: {
      signIn: '/login',
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.username = user.username;
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
          session.user.username = token.username;
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
  
  const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }