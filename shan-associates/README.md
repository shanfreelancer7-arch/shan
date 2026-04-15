# SHAN ASSOCIATES - Building Materials Supplier

A full-stack web application for Shan Associates, a building materials supplier based in Tirur, Kerala. The platform allows customers to browse products, place orders, request quotes, and contact the business.

## 🚀 Live Demo (Coming Soon)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment on AWS](#deployment-on-aws)
- [GitHub Repository Setup](#github-repository-setup)
- [Contributors](#contributors)
- [License](#license)

## ✨ Features

### Public Pages
- **Home Page** – Hero section, product highlights, CTAs
- **About Us** – Company info, founder (Umarul Farooque), team (Musthafa, Aslam), service area (Tirur, Kerala)
- **Products** – Categorized listing with brands:
  - TMT: Kairali, Bharathy, Prince, Steelex
  - Cement: ACC, UltraTech, Chettinad, JSW, Dalmia
  - Pipes: Demac, Apollo
  - Roofing Sheets: Jindal
  - Tile Adhesives: UltraTech
  - UPVC Rain Gutters: Aizer
- **Contact Us** – Working hours, email, WhatsApp, Google Maps, contact form

### Authentication
- User registration & login with JWT tokens
- Protected routes (orders/quotes require login)

### Authenticated Features
- Place orders (with address & phone)
- Request quotes (with optional message)
- WhatsApp confirmation after quote request
- Floating WhatsApp chat button on all pages

### Backend API
- RESTful API using Django REST Framework
- MongoDB database via Djongo
- JWT authentication
- Endpoints for products, orders, quotes

## 🛠️ Tech Stack

| Layer       | Technology                                                                 |
|-------------|----------------------------------------------------------------------------|
| Frontend    | React, Bootstrap, CSS, JavaScript, Axios                                  |
| Backend     | Django, Django REST Framework, Python                                     |
| Database    | MongoDB (via Djongo)                                                      |
| Authentication | JWT (Simple JWT)                                                       |
| Deployment  | AWS (Elastic Beanstalk for backend, S3 + CloudFront for frontend)         |
| Version Control | Git & GitHub                                                          |

## 📁 Project Structure
shan-associates/
├── backend/
│ ├── manage.py
│ ├── requirements.txt
│ ├── .env
│ ├── shan_backend/
│ │ ├── init.py
│ │ ├── settings.py
│ │ ├── urls.py
│ │ ├── wsgi.py
│ ├── api/
│ │ ├── init.py
│ │ ├── admin.py
│ │ ├── models.py
│ │ ├── serializers.py
│ │ ├── views.py
│ │ ├── urls.py
│ │ ├── utils.py
├── frontend/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.js
│ │ │ ├── Home.js
│ │ │ ├── About.js
│ │ │ ├── Products.js
│ │ │ ├── Contact.js
│ │ │ ├── Login.js
│ │ │ ├── QuoteModal.js
│ │ │ ├── OrderModal.js
│ │ │ ├── WhatsAppButton.js
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── index.css
│ │ ├── api.js
│ │ ├── AuthContext.js
│ ├── package.json
│ ├── .env
├── README.md
└── deployment_guide.md

text

## 📦 Prerequisites

- Python 3.9+
- Node.js 16+
- MongoDB Atlas account (or local MongoDB)
- Git

## 🔧 Setup Instructions

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
Create virtual environment

bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
Install dependencies

bash
pip install -r requirements.txt
Create .env file in backend/ with:

text
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shan_associates
SECRET_KEY=your-secret-key
DEBUG=True
Run migrations

bash
python manage.py makemigrations
python manage.py migrate
Create superuser (admin)

bash
python manage.py createsuperuser
Populate products (optional – or use admin panel)

bash
python manage.py shell
Then run the product creation script (see utils.py or add manually via admin).

Run backend server

bash
python manage.py runserver
Backend will run at http://localhost:8000

Frontend Setup
Navigate to frontend folder

bash
cd frontend
Install dependencies

bash
npm install
Create .env file in frontend/ with:

text
REACT_APP_API_URL=http://localhost:8000/api/
REACT_APP_WHATSAPP_NUMBER=919876543210
Start React app

bash
npm start
Frontend will run at http://localhost:3000

🌐 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/register/	User registration	No
POST	/api/login/	Obtain JWT token	No
POST	/api/token/refresh/	Refresh JWT token	No
GET	/api/products/	List all products	No
POST	/api/orders/	Place order	Yes
GET	/api/my-orders/	View user orders	Yes
POST	/api/quotes/	Request quote	Yes
GET	/api/my-quotes/	View user quotes	Yes
🔐 Environment Variables
Backend (.env)
MONGO_URI – MongoDB connection string

SECRET_KEY – Django secret key

DEBUG – Set to True for development

Frontend (.env)
REACT_APP_API_URL – Backend API URL

REACT_APP_WHATSAPP_NUMBER – Business WhatsApp number

☁️ Deployment on AWS
Backend (Django) – AWS Elastic Beanstalk
Install EB CLI

Initialize EB:

bash
eb init -p python-3.9 shan-backend
Create ebextensions/django.config with environment variables.

Deploy:

bash
eb create shan-backend-env
Frontend (React) – AWS S3 + CloudFront
Build the project:

bash
npm run build
Create S3 bucket, enable static hosting.

Upload build/ folder contents.

(Optional) Add CloudFront for HTTPS and custom domain.

MongoDB Atlas
Use MongoDB Atlas cloud database – already configured via connection string.

📂 GitHub Repository Setup
bash
git init
git add .
git commit -m "Initial commit - Shan Associates full-stack app"
git remote add origin https://github.com/yourusername/shan-associates.git
git push -u origin main
👥 Contributors
Umarul Farooque – Founder & Business Owner

Musthafa – Operations

Aslam – Sales Manager

Development Team – Full-stack implementation

📄 License
This project is proprietary to Shan Associates. Unauthorized distribution is prohibited.

📞 Contact
For any inquiries: shanassociates2020@gmail.com
WhatsApp: Click the green button on the website.

Happy Building! 🏗️

text

Save this as `README.md` in the root of your `shan-associates` folder.