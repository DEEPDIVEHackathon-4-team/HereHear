interface PostData {
  category: string;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  userId: number;
  nickname: string;
  city: string;
}

interface PostListProps {
  posts: PostData[]; // posts가 PostData 배열로 설정
}

export default function PostList({ posts }: PostListProps) {
  if (!posts || posts.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="p-4 border-b">
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p className="text-sm text-gray-600">작성자: {post.nickname}</p>
          <p className="text-sm">{post.content}</p>
          <p className="text-sm text-gray-500">{post.city}</p>
          <p className="text-xs text-gray-400">댓글 수: {post.commentCount}</p>
          <p className="text-xs text-gray-400">
            작성일: {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
