import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBookList, fetchBookDetail } from "../actions";

const BookList = ({ booksList, fetchBookList, fetchBookDetail }) => {
  useEffect(() => {
    fetchBookList();
  }, []);

  const renderContent = () => {
    if (!booksList) return;
    return booksList.map((book) => {
      return (
        <li
          key={book.title}
          onClick={() => fetchBookDetail(book)}
          className="list-group-item"
        >
          {book.title}
        </li>
      );
    });
  };
  return (
    <div>
      <h1>{booksList && renderContent()}</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  // whatever we return will show up as props inside BookList
  return { booksList: state.books.bookList };
};

export default connect(mapStateToProps, { fetchBookList, fetchBookDetail })(BookList);
