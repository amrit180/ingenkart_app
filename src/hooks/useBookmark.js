import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setBookmark } from "../redux/userSlice";

const useBookmark = () => {
  let dispatch = useDispatch();
  async function getbookmark() {
    try {
      const hasBookmark = await AsyncStorage.getItem("@bookmark");
      if (hasBookmark === null) {
        return [];
      }
      dispatch(setBookmark({ wishlist: JSON.parse(hasBookmark) }));
      return JSON.parse(hasBookmark);
    } catch (error) {
      return [];
    }
  }
  async function storeBookmark(book) {
    try {
      const hasBookmark = await AsyncStorage.getItem("@bookmark");
      let arr = [];
      if (hasBookmark === null) {
        arr = [book];
        dispatch(setBookmark({ wishlist: arr }));
        await AsyncStorage.setItem("@bookmark", JSON.stringify(arr));
      } else {
        let data = JSON.parse(hasBookmark);
        // console.log(data?.filter((v) => v?._id == book?._id)?.length);
        if (data?.filter((v) => v._id == book._id)?.length == 0) {
          arr = [...data, book];
          dispatch(setBookmark({ wishlist: arr }));
          await AsyncStorage.setItem("@bookmark", JSON.stringify(arr));
        } else {
          let data = JSON.parse(hasBookmark);
          arr = data.filter((v) => v?._id !== book?._id);
          dispatch(setBookmark({ wishlist: arr }));
          await AsyncStorage.setItem("@bookmark", JSON.stringify(arr));
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async function removeAllBookmarks() {
    dispatch(setBookmark({ wishlist: [] }));
    await AsyncStorage.removeItem("@bookmark");
  }

  return {
    getbookmark,
    storeBookmark,
    removeAllBookmarks,
  };
};

export default useBookmark;
