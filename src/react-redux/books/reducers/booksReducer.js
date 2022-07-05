import { FETCH_BOOKLIST, FETCH_BOOKDETAIL } from "../../books/actions/types";

// const BOOKS = [
//   { title: "JAVASCRIPT" },
//   { title: "JAVA" },
//   { title: "C++" },
//   { title: "PHP" },
// ];

const INITIAL_STATE = {
  bookList: [],
  activeBook: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BOOKLIST:
      return { ...state, bookList: action.payload };
    case FETCH_BOOKDETAIL:
      return { ...state, activeBook: action.payload };
    default:
      return state;
  }
};
