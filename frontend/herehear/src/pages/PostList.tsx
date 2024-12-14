import Post from "../components/Post";

export default function PostList() {
  return (
    <div>
      <div className="flex flex-col flex-grow">
        <div>
          <Post
            category="공지"
            title="오늘 동네 행사 알림"
            content="오늘 오후 3시에 동네 공원에서 소규모 플리마켓을 엽니다. 많은 참여 부탁드립니다!"
            location="dd동"
            timeAgo="3시간 전"
            views={120}
            likes={15}
            dislikes={2}
            comments={5}
            imageUrl="https://via.placeholder.com/80"
          />
          <Post
            category="공지"
            title="오늘 동네 행사 알림"
            content="오늘 오후 3시에 동네 공원에서 소규모 플리마켓을 엽니다. 많은 참여 부탁드립니다!"
            location="dd동"
            timeAgo="3시간 전"
            views={120}
            likes={15}
            dislikes={2}
            comments={5}
            imageUrl="https://via.placeholder.com/80"
          />
        </div>
      </div>
    </div>
  );
}
