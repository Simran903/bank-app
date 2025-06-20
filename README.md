# Transsacto

**Transsacto** is a modern banking application built with a TypeScript-based full-stack architecture. This repository contains both the React frontend (`transsacto-client`) and the Node.js backend (`server`) implementations.

---

## 🏗️ Project Architecture

This project consists of two main components:
- **Frontend**: `transsacto-client/` - Vite + React + TypeScript application
- **Backend**: `server/` - Node.js + Express + Prisma API server

---

## 🌟 Application Features

### Frontend Features (`transsacto-client`)

#### 🔐 Authentication
- **User Registration**: Complete signup flow with form validation
- **User Login**: Secure signin with email/username and password
- **Session Management**: JWT-based authentication with automatic logout
- **Protected Routes**: Route protection for authenticated users only

#### 📊 Dashboard
- **Account Overview**: Real-time balance display with animated counters
- **Transaction Summary**: Visual cards showing sent/received amounts and total transactions
- **Recent Activity**: Display of the last 3 transactions with status indicators
- **Quick Actions**: Direct access to transfer, beneficiaries, and settings

#### 💸 Money Transfer
- **Initiate Transfers**: Send money to other accounts with amount and description
- **Transaction History**: View all sent and received transfers
- **Transfer Filtering**: Filter transactions by amount, type, and date
- **Real-time Status**: Track transfer status (completed, pending, failed)

#### 👥 Beneficiary Management
- **Add Beneficiaries**: Register new beneficiaries with bank details (name, account number, bank name, IFSC code, email, phone)
- **View Beneficiaries**: List all saved beneficiaries with complete details
- **Edit Beneficiaries**: Update beneficiary information
- **Delete Beneficiaries**: Remove beneficiaries from the list
- **Beneficiary Details**: View individual beneficiary information in modal dialogs

#### 📈 Transaction Management
- **Transaction History**: Complete list of all transactions
- **Transaction Filtering**: Filter by date range, amount, and transaction type
- **Transaction Details**: Detailed view of individual transactions
- **Status Tracking**: Real-time transaction status updates

#### ⚙️ Settings & Profile
- **Profile Management**: View and update user profile information
- **Password Change**: Secure password update functionality
- **Theme Toggle**: Dark/light mode toggle with system preference detection
- **Account Settings**: Manage account preferences and settings

#### 🎨 UI/UX Features
- **Responsive Design**: Fully responsive layout for all screen sizes
- **Dark/Light Theme**: Complete theme system with automatic detection
- **Loading States**: Skeleton loaders and animated loading indicators
- **Error Handling**: Comprehensive error messages and retry mechanisms
- **Animated Components**: Smooth animations and transitions
- **Toast Notifications**: Real-time feedback for user actions

### Backend Features (`server`)

#### 🔒 Authentication & Security
- **JWT Authentication**: Secure token-based authentication system
- **Password Encryption**: bcrypt password hashing with salt rounds
- **Session Management**: Access token generation and validation
- **Protected Routes**: Middleware-based route protection
- **CORS Configuration**: Cross-origin resource sharing setup

#### 👤 User Management
- **User Registration**: Create new user accounts with validation
- **User Login**: Authenticate users with email/username
- **Profile Management**: Update user profiles and settings
- **Password Management**: Secure password update functionality
- **Profile Picture Upload**: Cloudinary integration for image uploads
- **Account Details**: Retrieve user account information
- **Balance Management**: Real-time balance tracking and updates

#### 💳 Account System
- **Account Creation**: Automatic account creation on user registration
- **Account Types**: Support for Savings and Current accounts
- **Account Categories**: ZeroBalance, General, Classic, Premium, Imperial tiers
- **Balance Tracking**: Real-time balance updates with transaction history
- **Multi-Account Support**: Database structure supports multiple accounts per user

#### 🔄 Transfer System
- **Initiate Transfers**: Send money between accounts with validation
- **Transfer Validation**: Amount validation and balance checking
- **Transaction Recording**: Complete transaction history logging
- **Transfer Status**: Track transfer status throughout processing
- **Sent Transfers**: Retrieve all outgoing transfers for a user
- **Received Transfers**: Retrieve all incoming transfers for a user
- **Transfer History**: Complete transaction history with filtering
- **Transaction Details**: Individual transaction information retrieval
- **Last 5 Transactions**: Quick access to recent transactions

