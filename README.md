# 🚀 Port4lio - Professional Portfolio Builder

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</div>

<div align="center">
  <h3>✨ Create stunning professional portfolios in minutes ✨</h3>
  <p>A modern, full-stack portfolio builder with drag-and-drop editing, multiple templates, and professional deployment options.</p>
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎨 Templates](#-templates)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Installation](#️-installation)
- [🔧 Configuration](#-configuration)
- [📱 Usage](#-usage)
- [🎯 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

## ✨ Features

### 🎨 **Professional Templates**
- **8 Specialized Templates** for different professions
- **UI/UX Design**: Creative, Quartz templates
- **Backend Development**: Terminal, Onyx templates  
- **Full-Stack Development**: Pro, Modern, Sapphire templates
- **Data Science**: Specialized Data template

### 🎛️ **Drag & Drop Visual Editor**
- Real-time preview with `react-grid-layout`
- Custom widget positioning and sizing
- Live editing with instant updates
- Responsive layout management

### 🔐 **Authentication & Security**
- Google OAuth integration with NextAuth.js
- Secure session management
- Protected routes and API endpoints
- User data privacy controls

### 📊 **Portfolio Management**
- **Project Showcase**: Image uploads, live demos, GitHub integration
- **Skills Management**: Categorized skill sets with proficiency levels
- **Experience Tracking**: Work history and achievements
- **Social Integration**: LinkedIn, GitHub, Twitter, personal website links

### 🌐 **Public Portfolio Features**
- Clean, SEO-optimized public URLs (`/username`)
- Mobile-responsive designs
- Social media sharing integration
- Analytics and view tracking

### ⚡ **Modern Development**
- TypeScript for type safety
- Tailwind CSS for styling
- MongoDB with Prisma ORM
- API-first architecture
- Serverless deployment ready

## 🎨 Templates

| Template | Category | Target Audience | Design Style |
|----------|----------|----------------|-------------|
| **Creative** | UI/UX Design | UI/UX Designers, Graphic Artists | Vibrant gradients, creative layouts |
| **Quartz** | UI/UX Design | Product Designers, UX Researchers | Clean, minimalist, content-focused |
| **Terminal** | Backend | Backend Developers, DevOps Engineers | Command-line inspired, dark theme |
| **Onyx** | Backend | Software Engineers, API Developers | Sleek dark theme, technical focus |
| **Pro** | Full-Stack | Software Engineers, Tech Professionals | Clean, professional, engineering-focused |
| **Modern** | Full-Stack | Full-Stack Developers, Tech Entrepreneurs | Contemporary, animated elements |
| **Sapphire** | Full-Stack | Senior Developers, Engineering Managers | Rich blue tones, elegant typography |
| **Data** | Data Science | Data Scientists, ML Engineers | Scientific theme, analytics-focused |

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Heroicons, Lucide React
- **Drag & Drop**: react-grid-layout, react-resizable

### **Backend**
- **Runtime**: Node.js
- **Database**: MongoDB Atlas
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **File Uploads**: Next.js API routes

### **Deployment & DevOps**
- **Platform**: Vercel (recommended)
- **Database**: MongoDB Atlas
- **Environment**: Serverless
- **Domain**: Custom domain support

## 🚀 Quick Start

Get Port4lio running locally in 5 minutes:

```bash
# Clone the repository
git clone https://github.com/create-with-vishwesh/portfolio-builder.git
cd portfolio-builder

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Set up the database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio builder! 🎉

## ⚙️ Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (free tier available)
- Google OAuth credentials (for authentication)

### Step-by-Step Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/create-with-vishwesh/portfolio-builder.git
   cd portfolio-builder
   npm install
   ```

2. **Environment Configuration**
   Create `.env.local` with the following variables:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/portfolio-builder"

   # NextAuth Configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Get connection string and update `DATABASE_URL`
4. Whitelist your IP address

### Deployment Configuration
For production deployment on Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📱 Usage

### Creating Your First Portfolio

1. **Sign Up/Login**
   - Visit the app and sign in with Google
   - Complete your profile setup

2. **Choose Template**
   - Browse 8 professional templates
   - Select based on your profession/style
   - Preview before applying

3. **Edit Content**
   - Add personal information
   - Upload profile image
   - Add work experience
   - Showcase projects with links
   - Organize skills by category

4. **Customize Layout** (Optional)
   - Use drag-and-drop visual editor
   - Rearrange content widgets
   - Resize and reposition elements
   - Preview responsive design

5. **Publish & Share**
   - Make portfolio public
   - Get clean URL: `yoursite.com/username`
   - Share on social media
   - Track analytics

### Managing Projects
```typescript
// Add new project
const project = {
  title: "E-commerce Platform",
  description: "Full-stack e-commerce solution with React and Node.js",
  technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  demoUrl: "https://demo.example.com",
  githubUrl: "https://github.com/username/project"
}
```

### Organizing Skills
```typescript
// Categorize skills
const skills = [
  { name: "React", category: "Frontend", level: "Advanced" },
  { name: "Node.js", category: "Backend", level: "Intermediate" },
  { name: "Python", category: "Programming Languages", level: "Advanced" }
]
```

## 🎯 API Documentation

### Authentication Endpoints
```bash
# Google OAuth
POST /api/auth/signin/google

# Session management
GET /api/auth/session
```

### Portfolio Management
```bash
# Get portfolio data
GET /api/portfolio

# Update portfolio
POST /api/portfolio
{
  "aboutMe": "Software engineer...",
  "jobTitle": "Full Stack Developer",
  "skills": [...],
  "projects": [...]
}

# Change template
POST /api/portfolio/template
{
  "template": "pro"
}
```

### Public Portfolio
```bash
# View public portfolio
GET /[username]

# Example: yoursite.com/johndoe
```

For complete API documentation, see [API_README.md](./API_README.md)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
```bash
# Fork the repository
git clone https://github.com/your-username/portfolio-builder.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

### Contribution Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure responsive design

### Adding New Templates
1. Create template component in `/src/components/templates/`
2. Add to template registry in `/src/app/dashboard/templates/page.tsx`
3. Update routing in `/src/app/[username]/page.tsx`
4. Add to API validation
5. Test across devices

## 📊 Project Stats

- **🎨 Templates**: 8 professional designs
- **⚡ Load Time**: < 2 seconds
- **📱 Mobile Ready**: 100% responsive
- **🔒 Security**: OAuth + protected routes
- **🌐 SEO Optimized**: Meta tags + clean URLs
- **♿ Accessible**: WCAG compliant

## 🔮 Roadmap

- [ ] **Additional Templates**: Academic, Freelancer, Creative Industry
- [ ] **Advanced Analytics**: Visitor insights, engagement metrics
- [ ] **Custom Domains**: Personal domain integration
- [ ] **Team Portfolios**: Collaborative portfolio creation
- [ ] **Mobile App**: React Native companion app
- [ ] **AI Integration**: AI-powered content suggestions
- [ ] **Multi-language**: i18n support

## 🐛 Known Issues

- Drag and drop may have minor issues on mobile devices
- Image uploads limited to 5MB per file
- Template switching requires page refresh

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [NextAuth.js](https://next-auth.js.org/) - Complete open source authentication solution
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons

## 📞 Support

- **Documentation**: Check out our [docs](./docs/)
- **Issues**: [GitHub Issues](https://github.com/create-with-vishwesh/portfolio-builder/issues)
- **Discussions**: [GitHub Discussions](https://github.com/create-with-vishwesh/portfolio-builder/discussions)
- **Email**: support@port4lio.com

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/create-with-vishwesh">Tech Titans</a></p>
  <p>⭐ Star this repo if it helped you build an amazing portfolio!</p>
</div>
