# Unstop Clinikally Challenge App

## Click on the image to open website
<a href="https://clinikally-api.vercel.app/">
   <img src="https://github.com/user-attachments/assets/0c18c78f-fbbf-4791-838d-ecb06a6521e3" alt="Website Preview" />
</a>

## 🔗 Related Repositories
- **Frontend**: [clinikally-app](https://github.com/the-r3aper7/clinikally-app)
- **Backend**: [clinikally-api](https://github.com/your-username/clinikally-api)

## Screenshots
<div align="center">
   <div>
      <img src="https://github.com/user-attachments/assets/8f31ed8e-5e7f-4ac8-afe0-6c3e96234c4a" width="30%" alt="IMG_20241027_235248_641" />
      <img src="https://github.com/user-attachments/assets/b8821dd3-1241-4b53-b507-5c2b7a6cddf3" width="30%" alt="IMG_20241027_235248_207" />
      <img src="https://github.com/user-attachments/assets/a0758cfa-9f80-42c5-b6d1-b8197b3a34ac" width="30%" alt="IMG_20241027_235249_015" />
      <img src="https://github.com/user-attachments/assets/12a56e65-d4db-49e5-9bb1-6bad3542b784" width="30%" alt="IMG_20241027_235249_043" />
      <img src="https://github.com/user-attachments/assets/01d3ff36-1705-4c7f-8642-2ea9582ee7bd" width="30%" alt="IMG_20241027_235248_297" />
      <img src="https://github.com/user-attachments/assets/a1aa0ef8-637d-4a47-9885-81794af71bae" width="30%" alt="IMG_20241027_235248_641" />
      <img src="https://github.com/user-attachments/assets/0657433a-5dfc-4ae5-a393-bce96d840a2b" width="30%" alt="IMG_20241027_235248_641" />
      <img src="https://github.com/user-attachments/assets/faf6670c-697c-4ad5-a97c-86ed54270ce3" width="30%" alt="IMG_20241027_235248_831" />
      <img src="https://github.com/user-attachments/assets/469941d6-8bfd-4445-8b9a-368064ce0083" width="30%" alt="IMG_20241027_235248_781" />
   </div>
</div>


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
│   ├── components/   # Reusable UI components
│   ├── context/      # React Context providers
│   ├── services/     # API service integrations
│   ├── theme/        # Theme configuration files
│   ├── types/        # TypeScript type definitions
│   ├── screens/      # Application screens
│   └── navigation/   # Navigation configuration
├── assets/           # Static assets (images, fonts, etc.)
└── app.json          # Expo configuration file
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

2. **Frontend**
    - React Native with Expo
    - TypeScript
    - React Query for data fetching
    - Expo Router for navigation
    - React Native Reanimated for animations

3. **Backend**
    - FastAPI
    - Python
    - Vercel for deployment

4. **Tools & Libraries**
    - Expo Vector Icons
    - React Native Safe Area Context
    - React Native Gesture Handler

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
