export interface PostData {
  id: number; // 게시글 ID
  category: string; // 카테고리
  title: string; // 제목
  content: string; // 내용
  createdAt: string; // 작성 시간
  commentCount: number; // 댓글 수
  userId: number; // 작성자 ID
  nickname: string; // 작성자 닉네임
  regionName: string; // 지역명
  latitude?: number; // 위도 (옵션)
  longitude?: number; // 경도 (옵션)
  likeCount?: number; // 좋아요 수 (옵션)
  dislikeCount?: number; // 싫어요 수 (옵션)
  viewCount?: number; // 조회수 (옵션)
  imageUrl?: string; // 이미지 URL (옵션)
  posterId?: string; // 이미지 URL (옵션)
}
