import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Map from "../components/Map";
import { locationState } from "../recoil/locationState";

export default function LocationRegister() {
  const navigate = useNavigate();
  const [location, setLocation] = useRecoilState(locationState);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSave = () => {
    if (location.name && location.address) {
      alert(`활동지 "${location.name}" (${location.dong})가 저장되었습니다.`);
      navigate("/home");
    } else {
      alert("활동지를 선택해주세요.");
    }
  };

  return (
    <div className="center-content flex flex-col bg-white relative">
      <div className="flex flex-col h-screen">
        {/* 상단 */}
        <div className="px-5 py-3 border-b">
          <h1 className="text-2xl font-bold">주 활동지 추가</h1>
          <p className="text-gray-600 text-sm mt-2">
            지도를 움직이거나 주소를 입력하세요
          </p>
        </div>

        {/* 검색 입력란 */}
        <div className="px-5 mt-4">
          <input
            type="text"
            placeholder="장소명을 검색하세요"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {/* 지도 영역 */}
        <div className="flex-grow mt-4">
          <Map search={search} setLocation={setLocation} />
        </div>

        {/* 주소 정보와 저장 버튼 */}
        <div className="px-5 py-4 bg-white border-t">
          {location.address && (
            <div className="mb-4">
              <div className="text-sm text-gray-500">주소</div>
              <div className="text-lg font-medium mt-1">{location.address}</div>
              <div className="text-sm text-gray-500 mt-1">{location.dong}</div>
            </div>
          )}
          <button
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-md"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
