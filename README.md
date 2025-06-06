# Recipe Explorer

A responsive and accessible web application for exploring recipes using TheMealDB API.

## Features

- Home page displaying a list of recipes fetched from TheMealDB API
- Recipe detail page showing comprehensive information about selected recipes
- Search functionality to find recipes by name
- Loading and error states for all data fetching operations
- Feedback form allowing users to submit comments on recipes
- Fully responsive design that works on mobile, tablet, and desktop
- Accessible UI components

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- React Query (TanStack Query) for data fetching and state management
- Axios for API requests

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd recipe-explorer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Integration

This application uses [TheMealDB API](https://www.themealdb.com/api.php) to fetch recipe data. The free tier of the API is used which provides access to:

- Search recipes by name
- Lookup recipe details by ID
- Filter recipes by category, area, and first letter

## Project Structure

- `src/app/`: Contains the Next.js application code
  - `components/`: Reusable UI components
  - `hooks/`: Custom React hooks
  - `lib/`: Utility functions and API client
  - `types/`: TypeScript type definitions
  - `page.tsx`: Home page with recipe listings
  - `recipe/[id]/page.tsx`: Recipe detail page

## Assumptions Made

1. The feedback form data is not actually submitted to any backend service since TheMealDB API doesn't support this. Instead, it uses a mock implementation that simulates a successful submission.

2. The application uses the free tier of TheMealDB API which has some limitations:
   - Only a limited set of recipes is available
   - Some recipes might have incomplete data

3. Error handling is implemented for all API requests to provide a good user experience when issues occur.

4. The application is designed to be responsive and work well on various screen sizes.

## Future Improvements

- Add recipe filtering by category and cuisine
- Implement user authentication to save favorite recipes
- Add unit and integration tests
- Implement server-side rendering for improved SEO
- Add a recipe rating system with persistent storage
