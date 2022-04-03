import Link from 'next/link'
import React from "react"
import styled from "styled-components"
import styles from "../styles/Layout.module.css";
import styles2 from '../styles/Home.module.css'

export const links = [
  { path: "employee", title: "For Employees" },
  { path: "job-seekers", title: "For Job Seekers" },
  { path: "entrepreneurs", title: "For Entrepreneurs" },
  { path: "blog", title: "Blog" },
]
const Footer = () => {
  return (
    <div className={styles2.container}>
            <footer className={styles.footer}>
            <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
            </a>
        </footer>
    </div>
  )
}

export default Footer

