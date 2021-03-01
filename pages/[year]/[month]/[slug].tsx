import { ArrowLeftOutline, CalendarOutline, ChevronLeftOutline, ChevronRightOutline } from 'heroicons-react'
import Head from 'next/head'
import Link from 'next/link'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { FC } from 'react'
// core notion renderer
import { NotionRenderer, Code, Collection } from 'react-notion-x'
import { getAllPosts, Post } from '../..'
import Footer from '../../../components/Footer'
import { formatSlug } from '../../../utils/slugFormat'

const notion = new NotionAPI()

export interface Pagination {
  prev: Post | null
  next: Post | null
}

export const getStaticProps = async ({ params: { slug } }: { params: { slug: string } }) => {
  // Get all posts again
  const posts = (await getAllPosts()).filter(p => p.published)

  // Find the current blogpost by slug
  const postIndex = posts.findIndex(t => t.slug === slug)
  const post = posts[postIndex]

  const pagination: Pagination = {
    prev: postIndex - 1 >= 0 ? posts[postIndex - 1] : null,
    next: postIndex + 1 < posts.length ? posts[postIndex + 1] : null
  }

  const recordMap = await notion.getPage(post!.id)

  return {
    props: {
      recordMap,
      post,
      pagination
    },
    revalidate: 1
  }
}

const BlogPost: FC<{ recordMap: ExtendedRecordMap; post: Post; pagination: Pagination }> = ({
  recordMap,
  post,
  pagination
}: {
  recordMap: ExtendedRecordMap
  post: Post
  pagination: Pagination
}) => {
  if (!post) return null

  return (
    <>
      <Head>
        <title>{post.name} - Dario Space</title>
        <meta name="robots" content="follow, index" />
        <meta content={post.name} name="description" />
        <meta property="og:site_name" content="Dario Space" />
        <meta property="og:description" content={post.name} />
        <meta property="og:title" content={post.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@leeerob" />
        <meta name="twitter:title" content={post.name} />
        <meta name="twitter:description" content={post.name} />
        {post.date && <meta property="article:published_time" content={new Date(post.date).toLocaleDateString()} />}
      </Head>
      <div className="min-h-screen flex flex-col">
        <div className="container ml-0 mr-auto px-6 justify-center flex-grow max-w-4xl">
          <nav className="mt-4 inline-block">
            <Link href="/">
              <a className="flex items-center -ml-2 p-2 rounded lg:hover:bg-gray-100">
                <ArrowLeftOutline size={20} className="mr-4" />
                <span>home</span>
              </a>
            </Link>
          </nav>
          <article>
            <div className="my-16 ml-0 mr-auto max-w-3xl">
              <div className="mb-12 text-left">
                <div className="text-3xl font-bold mb-3">
                  <h2>{post.name}</h2>
                </div>
                <div className="text-sm text-gray-400 flex flex-nowrap justify-left items-center space-x-2 overflow-hidden">
                  <CalendarOutline size={16} className="flex-shrink-0" />
                  <time className="flex-shrink-0">{new Date(post.date).toLocaleDateString()} · </time>
                  {post.author.map(author => (
                    <div key={author.id} className="flex items-center space-x-1 flex-shrink-0">
                      <img src={author.profilePhoto} alt="profile photo" className="w-6 h-6 rounded-full" />
                      <span className="hidden md:block author byline">{author.fullName}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden">
                <NotionRenderer
                  recordMap={recordMap}
                  fullPage={false}
                  components={{
                    code: Code,
                    collection: Collection
                  }}
                />
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                {pagination.prev && (
                  <Link href="/[year]/[month]/[slug]" as={formatSlug(pagination.prev.date, pagination.prev.slug)}>
                    <a className="p-3 border-2 hover:bg-gray-50 flex items-center justify-between space-x-2">
                      <ChevronLeftOutline size={20} />
                      <span>{pagination.prev?.name}</span>
                    </a>
                  </Link>
                )}
                {pagination.next && (
                  <Link href="/[year]/[month]/[slug]" as={formatSlug(pagination.next.date, pagination.next.slug)}>
                    <a className="p-3 border-2 hover:bg-gray-50 flex items-center justify-between space-x-2">
                      <span>{pagination.next?.name}</span>
                      <ChevronRightOutline size={20} />
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const table = (await getAllPosts()).filter(p => p.published)
  return {
    paths: table.map(row => formatSlug(row.date, row.slug)),
    fallback: true
  }
}

export default BlogPost
