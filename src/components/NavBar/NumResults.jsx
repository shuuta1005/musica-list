import PropTypes from "prop-types";

function NumResults({ albums }) {
  return (
    <p className="num-results">
      Found <strong>{albums.length}</strong> results
    </p>
  );
}
// Props validation for NumResults
NumResults.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      artists: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default NumResults;
