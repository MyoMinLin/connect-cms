export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  publishDate: string;
}