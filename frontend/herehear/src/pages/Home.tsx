import { AiFillAlert } from "react-icons/ai";
import { MdFestival } from "react-icons/md";
import { RiAlertFill } from "react-icons/ri";
import { BsBasket3Fill } from "react-icons/bs";
import { useState } from "react";
import BottomBar from "../components/BottomBar";
import Map from "../components/Home/Map";
import PostList from "./PostList";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const [bottomSheetHeight, setBottomSheetHeight] = useState("40vh");

  // 카테고리 배열에 아이콘 추가
  const categories = [
    { name: "사건사고", icon: <AiFillAlert /> },
    { name: "동네이벤트", icon: <MdFestival /> },
    { name: "최근이슈", icon: <RiAlertFill /> },
    { name: "분실/실종", icon: <BsBasket3Fill /> },
  ];

  const posts = [
    {
      id: 1,
      category: "공지",
      title: "오늘 동네 행사 알림",
      content: "오늘 오후 3시에 동네 공원에서 플리마켓을 엽니다.",
      location: "동네1",
      timeAgo: "3시간 전",
      views: 120,
      likes: 15,
      dislikes: 2,
      comments: 5,
      imageUrl: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      category: "공지",
      title: "분실물 공지",
      content: "동네 카페에서 지갑을 잃어버렸습니다.",
      location: "동네2",
      timeAgo: "1시간 전",
      views: 90,
      likes: 10,
      dislikes: 1,
      comments: 8,
      imageUrl: "https://via.placeholder.com/80",
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedLocation(null);
    setBottomSheetHeight("40vh");
  };

  const expandBottomSheet = () => {
    setBottomSheetHeight("75vh"); // 화면 전체 높이로 확장
  };

  return (
    <div className="center-content flex flex-col bg-white relative h-screen">
      <div className="relative flex-grow">
        {/* 상단 검색 바 */}
        <div>
          <div className="absolute top-0 w-full z-10">
            <div className="mx-[20px] mt-[20px]">
              <input
                type="text"
                placeholder="장소를 검색하세요"
                className="w-full p-3 rounded-md border border-gray-300"
                value={search}
                onChange={handleSearchChange}
              />
            </div>

            {/* 카테고리 버튼 */}
            <div className="flex gap-2 px-5 mt-[8px]">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="flex items-center gap-1 px-[8px] py-[5px] bg-white text-[14px] text-gray-700 font-medium rounded-[16px] border border-gray-300"
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 지도 */}
        <div className="absolute inset-0 z-0">
          <Map
            search={search}
            onPinClick={(locationName) => {
              setSelectedLocation(locationName);
              setIsBottomSheetOpen(true);
            }}
          />
        </div>

        {/* 바텀시트 */}
        {isBottomSheetOpen && (
          <div
            className="absolute bottom-0 left-0 w-full z-20 bg-white rounded-t-lg"
            style={{
              height: bottomSheetHeight,
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
            onClick={expandBottomSheet}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-bold">
                {selectedLocation || "게시글 목록"}
              </h2>
              <button
                className="text-gray-500 text-lg"
                onClick={(e) => {
                  e.stopPropagation(); // 바텀시트 클릭 이벤트와 겹치지 않도록 방지
                  closeBottomSheet();
                }}
              >
                ✕
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              <PostList posts={posts} />
            </div>
          </div>
        )}
      </div>

      {/* 하단 바 */}
      <footer className="h-20 w-full z-50 bg-white">
        <BottomBar />
      </footer>
    </div>
  );
}
