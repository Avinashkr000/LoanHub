# LoanHub - Full Stack Loan Management Application

A comprehensive full-stack loan management system with user authentication, loan applications, real-time tracking, and admin dashboard.

## 🚀 Features

### User Features
- ✅ User Authentication (Sign up, Login, JWT)
- ✅ Loan Application Form with Real-time EMI Calculation
- ✅ Dashboard with Loan Status Tracking
- ✅ Payment History
- ✅ Profile Management
- ✅ Responsive UI Design

### Admin Features
- ✅ Admin Dashboard
- ✅ Approve/Reject Loans
- ✅ User Management
- ✅ Payment Management
- ✅ Loan Application Tracking

## 🛠️ Tech Stack

### Frontend
- React 18.x
- CSS3 & Responsive Design
- Axios for API calls
- React Router for navigation

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Helmet for security
- CORS enabled

### DevOps
- Docker & Docker Compose
- MongoDB Container
- Express Server Container
- React App Container with Nginx

## 📁 Project Structure

```
LoanHub/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Loan.js
│   │   │   └── Payment.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── loans.js
│   │   │   ├── users.js
│   │   │   └── payments.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoanApplicationPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── LoanApplication.css
│   │   │   ├── Admin.css
│   │   │   └── Navbar.css
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB
- npm or yarn
- Docker (optional)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env

# Update .env with your MongoDB URI
MONGODB_URI=mongodb://localhost:27017/loanhub
JWT_SECRET=your_super_secret_jwt_key
PORT=5000

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env

# Update .env
REACT_APP_API_URL=http://localhost:5000

# Start development server
npm start
```

### Docker Setup

```bash
# Build and start all services
docker-compose up

# Server will be available at http://localhost:5000
# Frontend will be available at http://localhost:3000
# MongoDB will be running on port 27017
```

## 📝 Environment Variables

### Backend (.env)
```
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/loanhub

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# Email Configuration (Optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_from_google

# CORS
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## 🔐 Authentication

- JWT-based authentication
- Secure password hashing with bcrypt (salt rounds: 10)
- Protected routes with middleware
- Token expiry: 7 days

## 📊 Database Schema

### User Model
- name, email, password, phone
- role (user/admin)
- address, city, state, zipCode
- aadharNumber, panNumber
- monthlyIncome, employmentType, company
- timestamps

### Loan Model
- userId (ref: User)
- loanAmount, loanTerm, loanType
- interestRate (default: 12%)
- monthlyEMI, totalInterest, totalAmount
- status (Pending/Approved/Rejected/Disbursed/Completed)
- purpose, documents
- timestamps

### Payment Model
- loanId (ref: Loan)
- userId (ref: User)
- amount, paymentDate, dueDate
- status (Pending/Completed/Failed/Overdue)
- transactionId, paymentMethod
- timestamps

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Loans
- `POST /api/loans` - Create new loan application
- `GET /api/loans` - Get user's loans
- `GET /api/loans/:id` - Get specific loan details
- `PUT /api/loans/:id` - Update loan status (admin)
- `DELETE /api/loans/:id` - Delete loan application

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin)

### Payments
- `POST /api/payments` - Record new payment
- `GET /api/payments` - Get payment history

## 🎨 Frontend Features

### Pages
- **Login Page**: User authentication
- **Register Page**: New user registration
- **Dashboard**: User's loan overview and statistics
- **Loan Application**: Apply for new loan with real-time EMI calculation
- **Admin Dashboard**: Manage loans and users

### UI Components
- Responsive Navbar with user info
- Form validation
- Alert messages (success/error)
- Status badges
- Statistics cards
- Table views

## 💰 Loan Calculation

EMI Calculation Formula:
```
monthlyRate = annualRate / 12 / 100
monthlyEMI = P × r × (1+r)^n / ((1+r)^n - 1)
totalAmount = monthlyEMI × numberOfPayments
totalInterest = totalAmount - loanAmount
```

Default Interest Rate: 12% per annum

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token validation
- CORS middleware
- Helmet for HTTP headers
- Input validation
- Protected routes

## 🚀 Deployment

### Using Docker
```bash
docker-compose up --build
```

### Using Render/Railway
1. Create accounts on Render or Railway
2. Connect GitHub repository
3. Set environment variables
4. Deploy backend to Render
5. Deploy frontend to Render/Vercel

### Manual Deployment
1. Install dependencies
2. Build React app: `npm run build`
3. Start Node server: `npm start`

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📚 API Testing

Use Postman or similar tools with the API endpoints listed above.

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

### Backend Port Already in Use
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Errors
- Verify REACT_APP_API_URL matches backend URL
- Check CORS configuration in server.js

## 📖 Documentation

Detailed API documentation available in the code comments.

## 🤝 Contributing

Feel free to fork this project and submit pull requests.

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Avinash Kumar**
- Backend Developer specializing in Java & Spring Boot
- Experience: 2+ years in fintech application development
- GitHub: [@Avinashkr000](https://github.com/Avinashkr000)
- Email: avinashkr000@gmail.com

## 🙌 Support

For support, issues, or questions:
1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Email avinashkr000@gmail.com

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Razorpay, Stripe)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced analytics dashboard
- [ ] Loan recommendation engine
- [ ] Mobile app (React Native)
- [ ] Document upload and verification
- [ ] Real-time notifications (Socket.io)
- [ ] Multi-language support
- [ ] Advanced search and filters

---

**Made with ❤️ for the fintech community**