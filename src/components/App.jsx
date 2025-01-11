import { useState, useEffect, useCallback } from "react";
import NavBar from "./NavBar/Navbar";
import Search from "./NavBar/Search";
import NumResults from "./NavBar/NumResults";
import AlbumList from "./Album/AlbumList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import AlbumDetails from "./Album/AlbumDetails";
import RatedAlbumList from "./RatedAlbum/RatedAlbumList";

export default function App() {
  const [query, setQuery] = useState("");
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [tunes, setTunes] = useState([]);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(false);
  const [isLoadingTunes, setIsLoadingTunes] = useState(false);
  const [error, setError] = useState("");
  const [ratedAlbums, setRatedAlbums] = useState([]);

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  // Memoize getAccessToken to ensure it is stable
  const getAccessToken = useCallback(async () => {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Encode client ID and secret
      },
      body: "grant_type=client_credentials",
    });

    const data = await res.json();
    return data.access_token;
  }, [clientId, clientSecret]);

  // Fetch albums based on query
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchAlbums() {
      if (!query) return; // Skip if query is empty

      try {
        const token = await getAccessToken(); // Get access token
        setIsLoadingAlbums(true);
        setError("");
        const res = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            query
          )}&type=album`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: signal,
          }
        );

        if (!res.ok)
          throw new Error("Something went wrong while fetching albums");

        const data = await res.json();

        setAlbums(data.albums.items); // Set albums in state
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoadingAlbums(false);
      }
    }

    fetchAlbums();
    return function () {
      controller.abort();
    };
  }, [query, getAccessToken]); // Run effect when query changes

  //Fetch album tunes when clicked
  useEffect(() => {
    async function fetchSongs() {
      if (!selectedAlbum) return; // Don't fetch if no album is selected

      try {
        const token = await getAccessToken();
        setIsLoadingTunes(true);
        const res = await fetch(
          `https://api.spotify.com/v1/albums/${selectedAlbum.id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok)
          throw new Error("Something went wrong while fetching songs");
        const data = await res.json();

        if (data.Response === "False") throw new Error("Albums not found");

        setTunes(data.items); // Update the songs state with the album's tracks
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoadingTunes(false);
      }
    }
    fetchSongs();
  }, [selectedAlbum, getAccessToken]);

  //Handle close the movie details
  function handleCloseDetails() {
    setSelectedAlbum(null);
  }

  // Add album to rated albums list
  function onAddToAlbumList(album) {
    setRatedAlbums((ratedAlbums) => [...ratedAlbums, album]);
  }

  // Remove album from rated albums list
  const onRemoveFromList = (albumId) => {
    setRatedAlbums((prevRatedAlbums) =>
      prevRatedAlbums.filter((ratedAlbum) => ratedAlbum.album.id !== albumId)
    );
  };

  return (
    <div className="app-container">
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults albums={albums} />
      </NavBar>

      <div className="main-content">
        <div className="left-side">
          {isLoadingAlbums && <Loader />}
          {!isLoadingAlbums && !error && (
            <AlbumList albums={albums} onSetSelectedAlbum={setSelectedAlbum} />
          )}
          {error && <ErrorMessage message={error} />}
        </div>

        <div className="right-side">
          {selectedAlbum ? (
            <>
              <AlbumDetails
                album={selectedAlbum}
                tunes={tunes}
                onHandleCloseDetails={handleCloseDetails}
                onAddToAlbumList={onAddToAlbumList}
                ratedAlbums={ratedAlbums}
                onRemoveFromList={onRemoveFromList}
              />
              {isLoadingTunes && <Loader />}
            </>
          ) : (
            <RatedAlbumList
              ratedAlbums={ratedAlbums}
              onRemoveFromList={onRemoveFromList}
            />
          )}
        </div>
      </div>
    </div>
  );
}
