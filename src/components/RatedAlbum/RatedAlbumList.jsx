import PropTypes from "prop-types";
import RatedAlbum from "./RatedAlbum";

function RatedAlbumList({ ratedAlbums, onRemoveFromList }) {
  return (
    <div className="rated-album-list">
      {ratedAlbums.length > 0 ? (
        ratedAlbums.map((ratedAlbum) => (
          <RatedAlbum
            key={ratedAlbum.album.id}
            album={ratedAlbum.album}
            rating={ratedAlbum.rating}
            onRemoveFromList={onRemoveFromList}
          />
        ))
      ) : (
        <p>No albums rated yet.</p>
      )}
    </div>
  );
}

RatedAlbumList.propTypes = {
  ratedAlbums: PropTypes.arrayOf(
    PropTypes.shape({
      album: PropTypes.object.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveFromList: PropTypes.func.isRequired,
};

export default RatedAlbumList;
