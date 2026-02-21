# BakaBoost

BakaBoost is a modern platform for creators to monetize their content through donations and digital products, built with Next.js 14, TypeScript, and Shadcn UI.

## Features

- 🔐 **Authentication** - Secure user authentication with NextAuth.js
- 📊 **Dashboard** - Track donations, manage products, and view supporter messages
- 🎨 **Modern UI** - Beautiful, responsive interface built with Shadcn UI and Tailwind CSS
- 📱 **Responsive Design** - Mobile-first approach for all screens
- 🔑 **Edge Config** - Use Edge Config to manage dynamic content
## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Vercel account (for deployment)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
BB_POSTGRES_URL="your-postgresql-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Add other required environment variables here
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bakaboost.git
cd bakaboost
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js 14 App Router pages and API routes
- `components/` - Reusable React components
- `prisma/` - Database schema and migrations
- `public/` - Static assets
- `types/` - TypeScript type definitions
- `lib/` - Utility functions and shared logic

## Deployment on Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your repository on [Vercel](https://vercel.com/new)

3. Add the required environment variables in your Vercel project settings

4. Deploy! Vercel will automatically build and deploy your application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)