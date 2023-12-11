// import { useState } from "react";
import PropTypes from "prop-types";
import css from "./SearchBar.module.css";

function SearchBar(props) {
  // function handleKeyUp(event) {
  //   if (event.code === "Enter") {
  //     props.onSubmit(event.target.value);
  //   }
  // }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchText = form.elements.searchInput.value;

    if (searchText === "") {
      alert("search text - empty field.\nComplete the missing data.");
    } else {
      props.onSubmit(searchText, 1);
      form.reset();
    }
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.SearchFormButton}
        >
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="searchInput"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
