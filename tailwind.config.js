/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Defines the dark, techy-blue background color
        primary: "#050816", 
        // Defines the premium gold color for icons and titles
        "accent-gold": "#D4AF37", 
        // Defines the bright, glowing blue for borders and buttons
        "accent-blue": "#0ea5e9", // A vibrant sky blue
        violet: {
          950: '#1a0B2E',
          900: '#2D1657',
        }
      },
      keyframes: {
        // Animation for text fading in and moving up
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Simple fade-in
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Slow zoom effect for the background image
        pan: {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.15)" },
        },
        // Base keyframe for pulsing. We'll control duration via the animation class.
        "pulse-opacity": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.4 },
        },
      },
      animation: {
        // Binds the keyframes to utility classes
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        pan: "pan 25s infinite alternate ease-in-out",
        "pulse-slow": "pulse-opacity 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-fast": "pulse-opacity 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-medium": "pulse-opacity 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};