import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Tunes from "../Tunes";

function AlbumDetails({
  album,
  tunes,
  onHandleCloseDetails,
  onAddToAlbumList,
  ratedAlbums,
}) {
  const [rating, setRating] = useState(0); // Rating state

  // Calculate total duration in minutes
  const totalDuration =
    tunes.reduce((sum, tune) => sum + tune.duration_ms, 0) / 60000;

  const isRated = ratedAlbums
    .map((ratedAlbum) => ratedAlbum.key)
    .includes(album.id);

  console.log(isRated);

  function handleAdd() {
    const newRatedAlbum = {
      key: album.id,
      album: album,
      rating: rating,
      title: album.title,
    };
    onAddToAlbumList(newRatedAlbum);
    onHandleCloseDetails();
  }

  // Ensure album and album.title are valid before setting the document title
  useEffect(() => {
    if (album && album.name) {
      // Set the page title dynamically based on album title
      document.title = album.name;
    } else {
      // Optional fallback title when album.title is not available
      document.title = "Album Details";
    }

    return function () {
      document.title = "álbumList";
    };
  }, [album]); // Only re-run when `album` prop changes

  return (
    <div className="album-details">
      <button className="btn-back" onClick={onHandleCloseDetails}>
        &larr;
      </button>

      {album.images && album.images.length > 0 && (
        <img
          src={album.images[0].url}
          alt={`${album.name} cover`}
          className="album-image"
          style={{
            width: "200px",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        />
      )}

      <h2>{album.name}</h2>
      <p>
        <strong>Artist:</strong>{" "}
        {album.artists.map((artist) => artist.name).join(", ")}
      </p>
      <p>
        <strong>Release Date:</strong> {album.release_date}
      </p>
      <p>
        <strong>Total Tracks:</strong> {album.total_tracks}
      </p>
      <p>
        <strong>Total Duration:</strong> {totalDuration.toFixed(2)} minutes
      </p>

      <div className="rating-section">
        {!isRated ? (
          <>
            <p>
              <strong>Rate this Album:</strong>
            </p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? "filled" : ""}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </>
        ) : (
          <p className="already-rated-msg">You have rated this album already</p>
        )}
      </div>

      {rating > 0 && (
        <button className="btn-add-album" onClick={handleAdd}>
          Add to Album List
        </button>
      )}

      <Tunes tunes={tunes} />
    </div>
  );
}

AlbumDetails.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired, // Validation for 'id'
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    release_date: PropTypes.string.isRequired,
    total_tracks: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ), // Optional, array of images
  }).isRequired,
  tunes: PropTypes.arrayOf(
    PropTypes.shape({
      duration_ms: PropTypes.number.isRequired,
    })
  ).isRequired,
  onHandleCloseDetails: PropTypes.func.isRequired,
  onAddToAlbumList: PropTypes.func.isRequired,
  ratedAlbums: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired, // Validation for 'key'
      album: PropTypes.object.isRequired, // 'album' is required to be an object
      rating: PropTypes.number.isRequired, // Rating should be a number
    })
  ).isRequired,
};

export default AlbumDetails;
