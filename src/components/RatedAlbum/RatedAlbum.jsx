import PropTypes from "prop-types";

function RatedAlbum({ album, rating, onRemoveFromList }) {
  return (
    <div className="rated-album">
      <img
        src={album.images[0]?.url}
        alt={`${album.name} cover`}
        className="rated-album-image"
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
      />
      <div className="rated-album-info">
        <p>{album.name}</p>
        <p>Rating: {rating} ★</p>
        <button
          onClick={() => onRemoveFromList(album.id)}
          className="btn-delete"
        >
          X
        </button>
      </div>
    </div>
  );
}

RatedAlbum.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  rating: PropTypes.number.isRequired,
  onRemoveFromList: PropTypes.func.isRequired,
};

export default RatedAlbum;
