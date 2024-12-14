import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { selectLocationState } from "../../recoil/locationState";

export default function Content({ onOpenMap }: { onOpenMap: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState("카테고리 선택");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  const categories = [
    { label: "사건사고", value: "ACCIDENT" },
    { label: "동네이벤트", value: "EVENT" },
    { label: "최근이슈", value: "RECENT_ISSUE" },
    { label: "분실/실종", value: "MISSING" },
  ];

  const navigate = useNavigate();
  const location = useRecoilValue(selectLocationState);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedCategory === "카테고리 선택" || !title || !contents) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!location.latitude || !location.longitude) {
      alert("위치를 선택해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const postData = {
        category: selectedCategory,
        title,
        userId: 1, // 실제 사용자 ID로 교체
        contents,
        latitude: location.latitude,
        longitude: location.longitude,
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(postData)], { type: "application/json" })
      );

    // 파일 키는 항상 추가 (없으면 빈 Blob 사용)
    if (uploadedImage) {
      formData.append("file", uploadedImage);
    } else {
      formData.append("file", new Blob(), "empty.jpg"); // 빈 파일 추가
    }

      await apiClient.post(`/api/v1/poster`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("게시글이 성공적으로 작성되었습니다.");
      navigate("/home");
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationButtonClick = () => {
    onOpenMap();
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
            <option key={index} value={category.value}>
              {category.label}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <textarea
          placeholder="내용을 입력하세요"
          className="text-[18px] w-full p-3 outline-none text-sm h-32"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
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
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded"
            className="w-full h-auto rounded-md"
          />
        </div>
      )}

      <div className="mt-5">
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-md"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "작성 중..." : "게시글 작성"}
        </button>
      </div>
    </div>
  );
}
