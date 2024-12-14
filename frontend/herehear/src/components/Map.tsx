import { useEffect } from "react";

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

const Map = ({ search, setLocation }: MapProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();

        if (search) {
          const ps = new window.kakao.maps.services.Places();
          ps.keywordSearch(search, (data: any[], status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const place = data[0];
              const position = new window.kakao.maps.LatLng(place.y, place.x);
              map.setCenter(position);

              geocoder.coord2RegionCode(
                place.x,
                place.y,
                (
                  result: kakao.maps.services.RegionCode[] | undefined,
                  status: kakao.maps.services.Status
                ) => {
                  if (status === kakao.maps.services.Status.OK && result) {
                    const dongName = result[0]?.region_3depth_name || ""; // 동 이름
                    setLocation({
                      name: place.place_name,
                      address: place.road_address_name || place.address_name,
                      x: parseFloat(place.x),
                      y: parseFloat(place.y),
                      dong: dongName,
                    });
                  }
                }
              );
            }
          });
        }
      });
    };

    document.head.appendChild(script);
  }, [search, setLocation]);

  return <div id="map" className="w-full h-full rounded-md border" />;
};

export default Map;
