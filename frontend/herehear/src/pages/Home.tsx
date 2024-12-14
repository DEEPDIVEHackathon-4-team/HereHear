import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillAlert } from "react-icons/ai";
import { MdFestival } from "react-icons/md";
import { RiAlertFill } from "react-icons/ri";
import { BsBasket3Fill } from "react-icons/bs";
import BottomBar from "../components/BottomBar";
import Map from "../components/Home/Map";
import PostList from "./PostList";

interface PostData {
  id: number;
  category: string;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  userId: number;
  nickname: string;
  city: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<PostData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]); // 필터링된 게시물
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState("40vh");

  const categories = [
    { name: "사건사고", icon: <AiFillAlert /> },
    { name: "동네이벤트", icon: <MdFestival /> },
    { name: "최근이슈", icon: <RiAlertFill /> },
    { name: "분실/실종", icon: <BsBasket3Fill /> },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://172.16.108.26:8080/api/v1/poster/map",
          {
            params: {
              category: "ACCIDENT",
              latitude: 37,
              longitude: 127,
              distance: 4000,
              page: 0,
              size: 10,
            },
            headers: {
              Accept: "*/*",
            },
          }
        );
        if (response.data?.data?.content) {
          setPosts(response.data.data.content); // 받아온 데이터 설정
        } else {
          setPosts([]); // 데이터가 없을 경우 빈 배열 설정
        }
      } catch (error) {
        console.error("게시물 데이터를 불러오는 중 오류 발생:", error);
        setPosts([]); // 오류 발생 시 빈 배열로 초기화
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearch(keyword);

    // 검색어로 게시물 필터링
    const filtered = posts.filter(
      (post) =>
        post.title.includes(keyword) ||
        post.content.includes(keyword) ||
        post.city.includes(keyword)
    );
    setFilteredPosts(filtered);
  };

  const handlePinClick = (latitude: number, longitude: number) => {
    // 핀 클릭 시 해당 위치의 게시물만 필터링
    const locationPosts = posts.filter(
      (post) => post.latitude === latitude && post.longitude === longitude
    );
    setFilteredPosts(locationPosts);
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedLocation(null);
    setBottomSheetHeight("40vh");
  };

  const expandBottomSheet = () => {
    setBottomSheetHeight("75vh");
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
            posts={posts}
            onPinClick={(latitude, longitude) =>
              handlePinClick(latitude, longitude)
            }
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
                  e.stopPropagation();
                  closeBottomSheet();
                }}
              >
                ✕
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              <PostList posts={filteredPosts.length ? filteredPosts : posts} />
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
