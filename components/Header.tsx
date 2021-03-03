import Link from 'next/link'
import Head from 'next/head'
import { HomeOutline, RssOutline, UserCircleOutline, CodeOutline } from 'heroicons-react'

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

const Header = () => {
  return (
    <header className="container ml-0 mr-auto px-6 justify-center flex-grow max-w-3xl bg-white">
      <Head>
        <title>Dario Space</title>
        <meta name="description" content="Some description about some stuff" />
        <meta name="og:title" content="Dario Space" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@dariospace" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <nav className="mt-4 inline-block">
        <ul>
          <li>
            <div className="mt-2 flex items-center space-x-2">
              <a
                href="https://dariospace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 px-2 bg-blue-50 hover:text-blue-500 rounded"
              >
                <div className="flex items-center space-x-2">
                  <HomeOutline size={16} />
                  <span>home</span>
                </div>
              </a>
              <a
                href="https://github.com/dariospace"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 px-2 bg-blue-50 hover:text-blue-500 rounded"
              >
                <div className="flex items-center space-x-2">
                  <CodeOutline size={16} />
                  <span>github</span>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/dariospace"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 px-2 bg-blue-50 hover:text-blue-600 rounded"
              >
                <div className="flex items-center space-x-2">
                  <UserCircleOutline size={16} />
                  <span>linkedin</span>
                </div>
              </a>
              <Link href="/feed">
                <a className="py-1 px-2 bg-indigo-50 hover:text-indigo-600 rounded">
                  <div className="flex items-center space-x-2">
                    <RssOutline size={16} />
                    <span>RSS</span>
                  </div>
                </a>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
