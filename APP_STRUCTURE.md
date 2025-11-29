# Farmify - App Structure

## 🚀 Application Flow

```
Landing Page (/) 
    ↓
Auth Page (/auth) - Login/Signup
    ↓
Dashboard (/dashboard) - Main Feed
    ├── Resources (/resources)
    ├── Articles (/articles)
    ├── AI Assistant (/ai)
    └── Account (/account)
```

## 📁 Page Structure

### 1. **Landing Page** (`/`)
- Clean hero section with gradient background
- "Let's Go" CTA button → navigates to `/auth`
- Minimal navigation with logo

### 2. **Auth Page** (`/auth`)
- Tabbed interface for Login/Signup
- Single page with state management
- Navigates to `/dashboard` on submit

### 3. **Dashboard** (`/dashboard`) ✨ Main App
- **Navigation Bar**: Feed | Resources | Articles | AI Assistant | Account
- **Create Post**: Textarea for farmers to share updates
- **Feed**: Social feed with posts from farmers
  - Like, Comment, Share actions
  - Author info with avatar
- **Sidebar**: Trending topics and quick stats

### 4. **Resources** (`/resources`)
- Agriculture plans with categories
- Filterable by: Vegetables, Grains, Fruits, Livestock, etc.
- Multilingual support (10 Indian languages)
- Investment details and timelines

### 5. **Articles** (`/articles`)
- Farming guides and expert insights
- Read time estimates
- Author information
- Category tags

### 6. **AI Assistant** (`/ai`)
- Chat interface for farming questions
- Suggested topics
- Real-time conversation (placeholder)
- Integrated with dashboard nav

### 7. **Account** (`/account`)
- Profile management
- Email and location settings
- Notification preferences
- User statistics
- Logout functionality

## 🎨 Design System

### Colors
- **Primary Green**: `#22c55e`
- **Dark Green**: `#16a34a`
- **Light Green**: `#86efac`
- **Background**: White (`#ffffff`)
- **Light Background**: `#fafafa`
- **Text**: `#0a0a0a`
- **Muted Text**: `#666`

### Typography
- Headers: 18-64px, Bold (600-700)
- Body: 14-15px, Regular (400-500)
- Small: 13px

### Components
- **Cards**: White background, 1px border, 12px radius
- **Buttons**: Green gradient, 8-12px radius, hover effects
- **Inputs**: Border on focus, 8px radius
- **Navigation**: Sticky top, white background

## 🔧 Technologies

- **React** 19.2.0
- **React Router DOM** 7.9.6
- **Vite** 7.2.4
- **Custom CSS** (no framework)
- **Context API** for language management

## 🌍 Multilingual Support

Supported languages:
- English (en)
- Hindi (hi)
- Tamil (ta)
- Telugu (te)
- Bengali (bn)
- Marathi (mr)
- Gujarati (gu)
- Kannada (kn)
- Malayalam (ml)
- Punjabi (pa)

## 📝 Mock Data

### Posts Feed
- 3 sample farmer posts
- Authors: Rajesh Kumar (Punjab), Priya Patel (Gujarat), Suresh Reddy (Telangana)
- Engagement metrics (likes, comments)

### Agriculture Plans
- 6 detailed farming guides
- Investment ranges and timelines
- Step-by-step implementation details

### Articles
- 3 sample articles
- Read time and author info
- Categories for filtering

## 🚧 Next Steps (Backend Integration)

1. **Authentication API**
   - Connect login/signup forms
   - JWT token management
   - Protected routes

2. **Database Models**
   - Users
   - Posts
   - Comments
   - Likes
   - Articles
   - Resources

3. **Features to Add**
   - Real AI assistant integration
   - Weather API
   - Crop price tracking
   - Community forums
   - File uploads for posts
   - Real-time notifications

## 📂 File Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx       ✅ Entry point
│   │   ├── Auth.jsx          ✅ Login/Signup
│   │   ├── Dashboard.jsx     ✅ Main feed
│   │   ├── Resources.jsx     ✅ Agriculture plans
│   │   ├── Articles.jsx      ✅ Farming guides
│   │   ├── AI.jsx            ✅ Chat assistant
│   │   └── Account.jsx       ✅ User settings
│   ├── styles/
│   │   ├── Landing.css       ✅ Landing styles
│   │   ├── Auth.css          ✅ Auth styles
│   │   ├── Dashboard.css     ✅ Dashboard/Feed styles
│   │   └── Resources.css     ✅ Resources styles
│   ├── context/
│   │   └── LanguageContext.jsx  ✅ i18n
│   ├── App.jsx               ✅ Main routing
│   └── main.jsx              ✅ Entry
└── package.json              ✅ Dependencies
```

## ✅ Completed Features

- [x] Landing page with hero section
- [x] Authentication page with tabs
- [x] Dashboard with social feed
- [x] Post creation interface
- [x] Navigation system
- [x] Resources page with plans
- [x] Articles page
- [x] AI Assistant chat interface
- [x] Account settings page
- [x] Responsive design
- [x] Clean minimal UI
- [x] White + green gradient theme
- [x] Multilingual support

---

**Status**: ✨ All pages created and functional. Ready for backend integration!
