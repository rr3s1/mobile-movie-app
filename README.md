
<div align="center">
  <br />
  <a href="#" target="_blank">
    <img width="200" height="200" alt="logo" src="./assets/images/logo.png" />
  </a>
  <br />
  <br />
  <div>
    <img src="https://img.shields.io/badge/-Expo-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" alt="expo" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h1 align="center">Movie Trophies - React Native App</h1>
  <div align="center">
    <img width="506" height="502" alt="app-preview" src="https://github.com/user-attachments/assets/e5bb7f8a-d2fe-45a7-b743-5cb244c04cf7" />
  </div>
</div>

<div align="center">
  <br />
  <a href="#" target="_blank">Project Demo (TBD)</a>
  <br />

</div>
<br />

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🔗 [Assets](#links)
7. 🚀 [More](#more)

## 🚨 Tutorial

This repository contains the source code for a React Native movie discovery app built with Expo Router, TMDB API, Appwrite, and NativeWind/Tailwind.

If you prefer visual learning, feel free to record or link a walkthrough later and place it above under Project Video.

## <a name="introduction">🤖 Introduction</a>

Discover and track movies from TMDB with lightning-fast search, trending insights backed by Appwrite, and a clean, modern UI. Built with Expo SDK 53, React Native 0.79, React 19, TypeScript, and NativeWind for rapid development and theming.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Expo + Expo Router
- React Native, React 19
- TypeScript
- NativeWind + Tailwind CSS
- Appwrite (cloud)
- React Navigation (bottom tabs)

## <a name="features">🔋 Features</a>

👉 **Movie Search (TMDB)**: Find movies via TMDB using `EXPO_PUBLIC_MOVIE_API_KEY`.

👉 **Trending Movies (Appwrite)**: Tracks popular searches and displays top 5 results stored in Appwrite collection.

👉 **Movie Details Page**: Title, poster, and metadata fetched from TMDB.

👉 **Onboarding + Tabs**: Expo Router layout with tabs and onboarding screen.

👉 **NativeWind/Tailwind Styling**: Centralized theme in `tailwind.config.js`.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to run the app locally.

**Prerequisites**

- Git
- Node.js (18+ recommended)
- npm
- An account on [TMDB](https://www.themoviedb.org/) to obtain an API key
- An [Appwrite](https://appwrite.io/) project (cloud or self-hosted)

**Clone and install**

```bash
git clone https://github.com/rr3s1/mobile-movie-app.git
cd mobile-movie-app
npm install
```

**Environment Variables**

Create `.env.local` in the project root with:

```env
# TMDB
EXPO_PUBLIC_MOVIE_API_KEY=YOUR_TMDB_BEARER_TOKEN_OR_KEY

# Appwrite
EXPO_PUBLIC_APPWRITE_PROJECT_ID=YOUR_APPWRITE_PROJECT_ID
EXPO_PUBLIC_APPWRITE_DATABASE_ID=YOUR_APPWRITE_DATABASE_ID
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=YOUR_APPWRITE_COLLECTION_ID
```

Notes:
- The Appwrite endpoint is set to `https://cloud.appwrite.io/v1` in `services/appwrite.ts`.
- For TMDB, the code uses the value as a Bearer token in the `Authorization` header.

**Start the app**

```bash
npx expo start
```

Open in:

- Development build
- Android emulator
- iOS simulator
- Expo Go

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>services/api.ts</code> (TMDB)</summary>

```ts
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const res = await fetch(endpoint, { method: "GET", headers: TMDB_CONFIG.headers });
  if (!res.ok) throw new Error(`Failed to fetch movies: ${res.statusText}`);
  const data = await res.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  const res = await fetch(
    `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
    { method: "GET", headers: TMDB_CONFIG.headers }
  );
  if (!res.ok) throw new Error(`Failed to fetch movie details: ${res.statusText}`);
  return res.json();
};
```

</details>

<details>
<summary><code>services/appwrite.ts</code> (Trending storage)</summary>

```ts
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("searchTerm", query),
  ]);

  if (result.documents.length > 0) {
    const existing = result.documents[0];
    await database.updateDocument(DATABASE_ID, COLLECTION_ID, existing.$id, {
      count: existing.count + 1,
    });
  } else {
    await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      searchTerm: query,
      movie_id: movie.id,
      title: movie.title,
      count: 1,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    });
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
```

</details>

## <a name="links">🔗 Assets</a>

- App icon/logo: `assets/images/logo.png`
- Tailwind theme: `tailwind.config.js`


## 🤝 Acknowledgments

Adrian Hajdin: For the comprehensive tutorial and
guidance. [JavaScript Mastery](https://www.youtube.com/watch?v=kt0FrkQgw8w&t=3910s&ab_channel=JavaScriptMastery).

## 📄 License

This project is licensed under the MIT License.

Note: This project is for educational purposes and is free to use under the terms of the MIT License.


## <a name="more">🚀 More</a>

**Advance your skills with Next.js Pro Course**

Enjoyed creating this project? Dive deeper into our PRO courses for a richer learning adventure. They're packed with
detailed explanations, cool features, and exercises to boost your skills. Give it a go!

<a href="https://jsmastery.pro/next15" target="_blank">
   <img src="https://github.com/user-attachments/assets/b8760e69-1f81-4a71-9108-ceeb1de36741" alt="Project Banner">
</a>
