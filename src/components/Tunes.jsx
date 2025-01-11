import PropTypes from "prop-types";

function Tunes({ tunes }) {
  return (
    <div className="tunes-section">
      <div className="tune-header">
        <span>Track</span>
        <span>Duration</span>
      </div>
      <div className="tune-list-container">
        <ul>
          {tunes.map((tune, index) => (
            <li key={index} className="tune-item">
              <span className="track-name">{tune.name}</span>
              <span className="track-duration">
                {(tune.duration_ms / 60000).toFixed(2)} min
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Prop validation for the 'tunes' prop
Tunes.propTypes = {
  tunes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Assuming id is a string
      name: PropTypes.string.isRequired, // Assuming name is a string
      duration_ms: PropTypes.number.isRequired, // Assuming duration_ms is a number
    })
  ).isRequired, // Ensures 'tunes' prop is required
};

export default Tunes;
