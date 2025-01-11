# React + Vite Album Search and Rating App 🎵

A React.js application built with Vite that allows users to search for music albums using the Spotify API, view album details, and maintain a personal list of rated albums.

## Features 🌟
- **Search Albums**: Enter a query to search for albums via Spotify's API.
- **View Album Details**: Select an album to see its tracks and additional information.
- **Rate and List Albums**: Add albums to your personal rated list or remove them as needed.

## Tech Stack 🛠️
- **Frontend**: React.js with Vite
- **API**: Spotify Web API
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`)
- **Environment Variables**: Managed securely with `.env` files

## Prerequisites 🚀
1. **Node.js** installed on your system.
2. Spotify API credentials (Client ID and Client Secret).

## Setup Instructions 🖥️
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/album-search-rating-app.git
   cd album-search-rating-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root and add your Spotify API credentials:
   ```env
   VITE_SPOTIFY_CLIENT_ID=your_client_id
   VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage 🎉
1. Search for albums by typing keywords into the search bar.
2. Click an album to view its details and tracks.
3. Add albums to your rated list and manage them in the sidebar.

## Project Structure 🗂️
```
src/
├── Album/             # Components for album details and album list
├── NavBar/            # Navigation bar components including search
├── RatedAlbum/        # Components for rated album list
├── Loader.jsx         # Loader component for async actions
├── ErrorMessage.jsx   # Error message display
├── App.jsx            # Main application logic
```

## Demo Screenshots 📸
<img width="1440" alt="Screenshot 2025-01-11 at 9 50 04 PM" src="https://github.com/user-attachments/assets/af4a912a-31f8-41b6-8fd3-dec409e9681d" />



## Future Enhancements 🚀
- User authentication to save rated albums across devices.
- Search filters for genre, year, or artist.
- Integration with other music APIs for enhanced search results.
