import PropTypes from "prop-types";

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search albums..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

// Props validation
Search.propTypes = {
  query: PropTypes.string.isRequired, // query must be a string
  setQuery: PropTypes.func.isRequired, // setQuery must be a function
};

export default Search;
