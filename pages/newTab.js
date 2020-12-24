import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React from 'react';

export default class NewTab extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Firebase Next App</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to <a href="https://nextjs.org">Next.js!</a>
                    </h1>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <img src="./favicon.ico" alt="TutorialsPoint Logo" />
                    <Link href="/FirstPost"><a>First Post</a></Link>
                    <br />
                    <div>Next stars: {this.props.stars}</div>
    
                </main>
    
                <footer className={styles.footer}>
                    <h2>footer</h2>
                </footer>
            </div>
        )
    }
    
}

export async function getServerSideProps(context) {
    
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    console.log("getServerSideProps", json)
   
    return {
        props: { stars: json.stargazers_count }
    }
}
