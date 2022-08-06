import { signIn, signOut, useSession } from "next-auth/react"
import { StyledNavLink } from "./Navbar"

export default function SignInSignOut() {
  const { data: session } = useSession()

  return (
    <div >
      {!session && (
        <a
          href={`/api/auth/signin`}
          onClick={(e) => {
            e.preventDefault()
            void signIn()
          }}
        >
          <StyledNavLink>
            Sign in
          </StyledNavLink>
        </a>
      )}
      {session?.user && (
        <>
          <span
            style={{ backgroundImage: `url(${session.user.image})` }}
          />
          <strong>{session.user.email || session.user.name}</strong>
          <a
            href={`/api/auth/signout`}
            // className={styles.button}
            onClick={(e) => {
              e.preventDefault()
              void signOut()
            }}
          >
            <StyledNavLink>
              Sign out
            </StyledNavLink>
          </a>
        </>
      )}
    </div>
  )
}
