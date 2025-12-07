import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom LMS Color Palette
        primary: {
          azure: '#6CCFF6',     // Pale Azure - Primary actions
          black: '#001011',      // Rich Black - Text/headers
          gray: '#757780',       // Gray - Secondary text
          powder: '#FFFFFC',     // Baby Powder - Backgrounds
          green: '#A4DF00',      // Yellow Green - Success/accents
        },
        // Semantic colors using the palette
        background: '#FFFFFC',   // Baby Powder
        foreground: '#001011',   // Rich Black
        card: '#FFFFFC',
        'card-foreground': '#001011',
        popover: '#FFFFFC',
        'popover-foreground': '#001011',
        muted: '#757780',
        'muted-foreground': '#757780',
        accent: '#6CCFF6',
        'accent-foreground': '#001011',
        destructive: '#ef4444',
        'destructive-foreground': '#FFFFFC',
        border: '#e5e7eb',
        input: '#f9fafb',
        ring: '#6CCFF6',
        
        // Module specific colors
        builder: '#6CCFF6',      // Azure for Builder module
        manager: '#757780',      // Gray for Manager module
        creator: '#A4DF00',      // Green for Creator module
        player: '#6CCFF6',       // Azure for Player module
        trainer: '#001011',      // Black for Trainer module
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;