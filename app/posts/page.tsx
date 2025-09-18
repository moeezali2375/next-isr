let hitCount = 0;

async function getPosts() {
  hitCount++;
  const timestamp = new Date().toISOString();
  console.log(`[SERVER HIT #${hitCount}] ${timestamp}`);

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 15 },
  });

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts (ISR, updates every 15s)</h1>
      <ul>
        {posts.slice(0, 5).map((p: { id: string; title: string }) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
