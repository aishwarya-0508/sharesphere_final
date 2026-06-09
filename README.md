# ShareSphere – Smart Community Resource Sharing Platform

A complete **Full Stack MERN** application for community resource sharing, enabling users to share, discover, request, and manage resources efficiently.

## 📋 Project Overview

ShareSphere is a comprehensive community resource-sharing ecosystem where:
- **Sellers** act as resource owners and manage their inventory
- **Buyers** can discover, search, request, and borrow resources
- **Resources** are tracked through a complete lifecycle
- **Notifications** keep users informed of all activities
- **Analytics** provide insights into sharing patterns

## ✨ Key Features

### Core Functionality
✅ **Dual Role System** - Separate Seller and Buyer accounts  
✅ **Resource Management** - Add, edit, delete, and track resources  
✅ **Smart Search** - Search and filter by name, category, description  
✅ **Request Workflow** - Request, approve, reject, share, and return resources  
✅ **Image Uploads** - Upload resource images with Multer  
✅ **Notifications** - Real-time notification system for all activities  
✅ **Analytics Dashboard** - Detailed statistics and insights  

### Security & User Experience
✅ **JWT Authentication** - Secure token-based authentication  
✅ **Password Hashing** - bcryptjs encryption (10 salt rounds)  
✅ **Protected Routes** - Role-based access control  
✅ **Responsive Design** - Works on all device sizes  
✅ **Error Handling** - Comprehensive error messages  
✅ **Loading States** - User-friendly loading indicators  

## 🏗️ Project Structure

