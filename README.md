# Bazar-Dor (বাজার দর)

**Live Demo:** <https://bazar-dor-eta-beryl.vercel.app/>

Bazar-Dor is a web application for exploring everyday market prices in
Bangladesh. It helps users browse products by category, compare listed
prices, and see price-change indicators in one place.

## Features

-   **Product categories:** Browse products by category.
-   **Product listings:** View product names, prices, and price-change
    indicators.
-   **Sorting:** Sort products in the category listing.
-   **Product details:** Open an individual product page for more
    information.
-   **Price movement highlights:** See rising and falling product
    sections and a scrolling market-price ticker.
-   **Authentication:** Sign in and create an account using Better Auth,
    including configured social sign-in providers.
-   **Profile page:** Access the user profile area.
-   **Responsive interface:** Built with reusable components and
    responsive styling.
-   **Loading and not-found states:** Dedicated pages for loading and
    unavailable routes.

> Price information shown by the application depends on the data source
> and may change. Check the latest available information before making
> purchasing decisions.

## Tech Stack

-   **Next.js** --- React framework and App Router
-   **React** --- UI components
-   **TypeScript** --- Type-safe application code
-   **Tailwind CSS** --- Utility-first styling
-   **DaisyUI** --- UI components and styling utilities
-   **Better Auth** --- Authentication

## Project Structure

``` text
bazar-dor/
├── public/                         # Public static assets
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/      # Better Auth API route
│   │   ├── categories/[category]/  # Category-specific product listing
│   │   ├── products/[id]/          # Product details page
│   │   ├── profile/                # User profile page
│   │   ├── signin/                 # Sign-in page
│   │   ├── signup/                 # Sign-up page
│   │   ├── layout.tsx              # Root layout
│   │   ├── loading.tsx             # Loading UI
│   │   ├── not-found.tsx           # Not-found UI
│   │   └── page.tsx                # Home page
│   ├── assets/                     # Images and icons
│   ├── components/                 # Reusable UI components
│   ├── lib/                        # Authentication setup
│   └── types/                      # Shared TypeScript types
├── package.json
├── next.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

-   Node.js (a current LTS version is recommended)
-   npm
-   Access to any environment variables required by the authentication
    configuration

### 1. Clone the repository

``` bash
git clone <your-repository-url>
cd bazar-dor
```

Replace `<your-repository-url>` with the URL of your Git repository.

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the variables required
by your Better Auth setup and any data APIs used by the app.

``` env
# Add the environment variables required by your project.
# Do not commit real secrets to version control.
```

Use the variable names expected by your existing configuration in
`src/lib/auth.ts` and your data-fetching code. For social sign-in,
configure the relevant provider credentials and callback URLs in the
provider dashboard and your deployment environment.

### 4. Start the development server

``` bash
npm run dev
```

Open <http://localhost:3000> in your browser.

### 5. Build for production

``` bash
npm run build
npm run start
```

## Authentication

Bazar-Dor uses Better Auth for account authentication. The project
includes an authentication API route at
`src/app/api/auth/[...all]/route.ts`, along with sign-in, sign-up, and
profile pages.

For Google or GitHub sign-in, make sure the provider credentials and
authorized callback URLs match the URL where the app is running.

## Main Routes

  Route                      Purpose
  -------------------------- -----------------------------------
  `/`                        Home page
  `/categories/[category]`   Products for a selected category
  `/products/[id]`           Details for an individual product
  `/profile`                 User profile
  `/signin`                  Sign in
  `/signup`                  Create an account

## Development Notes

-   Shared interface elements are organized under `src/components/`.
-   Shared TypeScript types are stored under `src/types/`.
-   Authentication configuration is organized under `src/lib/`.
-   Keep credentials and private environment variables out of source
    control.
-   Verify product-price data and authentication callback URLs in the
    target environment before deployment.

## Future Improvements

Potential enhancements include product search and filtering, richer
price-history charts, location-based market comparisons, and additional
accessibility improvements.

## Author

**MD. Mridul Ali**

------------------------------------------------------------------------

*Built with Next.js, React, TypeScript, Tailwind CSS, DaisyUI, and
Better Auth.*
