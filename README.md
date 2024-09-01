<div align="center">
  <a href="" target="_blank">
    <img src="https://github.com/Amritanshu312/Taro/blob/main/public/images/logo.png" alt="Logo" width="140" height="140">
  </a>

  <h2 align="center">Taro</h3>

  <p align="center">
    An open-source Anime streaming site built with Nextjs 14
  </p>
</div>

# About the Project

Experience uninterrupted, ad-free streaming with seamless progress tracking thanks to AniList integration, powered by the Consumet API. Our platform, built using Next.js 14, Nextui, MongoDB, and Redis, ensures a smooth and enjoyable user experience.

## :sparkles: Features

- [x] `Search`: Get a list of all animes and mangas you want using filters.
- [x] `Watch`: Stream any available episode, whether dubbed or subbed.
- [x] `Comment`: Share your thoughts on episodes or provide helpful information for others.
- [x] `Log In`: Sign in with your AniList account (note: some restrictions may apply).
- [x] `AniList Integration`: Seamlessly sync your AniList account to carry over settings and animes.
- [x] `Keep Watching`: Resume episodes from where you left off with local tracking.
- [x] `Track Your Favorites`: Organize your animes and mangas into Completed, Dropped, Planning, and more.
- [x] `Episode Tracking`: Mark episodes you've watched and pick up where you left off.
- [x] `Effortless Search`: Quickly search for any anime with ease.
- [x] `Modern Video Player`: Enjoy a sleek and up-to-date video player experience.
- [x] `Fully Responsive`: Access and enjoy your content on all devices.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
# Base URL for your application
NEXT_PUBLIC_URL=http://localhost:3000
# Replace with your website URL if deployed, otherwise keep localhost with your port.
# Ensure there is no trailing slash ("/") at the end.

# Consumet API URL
NEXT_PUBLIC_CONSUMET_URL=
# Add the URL for your Consumet API here. This is required for your website to function correctly.

# AniList API Configuration
GRAPHQL_ENDPOINT=https://graphql.anilist.co
ANILIST_CLIENT_ID=
# Obtain your AniList Client ID from: https://anilist.co/settings/developer
ANILIST_CLIENT_SECRET=
# Obtain your AniList Client Secret from: https://anilist.co/settings/developer

# NextAuth Configuration
NEXTAUTH_SECRET=
# Generate a secret for NextAuth using the following command:
# openssl rand -base64 32
# Paste the result here.

NEXTAUTH_URL=http://localhost:3000
# Replace with your website URL if deployed, otherwise keep localhost with your port.
# Ensure there is no trailing slash ("/") at the end.

# MongoDB Connection URI
MONGODB_URI=
# Provide your MongoDB connection string here.

# Node Environment
NODE_ENV=production
# Set the environment for Node.js. Typical values are "development" or "production".
```

## 📚: Tecnologies Used

Front-end:

- `Next.js`
- `Javascript`
- `Axios`
- `Context API`
- `react-icons`
- `GraphQL`
- `Framer Motion`
- `React Progress Bar`
- `Anilist API`
- `Consumet API`
- `Redis IO`
- `Disqus`
- `Artplayer`

Back-End:

- `Mongoose`
- `Next.js (API) Route Handler`

## Run Locally

Clone the project

```bash
  git clone https://github.com/Amritanshu312/Taro.git
```

Go to the project directory

```bash
  cd taro
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## :camera: Preview/Screenshots

### Home

![Home page](https://github.com/Amritanshu312/Taro/blob/main/public/website%20image/home.png)

<br />
<br />

---

<br />

### Watch Page

![Watch Page](https://github.com/Amritanshu312/Taro/blob/main/public/website%20image/watch.png)

<br />
<br />

---

<br />

### Catalog Page

![Catalog Page](https://github.com/Amritanshu312/Taro/blob/main/public/website%20image/catalog.png)

<br />
<br />

---

<br />

### Profile Page

![Profile Page](https://github.com/Amritanshu312/Taro/blob/main/public/website%20image/profile.png)

<br />
<br />

---

<br />

### Statistics Page

![Statistics Page](https://github.com/Amritanshu312/Taro/blob/main/public/website%20image/statistics.png)

---

<br />

### 404 Page

![Watchlist Page 1](https://github.com/Amritanshu312/Taro/blob/main/public/website%20image/404.png)
