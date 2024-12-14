import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Map from "../Map";

export default function SearchMap() {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // 검색어 상태
  const [location, setLocation] = useState({
    name: "",
    address: "",
    x: 0,
    y: 0,
    dong: "",
  }); // 선택된 위치 상태

  // 검색 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-3 border-b">
        <button
          className="text-gray-500 text-lg"
          onClick={() => navigate("/postcreate")}
        >
          ✕
        </button>
        <h1 className="text-lg font-semibold">장소 검색</h1>
        <div className="w-6"></div>
      </div>

      {/* 지도와 검색 입력란 */}
      <div className="relative flex-grow h-full">
        {/* 검색 입력란 */}
        <div className="absolute top-0 left-0 right-0 z-10 px-4 mt-4">
          <input
            type="text"
            placeholder="장소를 검색하세요"
            value={search}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md"
          />
        </div>

        {/* 지도 컴포넌트 */}
        <div className="absolute inset-0 z-0">
          <Map search={search} setLocation={setLocation} />
        </div>

        {/* 선택된 장소 정보 */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white z-10">
          <h2 className="text-lg font-semibold">선택된 장소:</h2>
          <p className="text-sm text-gray-600">
            {location.name || "선택된 장소가 없습니다."}
          </p>
          <p className="text-sm text-gray-600">{location.address}</p>
        </div>
      </div>
    </div>
  );
}
