import { useState } from "react";

const SearchBar = ({ onKeywordSubmit }) => {
  const [keyword, setKeyword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onKeywordSubmit(keyword);
  };

  const onInputChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="search-bar ui segment">
      <form className="ui form" onSubmit={onSubmitHandler}>
        <div className="field">
          <label>Video Search</label>
          <input type="text" onChange={onInputChangeHandler} />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
