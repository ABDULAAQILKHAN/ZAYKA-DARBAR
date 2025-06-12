# Zayka Restaurant - Food Ordering Website

A modern, responsive food ordering website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🍽️ Beautiful landing page with restaurant branding
- 📱 Responsive design for all devices
- 🌙 Dark mode support
- 🛒 Shopping cart functionality
- 👨‍💼 Admin dashboard for menu management
- 📦 Order tracking system
- 🎨 Modern UI with Framer Motion animations

## Installation

1. **Clone or download the project**

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser and navigate to:**
   \`\`\`
   http://localhost:3000
   \`\`\`

## Required Dependencies

If you encounter any dependency issues, install these packages:

\`\`\`bash
npm install next@14.0.0 react@^18 react-dom@^18
npm install next-themes@^0.2.1 framer-motion@^10.16.0 lucide-react@^0.294.0
npm install @radix-ui/react-dialog@^1.0.5 @radix-ui/react-dropdown-menu@^2.0.6
npm install @radix-ui/react-select@^2.0.0 @radix-ui/react-separator@^1.0.3
npm install @radix-ui/react-switch@^1.0.3 @radix-ui/react-tabs@^1.0.4
npm install @radix-ui/react-radio-group@^1.1.3
npm install class-variance-authority@^0.7.0 clsx@^2.0.0 tailwind-merge@^2.0.0
npm install -D typescript@^5 @types/node@^20 @types/react@^18 @types/react-dom@^18
npm install -D autoprefixer@^10.0.1 postcss@^8 tailwindcss@^3.3.0
\`\`\`

## Project Structure

\`\`\`
zayka-restaurant/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # UI components
│   ├── admin/            # Admin components
│   ├── auth/             # Authentication components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
└── public/               # Static assets
\`\`\`

## Pages

- **Home** (`/`) - Landing page with offers and specials
- **Menu** (`/menu`) - Browse menu items by category
- **Cart** (`/cart`) - View and manage cart items
- **Checkout** (`/checkout`) - Complete order with payment
- **Orders** (`/orders`) - Track current and past orders
- **Admin** (`/admin`) - Admin dashboard
- **Admin Menu** (`/admin/menu`) - Manage menu items
- **Admin Orders** (`/admin/orders`) - Manage live orders

## Theme Support

The website supports both light and dark themes. Use the theme toggle in the navigation bar to switch between themes.

## Customization

- **Colors**: Edit the `zayka` color palette in `tailwind.config.ts`
- **Menu Items**: Update the mock data in `lib/data.ts`
- **Styling**: Modify components in the `components/` directory

## Troubleshooting

If you encounter CSS issues:
1. Make sure all dependencies are installed
2. Clear your browser cache
3. Restart the development server
4. Check that Tailwind CSS is properly configured

## License

This project is for educational purposes.
