// index.js
import Link from 'next/link'
import groq from 'groq'
import client from '../shared/client'

//Components
import Layout from '../shared/layout'

const Index = (props) => {
    const { posts = [] } = props
   
    return (
      
      <Layout>
        <h1>Welcome to a blog!</h1>
        {posts.map(
          ({ _id, title = '', slug = '', _updatedAt = '' }) =>
            slug && (
              <li key={_id}>
                <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                  <a>{title}</a>
                </Link>{' '}
                ({new Date(_updatedAt).toDateString()})
              </li>
            )
        )}
      </Layout>
    )
}

Index.getInitialProps = async () => ({
    posts: await client.fetch(groq`
      *[_type == "post" && publishedAt < now()]|order(publishedAt desc)
    `)
})

export default Index