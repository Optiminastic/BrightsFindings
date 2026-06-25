import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import BlogShowcase from "@/app/components/BlogShowcase";
import Footer from "@/app/components/Footer";
import LatestFromBlog from "@/app/components/LatestFromBlog";
import { getAllPosts } from "@/app/lib/posts";

export const revalidate = 300;

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LatestFromBlog />
        <Hero />
        <BlogShowcase posts={posts} />
      </main>
      <Footer />
    </>
  );
}
