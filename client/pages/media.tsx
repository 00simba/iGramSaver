import axios, { AxiosInterceptorManager } from 'axios';
import { useEffect, useState } from 'react';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import mediaStyles from '@/styles/Media.module.css';
import GoogleAnalytics from "@bradgarropy/next-google-analytics"
import Footer from '@/components/footer';
import '@/styles/Media.module.css'

const inter = Inter({ subsets: ['latin'] })

function delay(time: any) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

export default function Media(){

    const [links, setLinks] = useState<any[]>([])
    const [Base64, setBase64] = useState<any[]>([])

    const config = {
        headers: {
         'Access-Control-Allow-Origin' : '*',
         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
         }
    }

    useEffect(() => {
        const getLinks = async () => {   
            const urlSearchParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlSearchParams.entries());
            const data = await axios.post('https://igsave.onrender.com', { url: params.url}, config)
            
            //Array contains object with key value pairs of base64 and url

            let linksArr = new Array<string>
            let base64Arr = new Array<string> 

            data.data.links.map((item: any) => {
                linksArr.push(item.url)
                base64Arr.push(item.base64)
            })            
            
            setLinks(linksArr)
            setBase64(base64Arr)        
        }
        getLinks()
    }, [])  

    // useEffect(() => {
    //     const getLinks = async () => {   
    //         const urlSearchParams = new URLSearchParams(window.location.search);
    //         const params = Object.fromEntries(urlSearchParams.entries());
    //         axios.post('https://igsave.onrender.com', { url: params.url}, config).then((res) => {console.log(res)})
    //         delay(3000)
    //         const data = await axios.post('https://igsave.onrender.com/get', { url: params.url}, config)
    //         setLinks(data.data.links)
    //         setBase64(data.data.base64)
    //     }
    //     getLinks()
    // }, [])    

    return(
        <>
            <main className={styles.header}>
                <a href='https://igsave.io'><img className={styles.logo} src='/igsave_logo_full.png'></img></a>
            </main>
            <div>
                <div className={styles.downloadDiv}>
                    <h1 className={inter.className}>Post Media</h1>  
                </div>
            </div>
            <div id='cardContainer' className={styles.linkDiv}>
                {links.map((value, index) => {   
                    return(
                    <div className={mediaStyles.mediaCard} key={value}>
                        <img className={mediaStyles.thumbNail} src={Base64[index]}/>
                        <div className={mediaStyles.downloadButton}>
                            <div className={mediaStyles.aTagDiv}>
                                <a className={inter.className} href={value} target='_blank' rel='noreferrer'>Download</a>
                            </div>
                        </div>
                    </div>
                    )
                })} 
            </div>
            <div className={styles.contentDiv}>

            </div>
            <Footer/>
            <GoogleAnalytics measurementId='G-ZGXMMY4FE3'/>
        </>
    )   
}