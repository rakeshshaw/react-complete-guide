import { FETCH_BOOKDETAIL, FETCH_BOOKLIST } from "./types";

export const fetchBookList = () => {
  const bookList = [
    { title: "JAVASCRIPT" },
    { title: "JAVA" },
    { title: "C++" },
    { title: "PHP" },
  ];
  return {
    type: FETCH_BOOKLIST,
    payload: bookList
  };
};

// Action Creator
// export const fetchBookList = () => async (dispatch) => {
//   const bookList = await [
//     { title: "JAVASCRIPT" },
//     { title: "JAVA" },
//     { title: "C++" },
//     { title: "PHP" },
//   ];
//   dispatch({ type: FETCH_BOOKLIST, payload: bookList });
// };

export const fetchBookDetail = (book) => {
    return {
        type: FETCH_BOOKDETAIL,
        payload: book
    }
};
