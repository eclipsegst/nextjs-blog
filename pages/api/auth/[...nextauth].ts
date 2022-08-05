/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient, Prisma, User } from "@prisma/client"

const prisma = new PrismaClient()

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains

    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "",
        },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credential) => {
        // get the credentials
        const username = credential.username;
        const password = credential.password;
        // perform a database call & login
        return loginUser({ username, password });
      }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
      }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
  ],
  theme: {
    colorScheme: "light",
  },
  pages: {
    signIn: '/account/signin',  // Displays signin page
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
    // https://next-auth.js.org/configuration/callbacks#sign-in-callback
    async signIn({ account, profile }) {
      console.log("provider: " + account.provider)
      
      // This will automatically link the existing user to the 3rd party provider account, e.g. Google, Apple, Github.
      // If we have an existing user in User table, we want to use Google provider to login, 
      // and the email is the same in User table, we will get error message like 
      // "To confirm your identity, sign in with the same account you used originally."
      // If there exists an user, which means we use one of the way, username, email or auth provider
      // with the same email before. Here's how it works,
      // Step 1: find if there exists User by the email
      // Step 2: 
      // - if there's no such user, an user will be created automatically in User table
      // - if there exist such user, a 3rd party provider account will be created in Account table and is linked with this user.
      // 
      if (account.provider !== "credentials") {
        const existingUser = await getUserByUser(profile.email);
        if(existingUser) {
          if (account.provider === "google" || account.provider === "github") {
            await createAndLinkAccount(account, existingUser)
            return true
          }
        }
      }

      return true
    }
  },
  adapter: PrismaAdapter(prisma),
  // Enable debug messages in the console if you are having problems
  debug: false,
}

export default NextAuth(authOptions)

async function getUserByUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { "email" : email}
  });
  return user;
}

async function createAndLinkAccount(providerAccount, existingUser: User) {
  const account = {
    "type": providerAccount.type,
    "provider": providerAccount.provider,
    "providerAccountId": providerAccount.providerAccountId,
    "access_token": providerAccount.access_token,
    "expires_at": providerAccount.expires_at,
    "token_type": providerAccount.token_type,
    "scope": providerAccount.scope,
    "id_token": providerAccount.id_token,
    "userId": existingUser.id,
  };

  try {
    const _createAccount = await prisma.account.create({ data: account})
    return _createAccount
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Ignore if it's "Unique constraint failed on the fields: (`provider`,`providerAccountId`)".
      console.warn(e)  
    } else {
      reportError(e)
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loginUser = async ({username, password}) => {
  console.log(username, password)
  if(!password) {
    throw new Error("Accounts have to login with password.");
  }

  // perform a database call
  async function getUser() {
    const user = await prisma.user.findUnique({
      where: { username: username }
    });
    return user;
  }
  // return the user for login
  const user = await getUser();
  if (user === null) {
    throw new Error("User not found.");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const isMatch = await bcrypt.compare(password as string, user.password);
  if(!isMatch) {
    throw new Error("Password Incorrect.");
  }

  console.log("signIn success", user)

  return user;
};

export const registerBasicUser = async({email, username, password }) => {
  // empty validation
  if(!email) {
    throw new Error("Email cannot be empty");
  }
  if(!username) {
    throw new Error("Username cannot be empty");
  }
  if(!password) {
    throw new Error("Password cannot be empty");
  }
  // check existing record validation
  async function validateUser(criteria, value) {
    // let whereClause = {};
    // whereClause[criteria] = value;
    const user = await prisma.user.findUnique({
      where: { [criteria] : value }
    });
    return user;
  }
  const validateUsernameExist = await validateUser("username" , username);
  if(validateUsernameExist !== null) {
    throw new Error("This username existed, please choose another username.");
  }
  const validateEmailExist = await validateUser("email" , email);
  if(validateEmailExist !== null) {
    throw new Error("This email existed, please choose another email.");
  }

  // encrypt the password
  const saltRounds = 10;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const hashPass = await bcrypt.hash(password as string, saltRounds)
  // save the record into the database
  async function createUser() {
    const user = {
      "email": email,
      "username": username,
      "password": hashPass,
    };
    const _createUser = await prisma.user.create({ data: user });
    return _createUser;
  }

  return createUser()
  .catch((e) => {
    throw e
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect()
  });
}
