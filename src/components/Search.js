import React, { useState } from "react";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
  }

  return (
      <form className="search flex-center">
        <input
          className="border-radius"
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" placeholder="search show titles" value="Search" className="border-radius"/>
      </form>
    );
}

export default Search;