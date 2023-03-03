import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "@/css/style.css"

const MyApp = ({Component, pageProps}) =>{
    return(
        <Component {...pageProps} />
    )
}

export default MyApp