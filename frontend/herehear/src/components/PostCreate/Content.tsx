import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selectLocationState } from "../../recoil/locationState";

export default function Content() {
  const [selectedCategory, setSelectedCategory] = useState("카테고리 선택");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const categories = ["사건사고", "동네이벤트", "최근이슈", "분실/실종"];
  const navigate = useNavigate();
  const location = useRecoilValue(selectLocationState);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationButtonClick = () => {
    navigate("/searchmap");
  };

  return (
    <div className="px-5 mt-5">
      <div>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-1 text-[18px] appearance-none bg-transparent outline-none"
        >
          <option disabled value="카테고리 선택">
            카테고리 선택
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="h-[1px] bg-gray-300 mt-2" />
      </div>

      <div className="mt-5 bg-gray-200 text-sm text-gray-700 rounded-md p-4">
        <div className="font-semibold mb-1">게시글 운영정책</div>
        <div>거래관련, 명예훼손, 광고 목적의 글을 올리실 수 없어요.</div>
      </div>

      <div className="mt-5">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="text-[24px] w-full p-3 border-b border-gray-300 outline-none text-sm"
        />
      </div>

      <div className="mt-5">
        <textarea
          placeholder="내용을 입력하세요"
          className="text-[18px] w-full p-3 outline-none text-sm h-32"
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          사진
        </label>
        <button
          className="flex items-center gap-2"
          onClick={handleLocationButtonClick}
        >
          위치
        </button>
      </div>

      {location.name && (
        <div className="mt-5">
          <div className="text-sm text-gray-500 mb-1">선택한 위치</div>
          <div className="text-lg font-medium">{location.name}</div>
          <div className="text-sm text-gray-500 mt-1">{location.address}</div>
        </div>
      )}

      {uploadedImage && (
        <div className="mt-5">
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="w-full h-auto rounded-md"
          />
        </div>
      )}
    </div>
  );
}
