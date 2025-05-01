# Debugging the TMDB API Integration

This document provides instructions on how to debug the TMDB API integration in the Popcorn Pick application.

## Setup

1. Make sure you have added your TMDB API key to the `.env` file:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
   ```

2. We've added a VS Code debugging configuration in `.vscode/launch.json` that allows you to debug the application in Chrome.

## Debugging Methods

### 1. Using VS Code Debugger

1. Start the development server:
   ```
   npm run dev
   ```

2. Set breakpoints in your code by clicking in the gutter next to line numbers in VS Code.

3. Press F5 or click the "Run and Debug" button in VS Code.

4. Select "Launch Chrome against localhost" from the dropdown menu.

5. Chrome will launch with the debugger attached, and execution will pause at your breakpoints.

6. You can inspect variables, step through code, and use the debug console.

### 2. Using Console Logs

We've added extensive console logging to the TMDB API integration:

- In `src/services/tmdbApi.ts`:
  - Logs API requests, URLs, and responses
  - Hides the API key in logs for security
  - Shows error details when API calls fail

- In `src/services/movieService.ts`:
  - Logs the recommendation process step by step
  - Shows input parameters and profile information
  - Displays genre filtering and sensitivity thresholds
  - Shows TMDB API parameters
  - Logs the final results

To view these logs:

1. Open your browser's developer tools (F12 or right-click > Inspect)
2. Go to the Console tab
3. Filter logs by typing "[TMDB" or "[Movie" in the filter box

### 3. Debugging API Calls

To specifically debug API calls:

1. In the browser's developer tools, go to the Network tab
2. Filter requests by typing "themoviedb" in the filter box
3. Click on a request to see details:
   - Request URL and parameters
   - Response data
   - Timing information

## Common Issues

1. **API Key Issues**: If you see 401 errors, check that your API key is correct in the `.env` file.

2. **Rate Limiting**: TMDB has rate limits. If you see 429 errors, you may need to wait before making more requests.

3. **No Results**: If you're not getting any results, check:
   - The filter parameters in the console logs
   - The API response in the Network tab
   - The fallback to mock data in the console logs

## Debugging Specific Components

### QuestionnairePage

- Check that the new filter options (rating and certification) are being correctly added to the answers object.
- Verify that the form submission is sending the correct data to the MoviesContext.

### MoviesContext

- Verify that the getRecommendations function is receiving the correct answers from the QuestionnairePage.
- Check that the selected profiles are being correctly passed to the fetchRecommendedMovies function.

### RecommendationsPage

- Verify that the recommended movies are being displayed correctly.
- Check that the movie details (including providers) are being displayed correctly.