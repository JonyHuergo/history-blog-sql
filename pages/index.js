import Head from 'next/head'
import { getPosts } from '../services'
import PostCard from '../components/PostCard';
import PostWidget from '../components/PostWidget';
import Categories from '../components/Categories';
import { FeaturedPosts } from '../sections/index';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>History Blog</title>
        <meta name="description" content="Blog de historia" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <section className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </section>
        <section className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </section>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}