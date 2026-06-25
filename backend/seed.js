const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  // ============================================
  // ELECTRONICS - 10 Items
  // ============================================
  {
    name: "MacBook Pro 16 M3",
    description: "Apple M3 Pro chip, 16-inch Liquid Retina XDR display, 36GB RAM, 512GB SSD, 22-hour battery life",
    price: 2499.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    stock: 10
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation, 30-hour battery life, premium sound quality, comfortable design",
    price: 399.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    stock: 15
  },
  {
    name: "Apple Watch Ultra 2",
    description: "49mm titanium case, always-on Retina display, GPS + Cellular, health monitoring, dive computer",
    price: 799.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    stock: 20
  },
  {
    name: "Samsung 4K Smart Monitor",
    description: "32-inch 4K UHD display, HDR10+, built-in speakers, USB-C connectivity, smart TV features",
    price: 499.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    stock: 12
  },
  {
    name: "iPad Pro 12.9 M2",
    description: "12.9-inch Liquid Retina XDR display, M2 chip, 256GB storage, Apple Pencil support, 10-hour battery",
    price: 1099.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    stock: 10
  },
  {
    name: "DJI Mini 4 Pro Drone",
    description: "4K HDR video, 34-min flight time, omnidirectional obstacle sensing, 20MP photos, lightweight",
    price: 759.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400",
    stock: 7
  },
  {
    name: "GoPro Hero 12 Black",
    description: "5.3K video, 27MP photos, HyperSmooth 6.0 stabilisation, waterproof, 2.7-hour battery",
    price: 449.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=400",
    stock: 12
  },
  {
    name: "Bose QuietComfort Earbuds",
    description: "Premium noise-cancelling earbuds, 8.5-hour battery, IPX4 waterproof, wireless charging",
    price: 299.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    stock: 18
  },
  {
    name: "Canon EOS R6 Mark II",
    description: "24.2MP full-frame sensor, 4K 60p video, 12fps continuous shooting, advanced autofocus",
    price: 2499.00,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    stock: 5
  },
  {
    name: "HP Spectre x360 Laptop",
    description: "16-inch OLED touchscreen, Intel Core i7, 16GB RAM, 1TB SSD, 360-degree hinge",
    price: 1499.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    stock: 8
  },

  // ============================================
  // CLOTHING - 10 Items
  // ============================================
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with air cushioning, breathable mesh upper, durable rubber sole",
    price: 149.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    stock: 30
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight-fit jeans, 100% cotton, five-pocket design, iconic button fly",
    price: 89.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1585088388469-5a5d2a72d18e?w=400",
    stock: 25
  },
  {
    name: "Adidas Ultraboost Light",
    description: "Lightweight running shoes with responsive boost technology, flexible fit, energy return",
    price: 179.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    stock: 20
  },
  {
    name: "Polo Ralph Lauren Classic Shirt",
    description: "Iconic polo shirt, 100% cotton, embroidered logo, classic fit, machine washable",
    price: 89.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400",
    stock: 30
  },
  {
    name: "Levi's Trucker Denim Jacket",
    description: "Classic denim jacket, button closure, chest pockets, adjustable waist, timeless style",
    price: 129.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400",
    stock: 20
  },
  {
    name: "Zara Floral Summer Dress",
    description: "Elegant floral print dress, lightweight cotton fabric, knee-length, perfect for summer",
    price: 69.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400",
    stock: 15
  },
  {
    name: "Nike Tech Fleece Hoodie",
    description: "Premium fleece hoodie, soft and warm, adjustable hood, kangaroo pocket, regular fit",
    price: 119.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    stock: 25
  },
  {
    name: "Puma Unisex Sneakers",
    description: "Classic unisex sneakers, cushioned sole, durable material, versatile style",
    price: 79.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400",
    stock: 30
  },
  {
    name: "H&M Cotton T-Shirt Pack",
    description: "Pack of 3 premium cotton t-shirts, soft fabric, regular fit, multiple colors",
    price: 39.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    stock: 50
  },
  {
    name: "Forever 21 Winter Coat",
    description: "Stylish winter coat, quilted design, warm lining, zip closure, versatile for winter",
    price: 159.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400",
    stock: 10
  },

  // ============================================
  // BOOKS - 10 Items
  // ============================================
  {
    name: "Atomic Habits by James Clear",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones - Transform your life with small changes",
    price: 19.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    stock: 40
  },
  {
    name: "The Psychology of Money by Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness - understanding financial behavior",
    price: 22.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    stock: 35
  },
  {
    name: "1984 by George Orwell",
    description: "A dystopian novel about totalitarianism, surveillance, and the power of truth",
    price: 15.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400",
    stock: 50
  },
  {
    name: "The Great Gatsby by F. Scott Fitzgerald",
    description: "A story of wealth, love, and the American Dream in the Jazz Age",
    price: 12.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
    stock: 45
  },
  {
    name: "The Alchemist by Paulo Coelho",
    description: "A novel about following your dreams and listening to your heart",
    price: 16.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    stock: 50
  },
  {
    name: "Rich Dad Poor Dad by Robert Kiyosaki",
    description: "What the rich teach their kids about money that the poor and middle class do not",
    price: 18.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    stock: 30
  },
  {
    name: "The Art of War by Sun Tzu",
    description: "Ancient Chinese military treatise - strategy, tactics, and leadership wisdom",
    price: 14.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    stock: 40
  },
  {
    name: "To Kill a Mockingbird by Harper Lee",
    description: "A classic novel about racial injustice, moral growth, and courage",
    price: 13.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400",
    stock: 45
  },
  {
    name: "Sapiens by Yuval Noah Harari",
    description: "A brief history of humankind - from evolution to modern society",
    price: 24.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    stock: 25
  },
  {
    name: "The Power of Habit by Charles Duhigg",
    description: "Why we do what we do in life and business - understanding habit formation",
    price: 17.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    stock: 35
  },

  // ============================================
  // HOME & LIVING - 10 Items
  // ============================================
  {
    name: "IKEA MALM Desk",
    description: "Minimalist white desk with clean lines, perfect for home office, sturdy construction",
    price: 249.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400",
    stock: 8
  },
  {
    name: "Philips Hue Smart Bulb",
    description: "Color-changing smart bulb, compatible with Alexa & Google Home, energy efficient",
    price: 39.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=400",
    stock: 30
  },
  {
    name: "Memory Foam Orthopedic Pillow",
    description: "Ergonomic pillow with memory foam, provides neck support for better sleep",
    price: 49.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=400",
    stock: 25
  },
  {
    name: "Premium Stainless Steel Cookware",
    description: "10-piece non-stick cookware set, dishwasher safe, induction compatible",
    price: 199.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1584990347449-85ab9b1d0b0f?w=400",
    stock: 12
  },
  {
    name: "Dyson V15 Cordless Vacuum",
    description: "Powerful cordless vacuum with laser detection, 60-min runtime, advanced filtration",
    price: 699.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400",
    stock: 8
  },
  {
    name: "Samsung Smart Refrigerator",
    description: "French door refrigerator with smart features, water dispenser, energy efficient",
    price: 1999.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1567696911980-2ee69ceaf50c?w=400",
    stock: 5
  },
  {
    name: "Aeropress Coffee Maker",
    description: "Portable coffee maker, quick brewing, rich flavour, easy to clean",
    price: 39.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
    stock: 20
  },
  {
    name: "Samsung 55-inch OLED TV",
    description: "55-inch 4K OLED smart TV, HDR10+, Dolby Atmos, built-in voice assistant",
    price: 1499.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    stock: 6
  },
  {
    name: "Bear 4K Projector",
    description: "Home theater projector, 4K resolution, 120-inch screen, built-in speakers",
    price: 499.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1540574163023-2a3fd9d2b8c8?w=400",
    stock: 10
  },
  {
    name: "Vitamix Professional Blender",
    description: "High-performance blender, powerful motor, self-cleaning, 8-year warranty",
    price: 349.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400",
    stock: 15
  },

  // ============================================
  // BEAUTY & PERSONAL CARE - 10 Items
  // ============================================
  {
    name: "Dyson Supersonic Hair Dryer",
    description: "Professional hair dryer, intelligent heat control, fast drying, quiet operation",
    price: 399.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400",
    stock: 10
  },
  {
    name: "Philips Sonicare Toothbrush",
    description: "Electric toothbrush with sonic technology, 3 cleaning modes, pressure sensor",
    price: 129.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?w=400",
    stock: 20
  },
  {
    name: "Braun Series 9 Shaver",
    description: "Premium electric shaver, 5 cutting elements, flexible head, 60-min runtime",
    price: 299.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1571799819382-8d4e25ea8d62?w=400",
    stock: 15
  },
  {
    name: "Luxury Perfume Gift Set",
    description: "Set of 5 premium fragrances, 30ml each, perfect gift for special occasions",
    price: 89.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",
    stock: 25
  },
  {
    name: "Professional Makeup Kit",
    description: "Complete makeup kit with 50 items, premium quality, suitable for all skin types",
    price: 149.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400",
    stock: 20
  },
  {
    name: "Electric Hair Straightener",
    description: "Ceramic plate hair straightener, 6 temperature settings, 30-min auto shutoff",
    price: 79.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400",
    stock: 30
  },
  {
    name: "Facial Cleansing Brush",
    description: "Sonic facial cleansing brush with 3 speeds, waterproof, USB rechargeable",
    price: 59.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    stock: 25
  },
  {
    name: "Men's Grooming Kit",
    description: "Complete grooming kit, 10-piece set, includes comb, scissors, trimmer",
    price: 69.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400",
    stock: 20
  },
  {
    name: "Organic Skincare Set",
    description: "Natural skincare set with 5 products, organic ingredients, chemical-free",
    price: 99.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400",
    stock: 15
  },
  {
    name: "Professional Nail Art Kit",
    description: "Complete nail art kit with LED lamp, 20 colors, tools and accessories",
    price: 49.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400",
    stock: 30
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Existing products cleared');
    
    // Insert new products
    await Product.insertMany(products);
    console.log('✅ Database seeded successfully!');
    console.log(`📦 ${products.length} products added to database`);
    console.log('📊 Category wise:');
    console.log('   Electronics: 10');
    console.log('   Clothing: 10');
    console.log('   Books: 10');
    console.log('   Home: 10');
    console.log('   Beauty: 10');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDB();