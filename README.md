# MyShop
Web shop project created with MERN stack.

![MyShop](/frontend/public/MyShop1.jpg)

## Demo Website

- 👉 Heroku : [https://my-shop-pm-app.herokuapp.com](https://my-shop-pm-app.herokuapp.com)

![MyShop](/frontend/public/MyShop2.jpg)

## Run Locally

### 1. Clone repo
### 2. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb://localhost/myshop  

### 3. Run Backend

```
$ npm install
$ npm start
```

### 4. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 5. Create sample users and products

- Run this on chrome: http://localhost:5000/api/users/sample
- It returns admin email and password
- Run this on chrome: http://localhost:5000/api/products/sample
- It creates 6 sample products

### 6. Admin Login

- Click 'Sign in' or Run http://localhost:3000/signin
- Enter admin email and password and click signin
