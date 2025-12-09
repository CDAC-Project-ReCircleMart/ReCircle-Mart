# Olx-Style-WebApplication

This project is an online marketplace where users can buy and sell products, similar to OLX.  
It was developed as part of the CDAC academic project to demonstrate full-stack web development using modern technologies like mern stack.

---

## 👥 Team Members

- Prashant Kumar
- Rohit Kavethekar
- Harsh Kumar
- Om Dhavale

---

## 🧰 Tech Stack

- **Frontend:** React.js (Vite)
- **Backend:** Express.js, Node.js
- **Database:** MySQL
- **Hosting:** Render / Netlify

---

## 🚀 Features

- User Registration & Login
- Post, Edit & Delete Product Listings
- Product Search and Filtering
- Image Upload Functionality
- Responsive and User-Friendly Interface

---

## 📡 API Endpoints (Summary)

### **Auth Routes**
| Method | Endpoint        | Description               |
|--------|----------------|---------------------------|
| POST   | `/auth/register` | Register new user        |
| POST   | `/auth/login`    | Login & generate token   |

### **Product Routes**
| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| POST   | `/products`         | Create new listing           |
| GET    | `/products`         | Get all products (with filters) |
| GET    | `/products/:id`     | Get single product details    |
| PUT    | `/products/:id`     | Update listing                |
| DELETE | `/products/:id`     | Delete listing                |

### **Upload Route**
| Method | Endpoint         | Description               |
|--------|-------------------|---------------------------|
| POST   | `/upload/image`   | Upload product image      |

---

## ⚙️ How to Run Locally

```bash
# Clone the repository
git clone https://github.com/CDAC-Project-Olx-Style/Olx-Style-WebApplication.git


# Navigate into the project folder
cd olx-style-webapp

# Install dependencies
npm install

# Start the development server
npm run dev
```
