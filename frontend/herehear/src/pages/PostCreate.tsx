import Content from "../components/PostCreate/Content";
import Header from "../components/PostCreate/Header";
import SearchMap from "../components/PostCreate/SearchMap";
import { useState } from "react";

export default function BoardCreate() {
  const [isMapVisible, setIsMapVisible] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Content onOpenMap={() => setIsMapVisible(true)} />
      {isMapVisible && <SearchMap onClose={() => setIsMapVisible(false)} />}
    </div>
  );
}
