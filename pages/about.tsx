
   
import Head from 'next/head'
import styles from "../components/layout.module.css";
import Layout, { siteTitle } from '../components/layout'

export default function About() {
  return (
    
    <Layout>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">About page!</a>
          </h1>
    </Layout>
  )
}