# React Movie App 🎬

A modern, responsive movie discovery application built with React and Vite. Browse popular movies, search for your favorites, and create a personalized watchlist powered by The Movie Database (TMDB) API.

## ✨ Features

- 🎯 **Popular Movies**: Browse trending and popular movies on the homepage
- 🔍 **Movie Search**: Search for movies by title in real-time
- ❤️ **Favorites System**: Add and remove movies from your favorites collection
- 💾 **Local Storage**: Favorites are automatically saved to your browser's local storage
- 🎨 **Modern UI**: Clean and responsive design with smooth interactions
- 🚀 **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-movie/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure API Key:
   - Open `src/services/api.js`
   - Replace `<your_api_key_here>` with your TMDB API key:
   ```javascript
   const API_KEY = "your_actual_api_key_here"
   ```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## 📜 Available Scripts

- `npm run dev` - Start the development server with hot module replacement (HMR)
- `npm run build` - Build the app for production (outputs to `dist/` folder)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── MovieCard.jsx
│   │   └── NavBar.jsx
│   ├── contexts/        # React Context providers
│   │   └── MovieContext.jsx
│   ├── css/            # Stylesheet files
│   │   ├── App.css
│   │   ├── Home.css
│   │   ├── Favorites.css
│   │   ├── MovieCard.css
│   │   └── NavBar.css
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   └── Favorites.jsx
│   ├── services/       # API services
│   │   └── api.js
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **Vite 7** - Build tool and development server
- **The Movie Database (TMDB) API** - Movie data source
- **ESLint** - Code linting and quality assurance
- **CSS3** - Styling and responsive design

## 🎯 Key Features Explained

### Movie Context
The app uses React Context API to manage global state for favorites. Favorites are automatically synced with localStorage for persistence across sessions.

### Routing
- `/` - Home page with popular movies and search functionality
- `/favorites` - View all your favorited movies

### API Integration
The app integrates with TMDB API to fetch:
- Popular movies list
- Search results based on user queries

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Vite](https://vitejs.dev/) for the excellent development experience