```
sharesphere_final/
├── backend/                    # Node.js + Express backend
│   ├── models/                 # MongoDB schemas
│   ├── controllers/            # Business logic
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Auth & file upload
│   ├── uploads/                # Uploaded images
│   ├── server.js               # Main server file
│   ├── package.json
│   └── .env
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── pages/              # Page components
│   │   ├── components/         # Reusable components
│   │   ├── services/           # API service layer
│   │   ├── context/            # Auth context
│   │   ├── hooks/              # Custom hooks
│   │   └── App.jsx             # Main app
│   ├── package.json
│   └── .env
│
├── QUICK_START.md              # Quick start guide
├── SETUP_GUIDE.md              # Detailed setup
├── API_DOCUMENTATION.md        # API reference
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

### Installation (5 minutes)

**1. Backend Setup**
```bash
cd backend
npm install
# Update .env with MongoDB URL and JWT secret
npm run dev
```

**2. Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

**3. Open Browser**
```
http://localhost:5173
```

See [QUICK_START.md](QUICK_START.md) for step-by-step instructions.

## 📚 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, React Router, Axios, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT, bcryptjs |
| **File Upload** | Multer |
| **Styling** | CSS3 |

## 🔑 API Overview

### Authentication
- `POST /api/auth/register-seller` - Register seller
- `POST /api/auth/register-buyer` - Register buyer
- `POST /api/auth/login` - Login
- `GET /api/auth/current-user` - Get user info

### Resources
- `POST /api/resources/add` - Create resource
- `GET /api/resources/all` - List resources
- `GET /api/resources/:id` - Get resource details
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource

### Requests
- `POST /api/requests/create` - Create request
- `PUT /api/requests/:id/approve` - Approve request
- `PUT /api/requests/:id/reject` - Reject request
- `PUT /api/requests/:id/share` - Mark as shared
- `PUT /api/requests/:id/return` - Mark as returned

### Additional Endpoints
- `GET /api/notifications/*` - Notifications management
- `GET /api/analytics/*` - Analytics data

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

## 👥 User Roles

### Seller
- Add and manage resources
- View resource details and status
- Manage buyer requests (approve/reject)
- Mark resources as shared/returned
- View seller dashboard with statistics
- Access analytics and insights

### Buyer
- Browse all available resources
- Search and filter resources
- Request resources with optional messages
- Track request status
- Return borrowed resources
- View buyer dashboard with statistics
- Access personal analytics

## 🔄 Resource Lifecycle

```
AVAILABLE → REQUESTED → APPROVED → SHARED → RETURNED → AVAILABLE
         ↘           ↗         ↘          ↗
              REJECTED
```

## 📊 Dashboard Features

### Seller Dashboard
- **Overview Tab**: Statistics cards (total resources, requests, approvals)
- **Resources Tab**: Manage resources with edit/delete
- **Requests Tab**: View and manage buyer requests
- **Analytics Tab**: Resource stats and monthly trends

### Buyer Dashboard
- **Browse Tab**: All available resources with filters
- **Requests Tab**: Track your request history and status
- **Analytics Tab**: Personal request statistics

## 💾 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: "seller" | "buyer",
  createdAt: Date
}
```

### Resources Collection
```javascript
{
  title: String,
  category: String,
  description: String,
  image: String (file path),
  condition: String,
  status: String,
  sellerId: ObjectId,
  contactInfo: String,
  createdAt: Date
}
```

### Requests Collection
```javascript
{
  buyerId: ObjectId,
  sellerId: ObjectId,
  resourceId: ObjectId,
  status: String,
  message: String,
  requestDate: Date,
  approvedDate: Date,
  sharedDate: Date,
  returnedDate: Date
}
```

### Notifications Collection
```javascript
{
  userId: ObjectId,
  message: String,
  type: String,
  isRead: Boolean,
  createdAt: Date
}
```

## 🎯 Resource Categories

- Books
- Electronics
- Furniture
- Sports Equipment
- Stationery
- Tools
- Medical Equipment
- Household Items
- Educational Materials
- Other

## 🔒 Security Features

- JWT token authentication with 7-day expiration
- Password hashing with bcryptjs (10 rounds)
- Protected API routes with middleware
- Role-based access control (RBAC)
- CORS configuration for frontend origin
- Environment variables for sensitive data
- Input validation and sanitization

## 📁 Getting Started with Development

### Clone and Install
```bash
# Navigate to backend
cd backend
npm install

# Navigate to frontend
cd frontend
npm install
```

### Run Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Test the Application
See [QUICK_START.md](QUICK_START.md) for comprehensive testing guide with workflows.

## 📖 Documentation

- [QUICK_START.md](QUICK_START.md) - 5-minute quick start guide
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Complete API reference

## 🔧 Configuration

### Backend Environment Variables
```env
MONGODB_URI=mongodb://localhost:27017/sharesphere
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Test Accounts (Create Your Own)
Register new accounts directly through the application:
1. Go to registration page
2. Choose role (Seller/Buyer)
3. Fill in details
4. Start using the platform

### Test Workflows
See [QUICK_START.md](QUICK_START.md) for detailed testing workflows including:
- Seller flow: Add resources → Manage requests → View analytics
- Buyer flow: Browse resources → Request → Track status
- Request workflow: Request → Approve → Share → Return

## 🚀 Production Deployment

### Backend Production
```bash
cd backend
npm start  # runs on specified PORT
```

### Frontend Production Build
```bash
cd frontend
npm run build  # creates optimized build
npm run preview  # preview production build
```

Update `.env` files with production URLs and secure JWT secrets.

## 📦 Dependencies

### Backend
- express (^4.18.2)
- mongoose (^7.6.0)
- jsonwebtoken (^9.0.2)
- bcryptjs (^2.4.3)
- multer (^1.4.5)
- cors (^2.8.5)
- dotenv (^16.3.1)

### Frontend
- react (^19.2.6)
- react-dom (^19.2.6)
- react-router-dom (^6.20.0)
- axios (^1.6.2)
- vite (^8.0.12)

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Ensure MongoDB is running or check Atlas connection string |
| Port already in use | Change PORT in .env file |
| CORS errors | Verify VITE_API_URL matches backend URL |
| Image upload fails | Check `/backend/uploads` directory exists |
| Login fails | Verify JWT_SECRET in .env |

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for more troubleshooting help.

## 🎨 UI/UX Highlights

- **Clean, Modern Design** - Gradient theme with purple/blue colors
- **Responsive Layout** - Adapts to all screen sizes
- **Intuitive Navigation** - Easy-to-use dashboards and workflows
- **Visual Feedback** - Loading states, error messages, success confirmations
- **Organized Content** - Tabbed interfaces and structured layouts
- **Fast Performance** - Optimized API calls and efficient rendering

## 📈 Future Enhancements

- Socket.io for real-time notifications
- Rating and review system
- Advanced analytics with Chart.js/Recharts
- Email notifications
- User profile management
- Payment integration
- Mobile app version
- Recommendation engine




## 👨‍💻 Development Info

This is a complete, production-ready MERN application with:
- ✅ Full authentication system
- ✅ Complete CRUD operations
- ✅ Image upload functionality
- ✅ Real-time request management
- ✅ Analytics and statistics
- ✅ Responsive UI
- ✅ Error handling
- ✅ Security best practices


---

**Happy Resource Sharing! 🎉**

Start the application and begin connecting your community today.