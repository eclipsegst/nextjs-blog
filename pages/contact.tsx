import styles from "../components/layout.module.css";
import Layout, { siteTitle } from '../components/layout'

export default function Contact() {
  return (
    <Layout>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Contact page!</a>
          </h1>
    </Layout>
  )
}