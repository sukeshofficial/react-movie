# React Movie App 🎬

A modern, responsive full-stack movie discovery application built with React, Vite, and Express. Browse popular movies, search for your favorites, create a personalized watchlist, and authenticate using OAuth (GitHub and Google) - all powered by The Movie Database (TMDB) API.

## ✨ Features

- 🔐 **OAuth Authentication**: Sign in with GitHub or Google
- 🎯 **Popular Movies**: Browse trending and popular movies on the homepage
- 🔍 **Movie Search**: Search for movies by title in real-time
- ❤️ **Favorites System**: Add and remove movies from your favorites collection
- 💾 **Local Storage**: Favorites are automatically saved to your browser's local storage
- 🎨 **Modern UI**: Clean and responsive design with smooth interactions
- 🚀 **Fast Performance**: Built with Vite for lightning-fast development and builds
- 🔔 **Toast Notifications**: User-friendly notifications using react-hot-toast

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))
- GitHub OAuth App credentials ([Create one here](https://github.com/settings/developers))
- Google OAuth credentials ([Get one here](https://console.cloud.google.com/apis/credentials))

### Installation & Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-movie
```

#### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```bash
# Backend .env file
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Configure OAuth Applications:
   - **GitHub OAuth**: 
     - Go to [GitHub Developer Settings](https://github.com/settings/developers)
     - Create a new OAuth App
     - Set Authorization callback URL to: `http://localhost:4001/auth/github/callback`
     - Copy the Client ID and Client Secret to your `.env` file
   
   - **Google OAuth**:
     - Go to [Google Cloud Console](https://console.cloud.google.com/)
     - Create a new project or select an existing one
     - Enable Google+ API
     - Create OAuth 2.0 credentials
     - Set Authorized redirect URIs to: `http://localhost:4001/auth/google/callback`
     - Copy the Client ID and Client Secret to your `.env` file

5. Start the backend server:
```bash
node OAuth/index.js
```

The backend will run on `http://localhost:4001`

#### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory:
```bash
# Frontend .env file
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

#### 4. Access the Application

Open your browser and navigate to:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4001`

## 📜 Available Scripts

### Frontend Scripts

- `npm run dev` - Start the development server with hot module replacement (HMR)
- `npm run build` - Build the app for production (outputs to `dist/` folder)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

### Backend Scripts

- `node OAuth/index.js` - Start the Express backend server

## 📁 Project Structure

```
react-movie/
├── backend/
│   ├── OAuth/
│   │   └── index.js          # Express server with OAuth routes
│   ├── package.json
│   └── .env                  # Backend environment variables (create this)
│
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/           # Images and icons
│   │   ├── components/       # Reusable React components
│   │   │   ├── LogIn.jsx     # OAuth login component
│   │   │   ├── MovieCard.jsx # Movie card display component
│   │   │   └── NavBar.jsx    # Navigation bar component
│   │   ├── contexts/         # React Context providers
│   │   │   ├── AuthContext.jsx  # Authentication context
│   │   │   └── MovieContext.jsx # Movie favorites context
│   │   ├── css/              # Stylesheet files
│   │   │   ├── App.css
│   │   │   ├── Favorites.css
│   │   │   ├── Home.css
│   │   │   ├── index.css
│   │   │   ├── LogIn.css
│   │   │   ├── MovieCard.css
│   │   │   └── NavBar.css
│   │   ├── pages/            # Page components
│   │   │   ├── Favorites.jsx # Favorites page
│   │   │   └── Home.jsx     # Home page with movie search
│   │   ├── services/         # API services
│   │   │   └── api.js        # TMDB API integration
│   │   ├── App.jsx           # Main app component with routing
│   │   └── main.jsx          # Application entry point
│   ├── package.json
│   ├── vite.config.js
│   └── .env                  # Frontend environment variables (create this)
│
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **Vite 7** - Build tool and development server
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notification library
- **The Movie Database (TMDB) API** - Movie data source
- **ESLint** - Code linting and quality assurance
- **CSS3** - Styling and responsive design

### Backend
- **Express 5** - Web framework for Node.js
- **Axios** - HTTP client for OAuth requests
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 🎯 Key Features Explained

### Authentication System
The app uses OAuth 2.0 for authentication with GitHub and Google. The backend Express server handles the OAuth flow and stores user session data. The frontend uses React Context (`AuthContext`) to manage authentication state across the application.

### Movie Context
The app uses React Context API to manage global state for favorites. Favorites are automatically synced with localStorage for persistence across sessions.

### Routing
- `/auth` - Login page with OAuth options (GitHub and Google)
- `/` - Home page with popular movies and search functionality
- `/favorites` - View all your favorited movies

### API Integration
The app integrates with:
- **TMDB API**: Fetches popular movies and search results
- **GitHub OAuth API**: Handles GitHub authentication
- **Google OAuth API**: Handles Google authentication

## 🔧 Environment Variables

### Backend (.env in `backend/` directory)
```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Frontend (.env in `frontend/` directory)
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

**Note**: Make sure to add `.env` files to `.gitignore` to keep your credentials secure!

## 🚦 Running the Project

### Development Mode

1. **Start the Backend** (Terminal 1):
```bash
cd backend
node OAuth/index.js
```

2. **Start the Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

3. Open `http://localhost:5173` in your browser

### Production Build

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. The production build will be in the `frontend/dist/` directory

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Vite](https://vitejs.dev/) for the excellent development experience
- [GitHub](https://github.com/) and [Google](https://developers.google.com/) for OAuth authentication services
