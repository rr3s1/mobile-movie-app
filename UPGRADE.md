# UPGRADE GUIDE

This document explains the current stack versions, environment variables, and practical steps to upgrade or maintain this app safely.

Project name: Movie Trophies (Expo Router)

## Versions (as of this repo)

- Expo SDK: ~53.0.17
- React Native: 0.79.5
- React: 19.0.0
- Expo Router: ~5.1.3 (experiments.typedRoutes = true)
- TypeScript: ~5.8.3
- NativeWind: ^4.1.23
- Tailwind CSS: ^3.4.17
- React Navigation (bottom-tabs): ^7.3.10
- react-native-appwrite: ^0.10.0
- ESLint: ^9.25.0

## Project structure highlights

- `app/` – Expo Router file-based routes (e.g., `_layout.tsx`, `index.tsx`, `onboarding.tsx`, tab routes under `(tabs)/`)
- `services/` – API modules
  - `services/api.ts` – TMDB integration
  - `services/appwrite.ts` – Trending storage using Appwrite Databases
- `components/` – UI components (`MovieCard.tsx`, `TrendingCard.tsx`, `SearchBar.tsx`)
- `tailwind.config.js` – Theme + NativeWind preset
- `app.json` – Expo config (icon, splash, web, plugins)

## Environment variables

Create a `.env.local` file at the project root (never commit secrets). The app reads the following variables:

```env
# TMDB
EXPO_PUBLIC_MOVIE_API_KEY=YOUR_TMDB_BEARER_TOKEN

# Appwrite
EXPO_PUBLIC_APPWRITE_PROJECT_ID=YOUR_APPWRITE_PROJECT_ID
EXPO_PUBLIC_APPWRITE_DATABASE_ID=YOUR_APPWRITE_DATABASE_ID
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=YOUR_APPWRITE_COLLECTION_ID
```

Notes:
- Endpoint in code is set to `https://cloud.appwrite.io/v1` (`services/appwrite.ts`).
- `EXPO_PUBLIC_` prefix exposes values to the client bundle. Use only non-secret values or scoped keys you are comfortable exposing.

## Scripts

- `npm start` – Start Expo
- `npm run android` / `npm run ios` / `npm run web` – Platform-specific
- `npm run lint` – ESLint

## Upgrade checklist

When upgrading any of Expo/React/React Native/Router/NativeWind/Appwrite, follow this checklist to minimize breakage:

1) Dependencies
- Update `expo`, `react`, `react-native`, `expo-router`, `react-native-reanimated`, `react-native-gesture-handler`, `nativewind`, `tailwindcss`, and `react-native-appwrite` in `package.json`.
- Run `npm install` and clear caches if needed: `npx expo start -c`.

2) Expo SDK and React Native compatibility
- Make sure `react-native`, `react`, and `expo` versions are compatible (see Expo release notes).
- Reanimated and gesture-handler must match RN/Expo versions.

3) Expo Router v5+ notes
- `experiments.typedRoutes` is enabled in `app.json`. After major upgrades, run `npx expo customize` if needed and check route types.
- Verify `_layout.tsx` and any `(tabs)/` routes still compile and navigate properly.

4) NativeWind/Tailwind
- Confirm `nativewind` preset is loaded in `tailwind.config.js` and `content` globs include `app/**/*` and `components/**/*`.
- If Tailwind breaks after upgrade, rebuild the Dev Server and ensure `globals.css` is loaded in the root layout if required by your setup.

5) Appwrite SDK
- Check `react-native-appwrite` changelog for any breaking changes to `Client`, `Databases`, `Query`, auth, or permission models.
- Validate your collection IDs and indexes; trending query depends on `Query.equal`, `Query.orderDesc`, `Query.limit`.

6) TMDB API
- Validate Bearer token usage and rate limits.
- `fetchMovieDetails` mixes `api_key` query param with Bearer header; modern TMDB usage typically relies on the Bearer token only. Unify approach during upgrades to avoid inconsistencies.

7) React 19 / RN 0.79 changes
- Re-check any deprecated lifecycle/hooks patterns in custom components.
- Ensure third-party libraries declare compatibility with React 19.

8) Build & run
- `npx expo start` and test:
  - Search screen (TMDB)
  - Trending (Appwrite) – verify create/update and ordered retrieval
  - Details page
  - Onboarding and tab navigation

9) Platform-specific testing
- Android: Verify gesture-handler and reanimated native builds if using dev clients.
- iOS: Validate splash/icon after upgrades; re-run prebuild for managed EAS builds if needed.

## Known pitfalls and recommendations

- Do not commit `.env` files. Treat any public keys as potentially exposed in client builds.
- If you switch Appwrite endpoint or self-host: update `services/appwrite.ts` and redeploy.
- If you remove `EXPO_PUBLIC_*` prefix, values will not be available at runtime on the client—plan a secure proxy or server-side action.
- Keep Reanimated at a version compatible with your Expo SDK; mismatches cause runtime errors.

## Migration examples

- Upgrading Expo 53 → 54 (example outline):
  1. Update `expo`, `react`, `react-native`, `expo-router` per Expo’s release table.
  2. Update `react-native-reanimated`, `react-native-gesture-handler`.
  3. Re-run: `npx expo start -c`.
  4. Verify routes, navigation, and animations.

- Refactoring TMDB auth to a single mechanism:
  - Prefer Bearer header for all endpoints.
  - Remove `api_key` query if duplicating auth.

- Hardening Appwrite trending:
  - Add index on `searchTerm` and `count`.
  - Consider user-scoped trending or time-decayed scores if needed.

## Post-upgrade validation

- Lint: `npm run lint`
- Basic E2E: manual search, open details, check trending ranking changes after repeated searches.
- Review bundle size and dev server logs for warnings.

---

If you need help executing a specific upgrade (Expo, RN, Router, or libraries), open an issue with your target versions and current errors/logs.
