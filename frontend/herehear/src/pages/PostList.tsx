import Post from "../components/Post";

interface PostData {
  category: string; // 카테고리
  posterId: number;
  title: string; // 제목
  content: string; // 내용
  createdAt: string; // 작성 시간
  commentCount: number; // 댓글 수
  userId: number; // 작성자 ID
  nickname: string; // 작성자 닉네임
  regionName: string; // 지역명
  likeCount: number; // 좋아요 수
  dislikeCount: number; // 싫어요 수
  viewCount: number; // 조회수
  imageUrl?: string; // 이미지 URL (옵션)
}

interface PostListProps {
  posts: PostData[]; // PostData 배열
}

export default function PostList({ posts }: PostListProps) {
  // 기본값 변환: API에서 받은 데이터를 보정
  const processedPosts = posts.map((post) => ({
    ...post,
    likeCount: post.likeCount ?? 0, // undefined인 경우 0으로 처리
    dislikeCount: post.dislikeCount ?? 0, // undefined인 경우 0으로 처리
    viewCount: post.viewCount ?? 0, // undefined인 경우 0으로 처리
  }));

  if (!processedPosts || processedPosts.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <div>
      {processedPosts.map((post) => (
        <Post
          key={post.posterId}
          id={post.posterId}
          category={post.category}
          title={post.title}
          content={post.content}
          city={post.regionName.split(" ").slice(-1)[0]} // 지역명에서 마지막 단어 추출
          createdAt={post.createdAt}
          commentCount={post.commentCount}
          likeCount={post.likeCount} // 좋아요 수 추가
          dislikeCount={post.dislikeCount} // 싫어요 수 추가
          viewCount={post.viewCount} // 조회수 추가
          imageUrl={post.imageUrl} // 옵션 필드
        />
      ))}
    </div>
  );
}
