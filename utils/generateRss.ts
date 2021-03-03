import { Feed } from 'feed'
import { Post } from '../pages/index'
import { formatSlug } from './slugFormat'

const domain = 'https://dariospace.com'

export const generateRss = (posts: Post[]) => {
  const year = new Date().getFullYear()
  const feed = new Feed({
    id: domain,
    link: domain,
    title: 'Dario Space',
    copyright: `Unlicensed ${year}, Dario Space`,
    image: `${domain}/favicon.png`,
    favicon: `${domain}/favicon.ico`,
    author: {
      name: 'Dario Space',
      email: 'dariospaceman@gmail.com',
      link: 'https://dariospace.com'
    }
  })

  posts.forEach(post => {
    if (post.published) {
      feed.addItem({
        title: post.name,
        id: `${domain}${formatSlug(post.slug)}`,
        link: `${domain}${formatSlug(post.slug)}`,
        description: post.preview,
        date: new Date(post.date)
      })
    }
  })

  return feed.rss2()
}
