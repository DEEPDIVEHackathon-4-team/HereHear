import Post from "../components/Post";

interface PostData {
  id: number;
  category: string;
  title: string;
  content: string;
  location: string;
  timeAgo: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  imageUrl: string;
}

interface PostListProps {
  posts: PostData[]; // 게시글 배열 타입
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          category={post.category}
          title={post.title}
          content={post.content}
          location={post.location}
          timeAgo={post.timeAgo}
          views={post.views}
          likes={post.likes}
          dislikes={post.dislikes}
          comments={post.comments}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}
