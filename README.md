
# Fullstack weather app



## Project Structure

The project is organized in a monorepo using `pnpm` workspaces, with separate packages for the frontend and backend:

- **Frontend**: `packages/frontend`, built with Next.js.
- **Backend**:  `packages/backend`, built with NestJS.


## Getting Started

Ensure you have `pnpm` installed. Then, run the following command to install all dependencies:

```
pnpm install
```


## Scripts

The following scripts are available in the root `package.json`:

- **Dev**: `pnpm run dev` - Runs both frontend and backend in development mode.
- **Build**: `pnpm run build:frontend` and `pnpm run build:backend` - Builds the frontend and backend respectively.
- **Start**: `pnpm run start:frontend` and `pnpm run start:backend` - Starts the frontend and backend in production mode.



## Development

To start the development server for both frontend 

```
pnpm run dev

```

- The frontend will be available at [http://localhost:3000](http://localhost:3000).
- The backend will be available at [http://localhost:4000](http://localhost:4000).



## Resources

- **Next.js Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **NestJS Documentation**: [NestJS Docs](https://docs.nestjs.com)
