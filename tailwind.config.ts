import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					neon: 'hsl(var(--primary-neon))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))',
					neon: 'hsl(var(--secondary-neon))'
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'safe': 'env(safe-area-inset-bottom)',
			},
			padding: {
				'safe': 'env(safe-area-inset-bottom)',
			},
			zIndex: {
				// Base UI elements
				'10': '10',  // Cards, dropdowns
				'20': '20',  // Sticky elements
				'30': '30',  // Warning indicators
				'40': '40',  // Navigation bars
				'45': '45',  // Floating buttons
				'50': '50',  // Bottom navigation
				'60': '60',  // Sticky CTAs
				'70': '70',  // Toast notifications
				'80': '80',  // Modals and overlays
				'90': '90',  // Critical system modals
				'100': '100', // Emergency overlays
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
				},
				'dna-rotate': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' }
				},
				'orbit-slow': {
					'0%': { 
						transform: 'rotate(0deg) translateX(240px) rotate(0deg) rotateY(0deg)', 
						filter: 'drop-shadow(0 0 15px hsl(142 100% 50% / 0.6))'
					},
					'50%': { 
						transform: 'rotate(180deg) translateX(240px) rotate(-180deg) rotateY(180deg)', 
						filter: 'drop-shadow(0 0 25px hsl(217 100% 65% / 0.8))'
					},
					'100%': { 
						transform: 'rotate(360deg) translateX(240px) rotate(-360deg) rotateY(360deg)', 
						filter: 'drop-shadow(0 0 15px hsl(142 100% 50% / 0.6))'
					}
				},
				'orbit-medium': {
					'0%': { 
						transform: 'rotate(0deg) translateX(180px) rotate(0deg) rotateX(0deg)', 
						filter: 'drop-shadow(0 0 12px hsl(217 100% 65% / 0.7))'
					},
					'50%': { 
						transform: 'rotate(180deg) translateX(180px) rotate(-180deg) rotateX(180deg)', 
						filter: 'drop-shadow(0 0 20px hsl(142 100% 50% / 0.7))'
					},
					'100%': { 
						transform: 'rotate(360deg) translateX(180px) rotate(-360deg) rotateX(360deg)', 
						filter: 'drop-shadow(0 0 12px hsl(217 100% 65% / 0.7))'
					}
				},
				'orbit-fast': {
					'0%': { 
						transform: 'rotate(0deg) translateX(200px) rotate(0deg) scale(1)', 
						filter: 'drop-shadow(0 0 10px hsl(38 92% 50% / 0.8))'
					},
					'25%': { 
						transform: 'rotate(90deg) translateX(200px) rotate(-90deg) scale(1.1)', 
						filter: 'drop-shadow(0 0 20px hsl(142 100% 50% / 0.6))'
					},
					'50%': { 
						transform: 'rotate(180deg) translateX(200px) rotate(-180deg) scale(0.9)', 
						filter: 'drop-shadow(0 0 15px hsl(217 100% 65% / 0.8))'
					},
					'75%': { 
						transform: 'rotate(270deg) translateX(200px) rotate(-270deg) scale(1.1)', 
						filter: 'drop-shadow(0 0 18px hsl(38 92% 50% / 0.7))'
					},
					'100%': { 
						transform: 'rotate(360deg) translateX(200px) rotate(-360deg) scale(1)', 
						filter: 'drop-shadow(0 0 10px hsl(38 92% 50% / 0.8))'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotateZ(0deg)' },
					'33%': { transform: 'translateY(-8px) rotateZ(2deg)' },
					'66%': { transform: 'translateY(4px) rotateZ(-1deg)' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						filter: 'drop-shadow(0 0 30px hsl(142 100% 50% / 0.8)) drop-shadow(0 0 60px hsl(217 100% 65% / 0.6))' 
					},
					'50%': { 
						filter: 'drop-shadow(0 0 50px hsl(142 100% 50% / 1)) drop-shadow(0 0 100px hsl(217 100% 65% / 0.8))' 
					}
				},
				'data-stream': {
					'0%': { opacity: '0.3', transform: 'translateX(-10px)' },
					'50%': { opacity: '1', transform: 'translateX(0px)' },
					'100%': { opacity: '0.3', transform: 'translateX(10px)' }
				},
				'scan-line': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(200%)' }
				},
				'particle-drift': {
					'0%, 100%': { 
						transform: 'translate(0px, 0px) scale(1)',
						opacity: '0.6'
					},
					'33%': { 
						transform: 'translate(10px, -15px) scale(1.2)',
						opacity: '1'
					},
					'66%': { 
						transform: 'translate(-8px, 10px) scale(0.8)',
						opacity: '0.8'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'dna-rotate': 'dna-rotate 15s linear infinite',
				'orbit-slow': 'orbit-slow 15s linear infinite',
				'orbit-medium': 'orbit-medium 8s linear infinite',
				'orbit-fast': 'orbit-fast 4s linear infinite',
				'float': 'float 4s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'data-stream': 'data-stream 2s ease-in-out infinite',
				'scan-line': 'scan-line 3s ease-in-out infinite',
				'particle-drift': 'particle-drift 6s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
