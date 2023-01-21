import axios from 'axios';
import { useEffect, useState } from 'react';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import GoogleAnalytics from "@bradgarropy/next-google-analytics"
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] })

export default function Media(){

    const [links, setLinks] = useState([])

    useEffect(() => {
        const getLinks = async () => {      
            const data = await axios.get('https://igsave.onrender.com')
            setLinks(data.data.links)
        }
        getLinks()
    }, [])    

    return(
        <>
            <main className={styles.header}>
                <a href="https://igsave.io"><img className={styles.logo} src='/igsave_logo_full.png'></img></a>
            </main>
            <div>
                <div className={styles.downloadDiv}>
                    <h1 className={inter.className}>Post Media</h1>  
                </div>
            </div>
            <div className={styles.linkDiv}>
                {links.map((link) => {           
                    return(
                    <div className={styles.mediaCard} key={link}>
                        <div className={styles.downloadButton}>
                            <div className={styles.aTagDiv}>
                                <a className={inter.className} href={link} target="_blank" rel="noreferrer">Download</a>
                            </div>
                        </div>
                    </div>
                    )
                })} 
            </div>
            <div className={styles.contentDiv}>

            </div>
            <Footer/>
            <GoogleAnalytics measurementId="G-ZGXMMY4FE3" />
        </>
    )   
}