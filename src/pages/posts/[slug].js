import React from 'react'
import { getPrismicClient } from '@/services/prismic'
import {RichText} from 'prismic-dom'
import Link from 'next/link'

const Post = ({post}) =>{
    const {title, content,updateAt, slug} = post
    return(
        <div className='container' >
            <div className="mt-5 mb-5">
                <Link href={'/'} >Voltar</Link>
            </div>
            <div className='d-flex flex-column' >
                <h1>
                    {title}
                </h1>
                <small>{updateAt}</small>
                <br/>
                <div dangerouslySetInnerHTML={{__html:post.content}} />
            </div>
            {/* {
                <prev>
                    {JSON.stringify(post, null, 2)}
                </prev>
            } */}
        </div>
    )
}

export const getStaticPaths = async() =>{
    return{
        paths:[],
        fallback:true
    }
}

export const getStaticProps = async context =>{
    const {slug} = context.params 
    const prismic = getPrismicClient()
    const response = await prismic.getByUID('post', String(slug), {})
    console.log(response)

    const post = { 
        slug,
        title: RichText.asText(response.data.title),
        content:RichText.asHtml(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-Br', {
            day:'2-digit',
            month:'long',
            year:'numeric'
        })
    }

    return {
        props:{
            post
        },
        revalidate: 60 * 60 * 12
    }

}

export default Post