import Head from 'next/head'
import Link from 'next/link'

import { CalendarOutline, TagOutline } from 'heroicons-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { formatSlug } from '../utils/slugFormat'

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID

export interface Author {
  id: string
  firstName: string
  lastName: string
  fullName: string
  profilePhoto: string
}

export interface Post {
  id: string
  name: string
  tag: string
  published: boolean
  date: string
  slug: string
  author: Author[]
  preview: string
}

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`).then(res => res.json())
}

export const getStaticProps = async () => {
  const posts = (await getAllPosts()).filter(p => p.published)
  if (!posts) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      posts
    },
    revalidate: 1
  }
}

const HomePage = ({ posts }: { posts: Post[] }) => {
  if (!posts) {
    return null
  }
  return (
    <>
      <Head>
        <title>Dario Spaceman</title>
      </Head>
      <Header />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="container ml-0 mr-auto px-6 justify-center flex-grow max-w-3xl bg-white">
          <div className="my-16">
            <div className="mt-8 text-2xl font-bold">Dario Spaceman</div>
            <div className="mt-8">
              I own a recycling company at
              <Link href="https://grupoginebra.com">
                <a>
                  <div className="text-gray-600 mb-2">Compost Compost.</div>
                </a>
              </Link>
              I teach meditation for stressed startups at
              <Link href="http://meditaon.com">
                <a>
                  <div className="text-gray-600 mb-2">Meditaon.</div>
                </a>
              </Link>
              <div>I write about books and experiments.</div>
            </div>
            <div className="mt-12 leading-loose flex flex-col space-y-4 -mx-4">
              {posts.map(
                post =>
                  post.published && (
                    <Link key={post.id} href="/[slug]" as={formatSlug(post.slug)}>
                      <a className="p-4 hover:bg-gray-50">
                        <div className="rounded-xs mb-2 mr-2 px-2 py-1 text-blue-600 bg-blue-50 text-xs inline-block">
                          <div className="flex items-center space-x-1">
                            <TagOutline size={16} /> <span>{post.tag}</span>
                          </div>
                        </div>
                        <div className="rounded-xs mb-2 mr-2 px-2 py-1 text-gray-600 bg-gray-50 text-xs inline-block">
                          <div className="flex items-center space-x-1">
                            <CalendarOutline size={16} className="flex-shrink-0" />
                            <time className="flex-shrink-0">{new Date(post.date).toLocaleDateString('es-AR')}</time>
                          </div>
                        </div>
                        <div className="font-bold text-xl mb-1">{post.name}</div>
                        <div className="text-sm text-gray-400 mb-2">{post.preview}</div>
                      </a>
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default HomePage