#### 🏦 Beneficiary Management
- **Add Beneficiaries**: Register new beneficiaries with complete bank details
- **List Beneficiaries**: Retrieve all beneficiaries for a user
- **Update Beneficiaries**: Modify existing beneficiary information
- **Delete Beneficiaries**: Remove beneficiaries from the system
- **Beneficiary Details**: Individual beneficiary information retrieval
- **Validation**: Complete form validation for bank details

#### 🗄️ Database Schema
- **User Model**: Complete user profile with authentication data
- **Account Model**: Account information with types and categories
- **Transaction Model**: Comprehensive transaction logging with relationships
- **Balance Model**: Real-time balance tracking with transaction links
- **Beneficiary Model**: Complete beneficiary information storage

---

## 🛠️ Technology Stack

### Frontend (`transsacto-client`)
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.1 with SWC plugin for fast compilation
- **Routing**: React Router DOM 6.26.2 for client-side navigation
- **Styling**: Tailwind CSS 3.4.11 with custom animations
- **UI Components**: 
  - Radix UI primitives for accessibility
  - Custom shadcn/ui component library
  - Lucide React icons
- **State Management**: React hooks with custom state management
- **HTTP Client**: Axios 1.10.0 for API communication
- **Form Handling**: React Hook Form 7.53.0 with Zod validation
- **Charts**: Recharts 2.12.7 for data visualization
- **Theme System**: next-themes 0.3.0 for dark/light mode
- **Notifications**: Sonner 1.5.0 for toast notifications
- **Development**: 
  - ESLint for code linting
  - TypeScript 5.5.3 for type safety
  - PostCSS for CSS processing

### Backend (`server`)
- **Runtime**: Node.js with Express 4.19.2
- **Language**: TypeScript with strict type checking
- **Database**: PostgreSQL with Prisma ORM 5.16.0
- **Authentication**: 
  - JWT (jsonwebtoken 9.0.2) for token management
  - bcrypt 5.1.1 for password hashing
- **File Upload**: 
  - Multer 1.4.5-lts.1 for multipart form handling
  - Cloudinary 2.2.0 for image storage and processing
- **Validation**: Zod 3.23.8 for schema validation
- **Middleware**: 
  - CORS 2.8.5 for cross-origin requests
  - cookie-parser 1.4.6 for cookie handling
- **Development**: 
  - Nodemon 3.1.4 for development server
  - Concurrently 8.2.2 for running multiple processes
  - TypeScript compilation with watch mode

---

## 📋 Prerequisites

Before running the application, ensure you have:

- **Node.js** (v16.0.0 or higher)
- **PostgreSQL** (v12.0 or higher)
- **npm** or **yarn** package manager
- **Cloudinary Account** (for image uploads)

---

## 🚀 Getting Started

### Repository Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Simran903/bank-app.git
   cd bank-app
   ```

### Backend Setup (`server`)

1. **Navigate to the server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the server directory:
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/transsacto_db"
   
   # JWT Configuration
   ACCESS_TOKEN_SECRET="your-secret-jwt-key"
   ACCESS_TOKEN_EXPIRY="1d"
   
   # Cloudinary Configuration (optional)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   
   # Server Configuration
   PORT=8000
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The backend server will start at `http://localhost:8000`

### Frontend Setup (`transsacto-client`)

1. **Navigate to the frontend directory**
   ```bash
   cd transsacto-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the transsacto-client directory:
   ```env
   # API Configuration
   VITE_BASE_URLL="http://localhost:8000"

   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The frontend application will start at `http://localhost:8080`

---

## 🔗 API Endpoints

### Authentication Routes (`/user`)
- `POST /user/signup` - User registration
- `POST /user/signin` - User login
- `POST /user/signout` - User logout (protected)
- `POST /user/update-password` - Update password (protected)
- `POST /user/profile-picture` - Upload profile picture (protected)
- `POST /user/get-balance` - Get account balance (protected)
- `POST /user/account-details` - Get account details (protected)
- `POST /user/account-overview` - Get account overview (protected)

### Transfer Routes (`/transfer`)
- `POST /transfer/transfer` - Initiate money transfer (protected)
- `GET /transfer/sent` - Get all sent transfers (protected)
- `GET /transfer/received` - Get all received transfers (protected)
- `GET /transfer/all` - Get all transfers (protected)
- `GET /transfer/:id` - Get transfer by ID (protected)
- `GET /transfer/filters` - Get filtered transactions (protected)
- `GET /transfer/last-5` - Get last 5 transactions (protected)

