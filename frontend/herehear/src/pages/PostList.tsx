import Post from "../components/Post";

interface PostData {
  category: string;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  userId: number;
  nickname: string;
  city: string;
  imageUrl?: string;
}

interface PostListProps {
  posts: PostData[]; // PostData 배열
}

export default function PostList({ posts }: PostListProps) {
  if (!posts || posts.length === 0) {
    return <p></p>;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <Post
          key={index}
          category={post.category}
          title={post.title}
          content={post.content}
          city={post.city}
          createdAt={post.createdAt}
          commentCount={post.commentCount}
          imageUrl={post.imageUrl} // 옵션 필드
        />
      ))}
    </div>
  );
}
