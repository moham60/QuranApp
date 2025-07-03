import { useSelector } from "react-redux";
import Nav from "../Navbar/Navbar";
import { Outlet } from "react-router";
import BookMarkModal from "../ModalBookMark/BookMarkModal";

export default function Layout() {
  const { isOpenBookMark} =
    useSelector((state) => state.Quran);
  return (
    <div className="relative">
      
      <Nav />
      <Outlet />
      {isOpenBookMark && (
        <BookMarkModal
          isopen={isOpenBookMark}
        />
      )}
     
    </div>
  );
}
