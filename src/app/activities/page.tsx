import { client } from '@/lib/contentful';
import Link from 'next/link';

async function getBlogPosts() {
  const response = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
  });

  return response.items;
}

export default async function ActivitiesPage() {
  const posts = await getBlogPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">活動一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Link 
            href={`/posts/${post.fields.slug}`} 
            key={post.sys.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            {post.fields.featuredImage && (
              <img
                src={post.fields.featuredImage.fields.file.url}
                alt={post.fields.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{post.fields.title}</h2>
            <p className="text-gray-600">{post.fields.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}