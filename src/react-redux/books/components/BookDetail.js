import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBookDetail } from "../actions";

const BookDetail = ({ activeBook, fetchBookDetail }) => {
  useEffect(() => {
    fetchBookDetail(activeBook);
    console.log("....."+activeBook);
  }, []);

  const renderBookDetails = () => {
    if (!activeBook) return;
    return (
      <div>
        <h1>{activeBook.title}</h1>
      </div>
    );
  };

  return <div>{activeBook && renderBookDetails()}</div>;
};

const mapStateToProps = (state) => {
  console.log(state);
  return { activeBook: state.books.activeBook };
};

export default connect(mapStateToProps, { fetchBookDetail })(BookDetail);
