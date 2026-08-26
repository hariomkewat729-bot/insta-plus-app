# Insta Plus - Features और Components की जानकारी

## 📊 Database Schema (LocalStorage)

### यूजर्स
```javascript
{
  id: number,
  username: string,
  email: string,
  password: string,
  bio: string,
  profilePic: string,
  followers: [number],
  following: [number],
  createdAt: timestamp
}
```

### पोस्ट्स
```javascript
{
  id: number,
  userId: number,
  username: string,
  profilePic: string,
  image: string (base64),
  caption: string,
  likes: [number],
  comments: [{
    id: number,
    userId: number,
    username: string,
    text: string,
    createdAt: timestamp
  }],
  createdAt: timestamp
}
```

## 🎯 Routes

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/` | Home Feed | Yes |
| `/login` | Login Page | No |
| `/register` | Registration | No |
| `/upload` | Upload Post | Yes |
| `/profile/:userId` | User Profile | Yes |

## 🧩 Components

### Navbar
- Navigation links
- Logout functionality
- Current user display

### Post
- Display post image
- Like/Unlike
- Comments section
- User info
- Timestamp

## 🔄 Data Flow

```
App (State Management)
  ├── currentUser
  ├── users[]
  ├── posts[]
  └── handlers (register, login, addPost, etc.)
      ↓
    Pages & Components
      ├── Login/Register
      ├── Home (Feed)
      ├── Upload
      ├── Profile
      └── Post (Component)
```

## 💾 LocalStorage Keys

- `currentUser` - Current logged in user
- `users` - All users array
- `posts` - All posts array

## 🚀 Future Enhancements

- [ ] Backend API Integration
- [ ] Real Database (MongoDB/PostgreSQL)
- [ ] Video Upload Support
- [ ] Stories Feature
- [ ] Direct Messages
- [ ] Notifications
- [ ] Search Suggestions
- [ ] Hashtag Pages
- [ ] User Recommendations
- [ ] Analytics Dashboard
- [ ] Admin Panel
- [ ] Payment Integration
- [ ] Cloud Storage (AWS S3/Firebase)
- [ ] Real-time Updates (WebSocket)
- [ ] Mobile App (React Native)
