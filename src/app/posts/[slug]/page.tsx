import { client } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

async function getBlogPost(slug: string) {
  const response = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
  });

  if (!response.items.length) {
    return null;
  }

  return response.items[0];
}

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-2xl font-bold mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-bold mb-2">{children}</h3>
    ),
  },
  renderMark: {
    [MARKS.BOLD]: (text: any) => <span className="font-bold">{text}</span>,
    [MARKS.ITALIC]: (text: any) => <span className="italic">{text}</span>,
  },
};

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  // Get the post data
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      {post.fields.featuredImage && (
        <img
          src={`https:${(post.fields.featuredImage as any).fields.file.url}`}
          alt={String(post.fields.title) || ''}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{String(post.fields.title)}</h1>
      <div className="prose lg:prose-xl max-w-none">
        {post.fields.content && documentToReactComponents(post.fields.content as import('@contentful/rich-text-types').Document, options)}
      </div>
    </article>
  );
}