### Beneficiary Routes (`/beneficiary`)
- `POST /beneficiary/beneficiaries` - Add new beneficiary (protected)
- `GET /beneficiary/beneficiaries` - Get all beneficiaries (protected)
- `GET /beneficiary/beneficiaries/:id` - Get beneficiary by ID (protected)
- `PUT /beneficiary/beneficiaries/:id` - Update beneficiary (protected)
- `DELETE /beneficiary/beneficiaries/:id` - Delete beneficiary (protected)

---

## 🏗️ Database Schema

### User Model
- **Fields**: id, email, name, username, dob, address, city, postalCode, phoneNumber, profilePictureUrl, number, password, refreshToken
- **Relationships**: Has many accounts, beneficiaries, and transactions

### Account Model
- **Fields**: id, userId, type (Savings/Current), category (ZeroBalance/General/Classic/Premium/Imperial)
- **Relationships**: Belongs to user, has one balance, has many transactions and beneficiaries

### Transaction Model
- **Fields**: id, amount, timestamp, status, type, description, fromAccountId, toAccountId, userId
- **Relationships**: Belongs to user, references from/to accounts

### Balance Model
- **Fields**: id, amount, accountId, timestamp
- **Relationships**: Belongs to account, linked to transactions

### Beneficiary Model
- **Fields**: id, accountId, userId, name, accountNumber, bankName, ifscCode, email, phone
- **Relationships**: Belongs to user and account

---

## 📁 Project Structure

```
bank-app/
├── transsacto-client/          # Frontend React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── Layout.tsx     # Main layout wrapper
│   │   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   │   └── theme-*.tsx    # Theme management
│   │   ├── pages/             # Application pages
│   │   │   ├── Dashboard.tsx  # Main dashboard
│   │   │   ├── SignIn.tsx     # Login page
│   │   │   ├── SignUp.tsx     # Registration page
│   │   │   ├── Transfer.tsx   # Money transfer page
│   │   │   ├── Transactions.tsx # Transaction history
│   │   │   ├── Beneficiaries.tsx # Beneficiary management
│   │   │   └── Settings.tsx   # User settings
│   │   ├── lib/               # Utility libraries
│   │   │   ├── utils.ts       # Common utilities
│   │   │   └── axiosClient.ts # API client configuration
│   │   └── hooks/             # Custom React hooks
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tailwind.config.ts     # Tailwind CSS configuration
│   └── tsconfig.json          # TypeScript configuration
├── server/                     # Backend Node.js application
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   │   ├── user.controller.ts
│   │   │   ├── transfer.controller.ts
│   │   │   └── beneficiary.controller.ts
│   │   ├── routes/            # API route definitions
│   │   │   ├── user.routes.ts
│   │   │   ├── transfer.routes.ts
│   │   │   └── beneficiary.routes.ts
│   │   ├── middlewares/       # Express middlewares
│   │   │   ├── auth.middleware.ts
│   │   │   └── multer.middleware.ts
│   │   ├── utils/             # Utility functions
│   │   │   ├── apiError.ts
│   │   │   ├── apiResponse.ts
│   │   │   ├── asyncHandler.ts
│   │   │   └── cloudinary.ts
│   │   ├── app.ts             # Express app configuration
│   │   └── index.ts           # Server entry point
│   ├── prisma/                # Database configuration
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # Database migrations
│   ├── package.json           # Backend dependencies
│   └── tsconfig.json          # TypeScript configuration
└── README.md                  # Project documentation
```

---

## 🔧 Development Scripts

### Frontend (`transsacto-client`)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend (`server`)
```bash
npm run dev          # Start development server with auto-reload
npm run build        # Compile TypeScript to JavaScript
npm run watch        # Watch and compile TypeScript
npm start           # Start production server
```

---

## 🚀 Deployment

### Frontend Deployment
The frontend is configured for deployment on platforms like Vercel, Netlify, or similar:

```bash
# Build the application
npm run build

# The dist/ folder contains the production build
```

### Backend Deployment
The backend can be deployed on platforms like Railway, Heroku, or similar:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

## 👥 Development Team

- **Backend Developer**: [@sincerelyyyash](https://github.com/sincerelyyyash)
- **Frontend Developer**: [@simran903](https://github.com/simran903)

---

## 📄 License

This project is licensed under the ISC License.

---

## 🔍 Additional Information

### Security Features
- JWT-based authentication with secure token management
- Password encryption using bcrypt with salt rounds
- Protected API routes with middleware authentication
- Input validation using Zod schemas
- CORS configuration for secure cross-origin requests

### Performance Optimizations
- Vite for fast development and build times
- React 18 with concurrent features
- Lazy loading and code splitting
- Optimized database queries with Prisma
- Efficient state management with React hooks

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design
- Progressive Web App capabilities
