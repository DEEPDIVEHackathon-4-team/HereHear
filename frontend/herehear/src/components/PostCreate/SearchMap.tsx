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
      x: number;
      y: number;
      dong: string;
    }>
  >;
}

export default function Map({ search, setLocation }: MapProps) {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };
      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);

      // 지도를 클릭하면 좌표 업데이트
      window.kakao.maps.event.addListener(
        newMap,
        "click",
        (mouseEvent: any) => {
          const latlng = mouseEvent.latLng;

          // 좌표로 주소 변환
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(
            latlng.getLng(),
            latlng.getLat(),
            (result: any[], status: string) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0]?.address?.address_name || "";
                const dong = result[0]?.address?.region_3depth_name || "";
                setLocation({
                  name: "지도에서 선택된 위치",
                  address,
                  x: latlng.getLng(),
                  y: latlng.getLat(),
                  dong,
                });
              }
            }
          );
        }
      );
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

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(search, (data: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        data.forEach((place) => {
          new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          });
          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
        });

        map.setBounds(bounds);
      }
    });
  }, [search, map]);

  return <div id="map" className="w-full h-full rounded-md" />;
}
