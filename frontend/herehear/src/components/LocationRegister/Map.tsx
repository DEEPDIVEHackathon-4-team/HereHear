import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  search: string;
  setLocation: React.Dispatch<
    React.SetStateAction<{
      name: string;
      address: string;
      latitude: number;
      longitude: number;
      dong: string;
    }>
  >;
}

export default function Map({ search, setLocation }: MapProps) {
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 기본 위치: 서울
        level: 3,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);

      // 마커 생성
      const kakaoMarker = new window.kakao.maps.Marker({
        position: kakaoMap.getCenter(), // 초기 지도 중심 위치
        map: kakaoMap,
        draggable: true, // 드래그 가능
      });
      setMarker(kakaoMarker);

      // 지도 이동 이벤트
      window.kakao.maps.event.addListener(kakaoMap, "dragend", () => {
        const center = kakaoMap.getCenter();
        kakaoMarker.setPosition(center); // 마커를 지도 중심으로 이동
        updateLocation(center.getLat(), center.getLng());
      });

      // 마커 드래그 종료 이벤트
      window.kakao.maps.event.addListener(kakaoMarker, "dragend", () => {
        const position = kakaoMarker.getPosition();
        updateLocation(position.getLat(), position.getLng());
      });

      // 현재 위치 설정
      getCurrentLocation(kakaoMap, kakaoMarker);
    };

    const getCurrentLocation = (kakaoMap: any, kakaoMarker: any) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const currentPosition = new window.kakao.maps.LatLng(
              latitude,
              longitude
            );
            kakaoMap.setCenter(currentPosition);
            kakaoMarker.setPosition(currentPosition);
            updateLocation(latitude, longitude);
          },
          () => {
            console.error("현재 위치를 불러올 수 없습니다.");
          }
        );
      }
    };

    const updateLocation = (lat: number, lng: number) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(lng, lat, (result: any[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0]?.address?.address_name || "";
          const dong = result[0]?.address?.region_3depth_name || ""; // 기본값 설정
          setLocation({
            name: "선택된 위치",
            address,
            latitude: lat,
            longitude: lng,
            dong: dong || "", // undefined일 경우 빈 문자열
          });
        }
      });
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
  }, [setLocation]);

  useEffect(() => {
    if (!map || !search) return;

    // 장소 검색
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(search, (data: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const place = data[0]; // 첫 번째 검색 결과를 사용
        if (!place) return;

        const position = new window.kakao.maps.LatLng(place.y, place.x);

        // 지도 중심 이동 및 마커 업데이트
        map.setCenter(position);
        if (marker) {
          marker.setPosition(position);
        }

        // 좌표로 주소 변환
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          place.x,
          place.y,
          (result: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0]?.address?.address_name || "";
              const dong = result[0]?.address?.region_3depth_name || "";
              setLocation({
                name: place.place_name,
                address,
                latitude: parseFloat(place.y),
                longitude: parseFloat(place.x),
                dong: dong || "", // undefined일 경우 빈 문자열
              });
            }
          }
        );
      }
    });
  }, [search, map, marker, setLocation]);

  return <div id="map" className="w-full h-full" />;
}
