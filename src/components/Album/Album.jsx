import PropTypes from "prop-types";

function Album({ album, onSetSelectedAlbum }) {
  return (
    <div
      className="album-item"
      onClick={() => onSetSelectedAlbum(album)} // Trigger the selected album event
    >
      <img
        src={album.images[0]?.url}
        alt={`${album.name} cover`}
        className="album-cover"
      />
      <h3>{album.name}</h3>
      <p>{album.artists[0].name}</p>
    </div>
  );
}

// Prop validation for the 'album' and 'onSetSelectedAlbum' props
Album.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired, // Assuming `id` is a string
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired, // Assuming `url` is a string (album cover image)
      })
    ).isRequired,
    name: PropTypes.string.isRequired, // Assuming `name` is a string (album name)
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired, // Assuming `name` is a string (artist's name)
      })
    ).isRequired,
  }).isRequired, // Ensures 'album' prop is required

  onSetSelectedAlbum: PropTypes.func.isRequired, // Ensures 'setSelectedAlbum' is a function
};

export default Album;
