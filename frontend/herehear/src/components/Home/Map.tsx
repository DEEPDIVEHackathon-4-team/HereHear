import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  search: string;
  posts: {
    latitude: number;
    longitude: number;
    title: string;
  }[]; // 게시물 데이터
  onPinClick: (latitude: number, longitude: number) => void;
}

export default function Map({ search, posts, onPinClick }: MapProps) {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const fetchCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
          },
          () => setCurrentLocation({ lat: 37.5665, lng: 126.978 }) // 기본 위치
        );
      } else {
        setCurrentLocation({ lat: 37.5665, lng: 126.978 }); // 기본 위치
      }
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (!currentLocation) return;

    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          currentLocation.lat,
          currentLocation.lng
        ),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      // 현재 위치 표시
      new window.kakao.maps.CustomOverlay({
        map,
        position: new window.kakao.maps.LatLng(
          currentLocation.lat,
          currentLocation.lng
        ),
        content: `<div style="width: 15px; height: 15px; background-color: red; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
        zIndex: 1,
      });

      // 게시물 데이터를 기반으로 마커 추가
      posts.forEach((post) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(post.latitude, post.longitude),
          map,
        });

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, "click", () => {
          onPinClick(post.latitude, post.longitude);
        });
      });

      if (search) {
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(search, (data: any[], status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const bounds = new window.kakao.maps.LatLngBounds();
            data.forEach((place) => {
              bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
            });
            map.setBounds(bounds);
          }
        });
      }
    };

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
  }, [currentLocation, posts, search, onPinClick]);

  return (
    <div className="w-full h-full">
      {!currentLocation && (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          현재 위치를 불러오는 중입니다...
        </div>
      )}
      <div id="map" className="w-full h-full" />
    </div>
  );
}
