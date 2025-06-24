# Sawa - سوا

A modern study companion application built with Next.js and React.

## Features

- User authentication (Sign up, Login, Password reset)
- Session management with different types and durations
- Camera/Avatar selection for sessions
- User filtering and connection system
- Rating system for sessions
- Premium subscription features
- Responsive design with Arabic support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your project to Vercel
3. Vercel will automatically detect it's a Next.js project and configure the build settings
4. Deploy!

Alternatively, you can use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Project Structure

```
app/
├── components/          # Reusable UI components
├── context/            # React context providers
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx           # Main application entry point
```

## Color Palette

- **Darker Blue**: #121A63
- **Original Dark Blue**: #1A237E  
- **Orange**: #FF6F00
- **Light Gray**: #EEEEEE
- **White**: #FFFFFF

## License

This project is private and proprietary.