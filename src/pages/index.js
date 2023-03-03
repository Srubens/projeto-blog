import React from 'react'
import Link from 'next/link'
import { getPrismicClient } from '@/services/prismic'
import Prismic from '@prismicio/client'

const Index = ({posts}) =>{
    return(
        <div className='container'>
            <div className=" mt-4 d-flex flex-column justify-content-center align-items-center">
                <img className='author' src="/rubens-2022.jfif" alt="imagem do autor do blog" />
                <h2>Rubens Filipe</h2>
            </div>
                <hr/>
            <div className='d-flex flex-column justify-content-center align-items-center' >
                {
                    posts.map((post) =>(
                        <div className='card border-info col-12 col-md-8 mt-4 mb-2 p-2' >

                            <Link href={`/posts/${post.slug}`} key={post.slug} >
                                <h3>{post.title[0].text}</h3>
                                <p>{post.data.content[0].text.substring(0, 150)}...</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export const getStaticProps = async() =>{
    const prismic = getPrismicClient()
    const response = await prismic.query(
        [ Prismic.predicates.at('document.type', 'post') ],
        { fetch: ['post.title','post.content'] }
    )
    //console.log('resposta',response)
    const posts = response.results.map(post =>{
        return{
            slug:post.uid,
            title:post.data.title,
            data:post.data
        }
    })
    return {
        props:{
            posts
        }
    }
}

export default Index