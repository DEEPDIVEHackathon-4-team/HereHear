import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Content() {
  const [selectedCategory, setSelectedCategory] = useState("카테고리 선택");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const categories = ["사건사고", "동네이벤트", "최근이슈", "분실/실종"];
  const navigate = useNavigate();

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
      {/* 카테고리 선택 */}
      <div>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-3 text-sm appearance-none bg-transparent outline-none"
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
        {/* 구분선 */}
        <div className="h-[1px] bg-gray-300 mt-2" />
      </div>

      {/* 게시글 운영정책 박스 */}
      <div className="mt-5 bg-gray-100 text-sm text-gray-700 rounded-md p-4">
        <div className="font-semibold mb-1">게시글 운영정책</div>
        <div>거래관련, 명예훼손, 광고 목적의 글을 올리실 수 없어요.</div>
      </div>

      {/* 제목 입력 */}
      <div className="mt-5">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full p-3 border-b border-gray-300 outline-none text-sm"
        />
      </div>

      {/* 내용 입력 */}
      <div className="mt-5">
        <textarea
          placeholder="내용을 입력하세요"
          className="w-full p-3 outline-none text-sm h-32"
        />
      </div>

      {/* 사진 및 위치 추가 버튼 */}
      <div className="mt-5 flex items-center gap-3">
        {/* 사진 추가 버튼 */}
        <label className="flex items-center gap-2 cursor-pointer text-blue-500">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          사진 추가
        </label>
        {/* 위치 추가 버튼 */}
        <button
          className="text-blue-500 flex items-center gap-2"
          onClick={handleLocationButtonClick}
        >
          위치 추가
        </button>
      </div>

      {/* 업로드된 이미지 미리보기 */}
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
