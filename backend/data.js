import bcrypt from 'bcrypt'
const data = {
  users: [
    {
      name: 'Admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234',10),
      isAdmin: true,
    },
    {
      name: 'George',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234',10),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Slim Jeans',
      category: 'Female',
      avatar: '/images/1.jpg',
      price: 160,
      qty: 10,
      brand: 'Lewis',
      description: 'High quality, very nice jeans',
    },
    {
      name: ' Blue Jeans',
      category: 'Female',
      avatar: '/images/2.jpg',
      price: 140,
      qty: 10,
      brand: 'Lewis',
      description: 'High quality, very nice jeans',
    },
    {
      name: 'Male Jeans',
      category: 'Male',
      avatar: '/images/3.jpg',
      price: 160,
      qty: 12,
      brand: 'Lewis',
      description: 'High quality, very nice jeans',
    },
    {
      name: 'Bright Jeans',
      category: 'Female',
      avatar: '/images/4.jpg',
      price: 50,
      qty: 6,
      brand: 'Lewis',
      description: 'High quality, very nice jeans',
    },
    {
      name: 'Holes Jeans',
      category: 'Female',
      avatar: '/images/5.jpg',
      price: 120,
      qty: 10,
      brand: 'Lewis',
      description: 'High quality, very nice jeans',
    },
    {
      name: 'Stylish Jeans',
      category: 'Female',
      avatar: '/images/6.jpg',
      price: 120,
      qty: 10,
      brand: 'Lewis',
      description: 'High quality, very nice jeans',
    },
    
  ],
};
export default data;