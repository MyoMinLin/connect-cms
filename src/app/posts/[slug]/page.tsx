import { client } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import Image from 'next/image';

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
    [BLOCKS.PARAGRAPH]: (node: import('@contentful/rich-text-types').Block | import('@contentful/rich-text-types').Inline, children: React.ReactNode) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: import('@contentful/rich-text-types').Block | import('@contentful/rich-text-types').Inline, children: React.ReactNode) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: import('@contentful/rich-text-types').Block | import('@contentful/rich-text-types').Inline, children: React.ReactNode) => (
      <h2 className="text-2xl font-bold mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: import('@contentful/rich-text-types').Block | import('@contentful/rich-text-types').Inline, children: React.ReactNode) => (
      <h3 className="text-xl font-bold mb-2">{children}</h3>
    ),
  },
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <span className="font-bold">{text}</span>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <span className="italic">{text}</span>,
  },
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  // Get the post data
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      {post.fields.featuredImage && (
        <Image
          src={`https:${(post.fields.featuredImage as { fields: { file: { url: string; details: { image?: { width?: number; height?: number } } } } }).fields.file.url}`}
          alt={String(post.fields.title) || ''}
          width={((post.fields.featuredImage as { fields: { file: { details: { image?: { width?: number } } } } }).fields.file.details.image?.width) || 800}
          height={((post.fields.featuredImage as { fields: { file: { details: { image?: { height?: number } } } } }).fields.file.details.image?.height) || 400}
          className="w-full h-64 object-cover rounded-lg mb-8"
          priority
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{String(post.fields.title)}</h1>
      <div className="prose lg:prose-xl max-w-none">
        {post.fields.content && documentToReactComponents(post.fields.content as import('@contentful/rich-text-types').Document, options)}
      </div>
    </article>
  );
}