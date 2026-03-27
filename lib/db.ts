import fs from 'fs/promises';
import path from 'path';

export interface Post {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  coverImage: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
}

const DATA_FILE = path.join(process.cwd(), 'data', 'posts.json');

export async function getPosts(): Promise<Post[]> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const posts: Post[] = JSON.parse(data);
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Failed to read posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

export async function createPost(post: Omit<Post, 'id' | 'slug' | 'date' | 'author'>) {
  const posts = await getPosts();
  
  const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  let uniqueSlug = slug;
  let counter = 1;
  while (posts.some(p => p.slug === uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    slug: uniqueSlug,
    author: "Venkata Narayana",
    date: new Date().toISOString()
  };

  posts.push(newPost);
  await savePosts(posts);
  return newPost;
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const posts = await getPosts();
  const index = posts.findIndex(p => p.id === id);
  
  if (index > -1) {
    posts[index] = { ...posts[index], ...updates };
    await savePosts(posts);
    return posts[index];
  }
  return null;
}

export async function deletePost(id: string) {
  const posts = await getPosts();
  const filtered = posts.filter(p => p.id !== id);
  if (filtered.length !== posts.length) {
    await savePosts(filtered);
    return true;
  }
  return false;
}

async function savePosts(posts: Post[]) {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf8');
}
