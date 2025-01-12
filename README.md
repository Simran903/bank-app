11.24 1:37 PM
# Transsacto  

**Transsacto** is a modern banking application built using the PERN stack. This repository contains both the backend and frontend code.  

- **Frontend:** Developed by [@simran903](https://github.com/simran903), it features a dynamic, responsive user interface for managing accounts, transactions, and financial data visualization.  
- **Backend:** Developed by [@sincerelyyyash](https://github.com/sincerelyyyash), it provides a robust and secure RESTful API for handling user authentication, transfers, account management, and transaction history.  

---

## Application Overview  

### Frontend Features  
- **Dynamic Dashboard:** User-specific data, including account details, transaction history, and visual financial summaries.  
- **Beneficiary Management:** Add, update, delete, and view beneficiaries with an intuitive interface.  
- **Transaction Visualization:** Line charts to track monthly expenses using `react-chartjs-2`.  
- **Authentication:** Secure JWT-based authentication integrated with the backend.  
- **Responsive Design:** Optimized for all screen sizes using **Tailwind CSS**.  
- **Error Handling:** Friendly notifications for better user experience.  

### Backend Features  
- **User Authentication:** Secure user registration and login with JWT-based authentication.  
- **Transfers:**  
  - Initiate money transfers between accounts.  
  - Fetch sent, received, and all transactions for a user.  
  - Get filtered transactions based on date or amount.  
  - Fetch the last 5 transactions for quick access.  
- **Account Management:**  
  - Maintain balances for individual accounts.  
  - Secure and seamless fund transfers.  
- **Transaction History:**  
  - Retrieve details by transaction ID.  
  - Apply filters like date and amount.  
- **Security:** Middleware for JWT verification to ensure authorized access to protected routes.  

---

## Tools & Technologies Used  

### Frontend  
- **React.js** and **Next.js:** For building a responsive and scalable UI.  
- **Axios:** For making secure API requests.  
- **Tailwind CSS:** For utility-first, responsive styling.  
- **React Chart.js 2:** For creating interactive charts.  
- **Vercel:** For frontend deployment.  

### Backend  
- **Node.js:** Backend runtime environment.  
- **Express:** Web framework for building RESTful APIs.  
- **PostgreSQL:** Relational database for user accounts and transactions.  
- **Prisma:** ORM for database management and migrations.  
- **Cloudinary:** For managing user-related images (optional).  
- **Zod:** For schema validation to ensure proper data input.  

---

## How to Run the Application Locally  

### Prerequisites  
- **Node.js** (v14+)  
- **PostgreSQL**  
- **Prisma CLI**  
- **Cloudinary Account** (optional, for image uploads)  

### Backend Setup  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/Simran903/bank-app.git
   cd bank-app/server  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Set up environment variables:  
   Create a `.env` file in the root directory and add:  
   ```env  
   DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_database"  
   JWT_SECRET="your_jwt_secret"  
   CLOUDINARY_URL="cloudinary://your_cloudinary_key"  
   ```  

4. Run database migrations:  
   ```bash  
   npx prisma migrate dev  
   ```  

5. Start the server:  
   ```bash  
   npm run dev  
   ```  
   The backend will be running at `http://localhost:8000`.  

### Frontend Setup  
1. Navigate to the frontend directory:  
   ```bash  
   cd ../client  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Set up environment variables:  
   Create a `.env.local` file in the root directory and add:  
   ```env  
   NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"  
   ```  

4. Run the development server:  
   ```bash  
   npm run dev  
   ```  
   The frontend will be running at `http://localhost:3000`.  

---

## Deployment  
- **Frontend:** Deployed on **Vercel**. Visit the live application [here](https://transsacto.vercel.app/).

---

## Contributions  
Contributions are welcome! To contribute:  
- Fork the repository.  
- Make changes and commit.  
- Open a pull request for review.  

Backend developed by [@sincerelyyyash](https://github.com/sincerelyyyash).  
Frontend developed by [@simran903](https://github.com/simran903).
