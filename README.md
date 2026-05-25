# Book Management System

A modern, clean, and production-ready book management application built with React, TypeScript, Vite, Tailwind CSS, and Axios.

## Features

- ✅ **View all books** - Browse your entire book collection
- ✅ **Add new books** - Create new book entries with title, author, genre, and publication year
- ✅ **Edit books** - Update existing book information
- ✅ **Delete books** - Remove books with confirmation dialog
- ✅ **Search functionality** - Search books by title or author in real-time
- ✅ **Genre filtering** - Filter books by genre
- ✅ **Loading states** - Skeleton loaders for better UX
- ✅ **Error handling** - User-friendly error messages
- ✅ **Empty states** - Clear feedback when no data is available
- ✅ **Responsive design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **TypeScript** - Full type safety
- ✅ **Modern UI** - Clean, minimal design with subtle shadows and neutral colors

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Hooks** - State management

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── BookCard.tsx
│   ├── BookForm.tsx
│   ├── Button.tsx
│   ├── DeleteConfirmation.tsx
│   ├── EmptyState.tsx
│   ├── ErrorAlert.tsx
│   ├── GenreFilter.tsx
│   ├── Loading.tsx
│   ├── Modal.tsx
│   ├── SearchBar.tsx
│   └── index.ts
├── hooks/               # Custom React hooks
│   └── useBooks.ts
├── pages/               # Page components
│   └── BooksPage.tsx
├── services/            # API services
│   └── bookApi.ts
├── types/               # TypeScript types/interfaces
│   └── index.ts
├── App.tsx
├── main.tsx
├── index.css
.env
.env.example
index.html
package.json
postcss.config.js
tailwind.config.js
tsconfig.json
vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- A MockAPI account (or similar REST API service)

### Installation

1. **Clone or setup the project:**

   ```bash
   cd BookManagement
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Setup environment variables:**

   ```bash
   # Copy the example file
   cp .env.example .env
   ```

4. **Update `.env` with your MockAPI base URL:**

   **Important:** Use only the base path, NOT including `/books`

   ```env
   VITE_API_BASE_URL=https://your-project-id.mockapi.io/your-api-path
   ```

   Example: `https://6a147a976c7db8aac0549b37.mockapi.io/book`

### Setting Up MockAPI

1. Go to [MockAPI.io](https://mockapi.io)
2. Create a new project
3. Create a new resource called `books` with the following fields:
   - `title` (String)
   - `author` (String)
   - `genre` (String)
   - `publicationYear` (Number)
4. Copy your API endpoint and paste it in `.env`

### Running the Application

```bash
# Development server
npm run dev
# The application will automatically open at http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Book Fields

Each book in the system contains:

| Field             | Type   | Description                        |
| ----------------- | ------ | ---------------------------------- |
| `id`              | string | Unique identifier (auto-generated) |
| `title`           | string | Book title                         |
| `author`          | string | Author name                        |
| `genre`           | string | Book genre                         |
| `publicationYear` | number | Year the book was published        |

### Supported Genres

- Fiction
- Non-Fiction
- Mystery
- Science Fiction
- Fantasy
- Romance
- Biography
- History

## Component Overview

### Core Components

- **BookCard** - Displays a single book with edit/delete actions
- **BookForm** - Modal form for adding/editing books with validation
- **SearchBar** - Real-time search input with clear button
- **GenreFilter** - Dropdown for filtering books by genre
- **Button** - Reusable button with variants (primary, secondary, danger)
- **Modal** - Container for forms with close button
- **DeleteConfirmation** - Confirmation dialog before deletion
- **Loading** - Spinner and skeleton loader states
- **EmptyState** - Display when no books are available
- **ErrorAlert** - Error message display with dismiss option

## API Service Layer

The `bookApi` service provides clean, typed methods for all CRUD operations:

```typescript
bookApi.getAllBooks(); // Fetch all books
bookApi.getBookById(id); // Fetch single book
bookApi.createBook(data); // Create new book
bookApi.updateBook(id, data); // Update book
bookApi.deleteBook(id); // Delete book
bookApi.searchBooks(query); // Search books
bookApi.filterByGenre(genre); // Filter by genre
```

## Custom Hooks

### useBooks()

Fetches all books with loading and error states.

```typescript
const { data, loading, error, fetchBooks } = useBooks();
```

### useCreateBook()

Handle book creation.

```typescript
const { create, loading, error } = useCreateBook();
```

### useUpdateBook()

Handle book updates.

```typescript
const { update, loading, error } = useUpdateBook();
```

### useDeleteBook()

Handle book deletion.

```typescript
const { delete, loading, error } = useDeleteBook()
```

### useSearchBooks()

Search books with real-time results.

```typescript
const { results, loading, error, search } = useSearchBooks();
```

### useFilterBooks()

Filter books by genre.

```typescript
const { results, loading, error, filter } = useFilterBooks();
```

## Design System

### Colors

- **Primary**: Gray (#111827)
- **Background**: Light gray (#F9FAFB)
- **Borders**: Gray (#E5E7EB)
- **Text**: Dark gray (#111827)
- **Muted**: Gray (#6B7280)
- **Error**: Red (#DC2626)

### Typography

- **Headings**: Semibold weights
- **Body**: Regular weights
- **Font family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.)

### Spacing

- Uses Tailwind's standard spacing scale
- Consistent gaps and padding throughout
- Responsive spacing for different screen sizes

## Features in Detail

### Search Functionality

- Real-time search as you type
- Searches by title and author
- Clear button to reset search
- Shows matching results count

### Genre Filtering

- Dropdown with predefined genres
- Can combine with search (search takes priority)
- Shows all genres by default
- Instant filtering

### Form Validation

- Title and author are required
- Genre must be selected
- Publication year validation (1000 to current year + 1)
- Real-time error clearing
- User-friendly error messages

### Delete Confirmation

- Modal confirmation before deletion
- Prevents accidental deletions
- Shows book title being deleted
- Loading state during deletion

### Responsive Design

- Mobile-first approach
- Optimal layouts for all screen sizes
- Flexible grid (1, 2, or 3 columns based on screen size)
- Touch-friendly buttons and inputs

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Connect your repository
4. Add environment variable `VITE_API_BASE_URL`
5. Deploy

```bash
# Build is automatic, but you can test locally:
npm run build
npm run preview
```

### Environment Variables for Vercel

Add in Vercel project settings:

- `VITE_API_BASE_URL` = your MockAPI base URL (without `/books` endpoint)

Example: `https://6a147a976c7db8aac0549b37.mockapi.io/book`

## Code Quality

- ✅ TypeScript strict mode enabled
- ✅ Functional components with React hooks
- ✅ Proper error handling
- ✅ Clean folder structure
- ✅ Reusable components
- ✅ No unnecessary dependencies
- ✅ Responsive and accessible
- ✅ Production-ready code

## Performance Optimizations

- Code splitting with Vite
- Lazy loading of components (when needed)
- Optimized re-renders with React hooks
- Efficient state management
- Fast API calls with Axios

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Support

For questions or issues, check the [GitHub issues](https://github.com/yourusername/book-management-system/issues) or create a new one.

## Next Steps

1. Set up your MockAPI project
2. Update `.env` with your API endpoint
3. Run `npm install`
4. Start with `npm run dev`
5. Begin adding books to your collection!
