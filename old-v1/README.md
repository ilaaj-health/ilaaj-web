# Ilaaj AI Web Frontend

A modern, responsive Next.js frontend for the Ilaaj AI health tracking platform, inspired by MyFitnessPal's design and functionality.

## Features

- 🎨 **Modern Design**: Clean, professional UI inspired by MyFitnessPal
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Fast Performance**: Built with Next.js 14 and optimized for speed
- 🎭 **Smooth Animations**: Framer Motion animations for enhanced UX
- 🎯 **SEO Optimized**: Built-in SEO optimization with Next.js
- 🛡️ **Type Safe**: Full TypeScript support for better development experience

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ilaaj-ai-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ilaaj-ai-web/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── lib/                   # Utility functions
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Key Sections

### Hero Section
- Compelling headline and value proposition
- Call-to-action buttons
- App preview mockup
- Social proof indicators

### Features Section
- AI-powered health insights
- Comprehensive health tracking
- Medical-grade security

### How It Works
- 3-step process explanation
- Clear value proposition
- Visual step indicators

### Testimonials
- User reviews and ratings
- Social proof
- Trust building

### FAQ Section
- Common questions and answers
- Expandable accordion interface
- Comprehensive coverage

### Footer
- Company information
- Navigation links
- Contact details

## Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your primary color palette
  },
  secondary: {
    // Your secondary color palette
  }
}
```

### Content
All content is easily customizable in the main `page.tsx` file. Update:
- Hero section text
- Feature descriptions
- Testimonials
- FAQ content
- Footer links

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Performance Optimization

- Image optimization with Next.js Image component
- Automatic code splitting
- Static generation where possible
- Optimized bundle size
- Lazy loading for better performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.