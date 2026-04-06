# Decision Log — DevNest Frontend

## Architecture Decisions

### React + Vite over Next.js
Chose Vite for faster development builds and simpler SPA setup. Next.js SSR was not needed since all routes are protected and data is user-specific.

### Redux Toolkit for Auth State
Used Redux Toolkit only for authentication state (user, token, isAuthenticated). All server state is handled by React Query to avoid over-engineering.

### TanStack React Query for Server State
React Query handles all API calls, caching, and refetching. Mutations are organized in a separate mutations/ folder. GET queries are in hooks/ folder — one file per collection.

### Formik + Yup for Forms
All forms use Formik with Yup validation schemas defined inside entity classes. This keeps validation co-located with the data model.

### OOP API Layer with BaseApi
All API classes extend a BaseApi class that automatically injects the JWT token from Redux store into every request. This avoids repeating auth logic across files.

### Video Streaming via Proxy
The video player points to our own backend stream endpoint instead of Cloudinary directly. JWT token is passed as a query parameter since video src cannot have custom headers.

### Progress Tracking Strategy
Watch progress is saved every 5 seconds of actual watch time using a ref-based counter instead of debouncing timeupdate events. This prevents the debounce from being reset on every event.

## Where AI Was Used
- Component structure planning
- Tailwind class combinations for dark theme UI
- React Query select pattern for enrollment check
- FFmpeg path debugging guidance

## What I Would Improve With More Time
- Add Stripe.js frontend SDK for real payment confirmation
- Add video chapter markers with timestamp navigation
- Add course search with debounced API calls
- Add skeleton loaders for better UX
- Add PWA support for mobile
- Write Jest unit tests for mutations and hooks