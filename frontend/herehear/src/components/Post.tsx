interface PostProps {
  category: string; // 카테고리
  title: string; // 제목
  content: string; // 내용
  location: string; // 동네 이름
  timeAgo: string; // 작성 시간 (몇 시간 전)
  views: number; // 조회수
  likes: number; // 좋아요 수
  dislikes: number; // 싫어요 수
  comments: number; // 댓글 수
  imageUrl: string; // 이미지 URL
}

export default function Post({
  category,
  title,
  content,
  location,
  timeAgo,
  views,
  likes,
  dislikes,
  comments,
  imageUrl,
}: PostProps) {
  return (
    <div className="w-full flex items-start border-b">
      <div className="flex-grow px-5 py-5">
        <div className="bg-gray-100 text-gray-600 text-[11px] font-bold rounded-sm w-[50px] h-[20px] flex items-center justify-center mb-2">
          {category}
        </div>
        <div className="flex">
          <div className="flex-grow">
            <h2 className="text-[18px] font-semibold mb-2">{title}</h2>
            <p className="text-[16px]  text-gray-700 line-clamp-2">{content}</p>
          </div>
          {imageUrl && (
            <div className="ml-4 flex-shrink-0">
              <img
                src={imageUrl}
                alt={title}
                className="w-20 h-20 object-cover rounded-md"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center text-[14px] text-gray-500 mt-[8px]">
          {/* 왼쪽 정보: 동네, 시간, 조회수 */}
          <div className="flex items-center gap-2">
            <span>{location}</span>
            <span className="text-customGray">·</span>
            <span>{timeAgo}</span>
            <span className="text-customGray">·</span>
            <span>조회수 {views}</span>
          </div>

          {/* 오른쪽 정보: 좋아요, 싫어요, 댓글 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span role="img" aria-label="좋아요">
                👍
              </span>
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <span role="img" aria-label="싫어요">
                👎
              </span>
              <span>{dislikes}</span>
            </div>
            <div className="flex items-center gap-1">
              <span role="img" aria-label="댓글">
                💬
              </span>
              <span>{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
