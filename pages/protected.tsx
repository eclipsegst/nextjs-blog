import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/Layout"
import AccessDenied from "../components/access-denied"

export default function ProtectedPage() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState<string | null>(null);

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      
      type JSONResponse = {
        content: string,
        error: string
      }

      const json = await res.json() as JSONResponse
      if (json.content) {
        setContent(json.content)
      }
    }
    void fetchData()
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
    </Layout>
  )
}
