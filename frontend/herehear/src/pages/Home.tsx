import { useState } from "react";
import BottomBar from "../components/BottomBar";
import Map from "../components/Home/Map"; // 지도 컴포넌트

export default function Home() {
  const [search, setSearch] = useState("");
  const categories = ["사건사고", "동네이벤트", "최근이슈", "분실/실종"];

  // 검색 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="center-content flex flex-col bg-white relative">
      <div className="relative h-screen">
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
                  className="px-4 py-[5px] bg-white text-sm text-gray-700 font-medium rounded-[16px] border border-gray-300"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 지도 */}
        <div className="absolute inset-0 z-0">
          <Map search={search} />
        </div>

        {/* 하단 바 */}
        <footer className="h-20 absolute bottom-0 w-full z-10 bg-white">
          <BottomBar />
        </footer>
      </div>
    </div>
  );
}
