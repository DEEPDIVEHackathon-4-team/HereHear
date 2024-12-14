import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface PostData {
  latitude: number;
  longitude: number;
}

interface MapProps {
  search: string;
  posts: PostData[];
  onPinClick: (latitude: number, longitude: number) => void; // 정확한 이벤트 형태
}

export default function Map({ posts, onPinClick }: MapProps) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 기본 위치
        level: 3, // 줌 레벨
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;

      // 게시물 위치에 마커 추가
      posts.forEach((post) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(post.latitude, post.longitude),
          map: map,
        });

        // 마커 클릭 이벤트 등록
        window.kakao.maps.event.addListener(marker, "click", () => {
          onPinClick(post.latitude, post.longitude); // latitude, longitude 전달
        });
      });
    };

    // Kakao Maps API 로드
    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP_API_KEY
      }&autoload=false&libraries=services`;
      script.onload = () => window.kakao.maps.load(loadKakaoMap);
      document.head.appendChild(script);
    }
  }, [posts, onPinClick]);

  return <div id="map" className="w-full h-full" />;
}
