import { getCategoryPosts, getCategory, getCategories } from '../../services'
import PostCard from '../../components/PostCard';
import PostWidget from '../../components/PostWidget';
import Categories from '../../components/Categories';
import { useRouter } from "next/router";
import Loader from "../../components/Loader";

export default function Category({ posts }) {
  const router = useRouter();

  if(router.isFallback) {
    return <Loader/>
  }
  return (
    <>
      <h2 className='text-2xl font-bold'>Posts relacionados al tema:</h2>
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

export async function getStaticProps({ params }) {
  const posts = (await getCategoryPosts(params.slug)) || [];
  
  return {
    props: { posts }
  }
}

export async function getStaticPaths() {
  const categories = await getCategories();


  return {
    paths: categories.map(({ slug }) => ({ params : { slug }})),
    fallback: false,
  }
}