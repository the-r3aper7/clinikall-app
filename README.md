# Unstop Clinikally Challenge App

A React Native Expo application for e-commerce product listing and delivery estimation based on pincode verification.

## Screenshots


## 🚀 Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Expo CLI installed globally
- iOS Simulator (for Mac users) or Android Studio (for Android development)

### Installation Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/the-r3aper7/clinikally-app.git
   cd clinikally-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   - Press `i` to launch on iOS simulator
   - Press `a` to launch on Android emulator
   - Scan the QR code with the Expo Go app to run on a physical device

## 🏗 Project Structure
```
clinikally-app/
├── src/
│   ├── components/    # Reusable UI components
│   ├── context/      # React Context providers
│   ├── services/     # API service integrations
│   ├── theme/        # Theme configuration files
│   ├── types/        # TypeScript type definitions
│   ├── screens/      # Application screens
│   └── navigation/   # Navigation configuration
├── assets/           # Static assets (images, fonts, etc.)
└── app.json         # Expo configuration file
```

## 🎯 Key Features
- Product listing with infinite scroll pagination
- Detailed product information view
- Pincode-based delivery estimation system
- Comprehensive cart functionality
- Real-time delivery status tracking
- Dynamic stock status indication

## 🤔 Assumptions & Design Decisions

### Technical Decisions

1. **API Implementation**
   - Combined large CSV files (`Products.csv` and `Stock.csv`) into a single file for efficient data management
   - Sourced product images from Google Images for demonstration purposes
   - Implemented data transformation using Python scripts
   - Structured JSON format for the combined data:
     ```json
     {
       "products": [
         {
           "product_id": 1,
           "product_name": "Product 1",
           "price": 63.54,
           "in_stock": true,
           "product_image": "https://s.cdnsbn.com/images/products/l/33535402744.jpg"
         },
         ...
       ],
       "delivery_info": {
         "pincode_data": [
           {
             "pincode": 100000,
             "logistics_provider": "Provider B",
             "delivery_tat_days": 3
           },
           ...
         ]
       }
     }
     ```
   - Implemented server-side pagination for optimal API response times

2. **Framework Implementation**
   - Utilized React Query for efficient server state management
   - Leveraged Expo framework for cross-platform compatibility
   - Implemented FastAPI for robust server-side operations
   - Employed React Context for cart and global application state management

### Design Decisions

1. **UI Architecture**
   - Implemented stack-based navigation for intuitive user flow
   - Developed three primary screens:
     - **Home Screen**
       - Features infinite scrolling for efficient large dataset handling
       - Implements product card navigation to detail view
     - **Product Details Screen**
       - Displays comprehensive product information with images
       - Includes pincode validation functionality
       - Features countdown timer for time-sensitive operations
       - Implements cart integration functionality
     - **Cart Screen**
       - Displays current cart items (demonstration purposes)
       - Implements non-persistent storage

2. **Styling Implementation**
   - Utilized React Native's StyleSheet API for optimized performance
   - Established centralized theme configuration
   - Implemented platform-specific style adaptations

## 🔧 API Requirements

The application interfaces with the following API endpoints:

```typescript
// Product List
GET /api/products
Response: {
  items: Array<{
    product_id: number;
    product_name: string;
    price: number;
    in_stock: boolean;
    product_image: string;
  }>;
  total: number;
  page: number;
  total_pages: number;
}

// Product Details
GET /api/products/:id
Response: {
  product_id: number;
  product_name: string;
  price: number;
  in_stock: boolean;
  product_image: string;
}

// Pincode Verification
GET /api/pincode/:code
Response: {
  pincode: number;
  logistics_provider: string;
  delivery_tat_days: number;
}
```

## 📱 Supported Platforms
- iOS devices running iOS 13 or later
- Android devices with API level 21 or higher
- Web browsers (basic functionality support)