import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			sm: '1.5rem',
  			lg: '2rem',
  		},
  		screens: {
  			'2xl': '1280px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
  			sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			// Extended color palettes for design flexibility - Teal/Coral Healing Theme
  			teal: {
  				50: '#f0fdfa',
  				100: '#ccfbf1',
  				200: '#99f6e4',
  				300: '#5eead4',
  				400: '#2dd4bf',
  				500: '#14b8a6',
  				600: '#0d9488',
  				700: '#0f766e',
  				800: '#115e59',
  				900: '#134e4a',
  			},
  			coral: {
  				50: '#fff7ed',
  				100: '#ffedd5',
  				200: '#fed7aa',
  				300: '#fdba74',
  				400: '#fb923c',
  				500: '#f97316',
  				600: '#ea580c',
  				700: '#c2410c',
  				800: '#9a3412',
  				900: '#7c2d12',
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			'soft': '0 4px 20px rgba(13, 148, 136, 0.08)',
  			'hover': '0 8px 30px rgba(13, 148, 136, 0.12)',
  			'card': '0 2px 12px rgba(13, 148, 136, 0.06)',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
};
export default config;
