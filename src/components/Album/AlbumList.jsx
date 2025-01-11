import PropTypes from "prop-types";
import Album from "./Album"; // Import the new Album component

function AlbumList({ albums, onSetSelectedAlbum }) {
  return (
    <div className="album-list">
      {albums.map((album) => (
        <Album
          key={album.id}
          album={album}
          onSetSelectedAlbum={onSetSelectedAlbum} // Pass down the function
        />
      ))}
    </div>
  );
}

// Prop validation for the 'albums' and 'setSelectedAlbum' props
AlbumList.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired, // Ensures 'albums' prop is required

  onSetSelectedAlbum: PropTypes.func.isRequired, // Ensures 'setSelectedAlbum' is a function
};

export default AlbumList;
