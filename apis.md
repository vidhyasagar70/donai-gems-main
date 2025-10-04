# Gems Inventory API Documentation

## Base URL
```
http://localhost:3000/api
```

## Response Format

All API responses follow this consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": {},
  "message": "Optional message",
  "count": 10
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Health Check

### Check API Status
- **Endpoint:** `GET /api/health`
- **Description:** Check if the API is running
- **Access:** Public
- **Query Parameters:** None
- **Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Diamond Inventory API is running",
  "timestamp": "2025-08-07T12:00:00.000Z",
  "environment": "development"
}
```

**Response Codes:**
- `200` - Success
- `500` - Server error

---

## Gems/Diamonds API

### 1. Get All Gems (Paginated)
- **Endpoint:** `GET /api/gems`
- **Description:** Retrieve all gems with pagination
- **Access:** Public
- **Rate Limit:** Not specified

**Query Parameters:**
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 10)
- `sortBy` (string, optional) - Field to sort by (default: createdAt)
- `sortOrder` (string, optional) - Sort direction: asc/desc (default: desc)

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Gems fetched successfully",
  "data": [
    {
      "_id": "gem_id",
      "stockId": "GEM001",
      "productType": "jewelry",
      "category": "ring",
      "stoneType": "diamond",
      "color": "white",
      "shape": "round",
      "carat": 1.5,
      "origin": "south africa",
      "treatment": "none",
      "availability": true,
      "certificate": "GIA123456",
      "measurement": "6.5x6.5x4.0",
      "imageUrls": [],
      "videoUrls": [],
      "certificateUrls": [],
      "createdAt": "2025-08-07T12:00:00.000Z",
      "updatedAt": "2025-08-07T12:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalRecords": 100,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Response Codes:**
- `200` - Success
- `500` - Server error

### 2. Get All Gems (No Pagination)
- **Endpoint:** `GET /api/gems/all`
- **Description:** Retrieve all gems without pagination
- **Access:** Public

**Query Parameters:**
- `sortBy` (string, optional) - Field to sort by (default: createdAt)
- `sortOrder` (string, optional) - Sort direction: asc/desc (default: desc)

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "All gems fetched successfully",
  "data": [/* array of all gems */],
  "totalRecords": 1000
}
```

**Response Codes:**
- `200` - Success
- `500` - Server error

### 3. Search Gems with Filters
- **Endpoint:** `GET /api/gems/search`
- **Description:** Search gems with advanced filters and pagination
- **Access:** Public
- **Rate Limit:** 50 requests per 15 minutes

**Query Parameters:**
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 10)
- `sortBy` (string, optional) - Field to sort by (default: createdAt)
- `sortOrder` (string, optional) - Sort direction: asc/desc (default: desc)
- `stockId` (string, optional) - Filter by stock ID
- `productType` (string/array, optional) - Filter by product type
- `category` (string/array, optional) - Filter by category
- `stoneType` (string/array, optional) - Filter by stone type
- `color` (string/array, optional) - Filter by color
- `shape` (string/array, optional) - Filter by shape
- `origin` (string/array, optional) - Filter by origin
- `treatment` (string/array, optional) - Filter by treatment
- `certificate` (string/array, optional) - Filter by certificate
- `caratMin` (number, optional) - Minimum carat weight
- `caratMax` (number, optional) - Maximum carat weight
- `availability` (boolean, optional) - Filter by availability
- `searchTerm` (string, optional) - Search in stockId, stoneType, color, origin, certificate

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Gem search completed successfully",
  "data": [/* filtered gems array */],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 50,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "appliedFilters": {
    "stoneType": "diamond",
    "caratMin": 1.0,
    "availability": true
  },
  "totalFilteredRecords": 50
}
```

**Response Codes:**
- `200` - Success
- `500` - Server error

### 4. Get Filter Options
- **Endpoint:** `GET /api/gems/filter-options`
- **Description:** Get available filter options for UI dropdowns
- **Access:** Public
- **Rate Limit:** 50 requests per 15 minutes

**Query Parameters:** None
**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Filter options fetched successfully",
  "data": {
    "productType": ["jewelry", "Gem"],
    "category": ["ring", "necklace", "bracelet"],
    "stoneType": ["diamond", "ruby", "sapphire"],
    "color": ["white", "yellow", "blue"],
    "shape": ["round", "oval", "princess"],
    "origin": ["south africa", "india", "sri lanka"],
    "treatment": ["none", "heated", "enhanced"],
    "certificate": ["GIA", "IGI", "SSEF"]
  }
}
```

**Response Codes:**
- `200` - Success
- `500` - Server error

### 5. Create New Gem
- **Endpoint:** `POST /api/gems/create`
- **Description:** Create a new gem with validation
- **Access:** Public
- **Rate Limit:** 10 requests per minute

**Query Parameters:** None

**Request Body:**
```json
{
  "stockId": "GEM001",
  "productType": "jewelry",
  "category": "ring",
  "stoneType": "diamond",
  "color": "white",
  "shape": "round",
  "carat": 1.5,
  "origin": "south africa",
  "treatment": "none",
  "availability": true,
  "certificate": "GIA123456",
  "measurement": "6.5x6.5x4.0"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Gem created successfully",
  "data": {
    "_id": "gem_id",
    "stockId": "GEM001",
    /* ... other gem properties */
    "createdAt": "2025-08-07T12:00:00.000Z",
    "updatedAt": "2025-08-07T12:00:00.000Z"
  }
}
```

**Response Codes:**
- `201` - Created successfully
- `400` - Validation errors
- `500` - Server error

### 6. Bulk Create Gems
- **Endpoint:** `POST /api/gems/bulk-create`
- **Description:** Create multiple gems in bulk
- **Access:** Public
- **Rate Limit:** 5 requests per 5 minutes

**Query Parameters:** None

**Request Body:**
```json
[
  {
    "stockId": "GEM001",
    "productType": "jewelry",
    /* ... gem properties */
  },
  {
    "stockId": "GEM002",
    "productType": "jewelry",
    /* ... gem properties */
  }
]
```

**Response:**
```json
{
  "success": true,
  "message": "5 gems created successfully",
  "data": [/* array of created gems */],
  "count": 5
}
```

**Response Codes:**
- `201` - Created successfully
- `400` - Invalid input
- `500` - Server error

### 7. Update Gem
- **Endpoint:** `PUT /api/gems/:id`
- **Description:** Update a gem by ID
- **Access:** Public
- **Rate Limit:** 10 requests per minute

**Query Parameters:** None
**URL Parameters:**
- `id` (string, required) - Gem ID

**Request Body:**
```json
{
  "color": "yellow",
  "availability": false,
  /* ... any gem properties to update */
}
```

**Response:**
```json
{
  "success": true,
  "message": "Gem updated successfully",
  "data": {
    "_id": "gem_id",
    /* ... updated gem properties */
    "updatedAt": "2025-08-07T12:00:00.000Z"
  }
}
```

**Response Codes:**
- `200` - Updated successfully
- `400` - Validation errors
- `404` - Gem not found
- `500` - Server error

### 8. Delete Gem
- **Endpoint:** `DELETE /api/gems/:id`
- **Description:** Delete a gem by ID
- **Access:** Public
- **Rate Limit:** 10 requests per minute

**Query Parameters:** None
**URL Parameters:**
- `id` (string, required) - Gem ID

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Gem deleted successfully"
}
```

**Response Codes:**
- `200` - Deleted successfully
- `404` - Gem not found
- `500` - Server error

### 9. Bulk Delete Gems
- **Endpoint:** `POST /api/gems/bulk-delete`
- **Description:** Delete multiple gems by IDs
- **Access:** Public
- **Rate Limit:** 5 requests per minute

**Query Parameters:** None

**Request Body:**
```json
{
  "gemIds": ["gem_id_1", "gem_id_2", "gem_id_3"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "3 gems deleted successfully",
  "data": {
    "deletedCount": 3
  }
}
```

**Response Codes:**
- `200` - Deleted successfully
- `400` - Invalid input (empty array)
- `500` - Server error

---

## File Management API

### 10. Upload Files to Gem
- **Endpoint:** `POST /api/gems/S3Bucket/insert/:fileType/:id`
- **Description:** Upload files (images, videos, certificates) to a gem
- **Access:** Public

**URL Parameters:**
- `fileType` (string, required) - Type of file: "images", "videos", or "certificates"
- `id` (string, required) - Gem ID

**Query Parameters:** None

**Request Body:** Multipart form data with file uploads

**Response:**
```json
{
  "status": 200,
  "message": "Images uploaded successfully",
  "data": {
    "imageUrls": [
      "https://s3-bucket-url/image1.jpg",
      "https://s3-bucket-url/image2.jpg"
    ]
  }
}
```

**Response Codes:**
- `200` - Uploaded successfully
- `400` - Invalid ID or file type
- `500` - Server error

### 11. Get File URLs
- **Endpoint:** `GET /api/gems/S3Bucket/:fileType/:id?`
- **Description:** Get file URLs for specific gem or all gems with pagination
- **Access:** Public

**URL Parameters:**
- `fileType` (string, required) - Type of file: "images", "videos", or "certificates"
- `id` (string, optional) - Gem ID (if not provided, returns paginated results for all gems)

**Query Parameters (when id not provided):**
- `page` (number, optional) - Page number (default: 1)
- `limit` (number, optional) - Items per page (default: 10)

**Request Body:** None

**Response (for specific gem):**
```json
{
  "status": 200,
  "message": "images URLs retrieved successfully for gem 12345",
  "data": {
    "id": "gem_id",
    "imagesUrls": [
      "https://s3-bucket-url/image1.jpg",
      "https://s3-bucket-url/image2.jpg"
    ]
  }
}
```

**Response (for all gems with pagination):**
```json
{
  "status": 200,
  "message": "All gems images URLs retrieved successfully",
  "data": [
    {
      "id": "gem_id_1",
      "imagesUrls": ["url1", "url2"]
    },
    {
      "id": "gem_id_2",
      "imagesUrls": ["url3", "url4"]
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalRecords": 100,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Response Codes:**
- `200` - Success
- `400` - Invalid file type
- `404` - Gem not found (when specific ID provided)
- `500` - Server error

### 12. Delete Files from S3
- **Endpoint:** `POST /api/gems/S3Bucket/delete/:fileType/:id`
- **Description:** Delete specific files from S3 and remove URLs from gem record
- **Access:** Public

**URL Parameters:**
- `fileType` (string, required) - Type of file: "images", "videos", or "certificates"
- `id` (string, required) - Gem ID

**Query Parameters:** None

**Request Body:**
```json
{
  "urls": [
    "https://s3-bucket-url/image1.jpg",
    "https://s3-bucket-url/image2.jpg"
  ]
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Files deleted successfully"
}
```

**Response Codes:**
- `200` - Deleted successfully
- `400` - Invalid input or bucket configuration
- `500` - Server error

---

## Users API

### 13. Register Normal User
- **Endpoint:** `POST /api/users/register`
- **Description:** Register a new normal user (requires OTP verification)
- **Access:** Public

**Query Parameters:** None

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+1234567890",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully. Please verify OTP.",
  "data": {
    "userId": "user_id",
    "email": "user@example.com",
    "requiresOTPVerification": true
  }
}
```

**Response Codes:**
- `201` - Registration successful
- `400` - Validation errors
- `409` - User already exists
- `500` - Server error

### 14. Verify OTP
- **Endpoint:** `POST /api/users/verify-otp`
- **Description:** Verify OTP for normal user registration
- **Access:** Public

**Query Parameters:** None

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "role": "USER",
      "isVerified": true
    },
    "token": "jwt_token_here"
  }
}
```

**Response Codes:**
- `200` - OTP verified successfully
- `400` - Invalid or expired OTP
- `404` - User not found
- `500` - Server error

### 15. Send OTP
- **Endpoint:** `POST /api/users/otp`
- **Description:** Send OTP to normal user
- **Access:** Public

**Query Parameters:** None

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

**Response Codes:**
- `200` - OTP sent successfully
- `404` - User not found
- `500` - Server error

### 16. Login Normal User
- **Endpoint:** `POST /api/users/login`
- **Description:** Login for normal users with email and password
- **Access:** Public

**Query Parameters:** None

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "role": "USER",
      "isVerified": true
    },
    "token": "jwt_token_here"
  }
}
```

**Response Codes:**
- `200` - Login successful
- `400` - Invalid credentials
- `401` - User not verified
- `404` - User not found
- `500` - Server error

### 17. Login VIP User
- **Endpoint:** `POST /api/users/login/vip`
- **Description:** Login for VIP users with passkey (default: 1234)
- **Access:** Public

**Query Parameters:** None

**Request Body:**
```json
{
  "email": "vip@example.com",
  "passkey": "1234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "VIP login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "vip@example.com",
      "role": "VIP",
      "isVerified": true
    },
    "token": "jwt_token_here"
  }
}
```

**Response Codes:**
- `200` - Login successful
- `400` - Invalid passkey
- `404` - VIP user not found
- `500` - Server error

### 18. Get All Users (Admin Only)
- **Endpoint:** `GET /api/users`
- **Description:** Get all normal users (admin access required)
- **Access:** Admin only
- **Authentication:** Required (JWT token)

**Query Parameters:**
- `page` (number, optional) - Page number
- `limit` (number, optional) - Items per page

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "user_id",
      "email": "user@example.com",
      "role": "USER",
      "isVerified": true,
      "createdAt": "2025-08-07T12:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 50,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Response Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `500` - Server error

### 19. Get User by ID (Admin Only)
- **Endpoint:** `GET /api/users/:id`
- **Description:** Get specific user by ID (admin access required)
- **Access:** Admin only
- **Authentication:** Required (JWT token)

**URL Parameters:**
- `id` (string, required) - User ID

**Query Parameters:** None
**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "role": "USER",
    "isVerified": true,
    "createdAt": "2025-08-07T12:00:00.000Z"
  }
}
```

**Response Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - User not found
- `500` - Server error

### 20. Update User (Admin Only)
- **Endpoint:** `PUT /api/users/:id`
- **Description:** Update user information (admin access required)
- **Access:** Admin only
- **Authentication:** Required (JWT token)

**URL Parameters:**
- `id` (string, required) - User ID

**Query Parameters:** None

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "role": "USER",
  "isVerified": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "user_id",
    "email": "newemail@example.com",
    "role": "USER",
    "isVerified": true,
    "updatedAt": "2025-08-07T12:00:00.000Z"
  }
}
```

**Response Codes:**
- `200` - Updated successfully
- `400` - Validation errors
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - User not found
- `500` - Server error

### 21. Search Users (Admin Only)
- **Endpoint:** `GET /api/users/search`
- **Description:** Search users with filters (admin access required)
- **Access:** Admin only
- **Authentication:** Required (JWT token)

**Query Parameters:**
- `email` (string, optional) - Search by email
- `role` (string, optional) - Filter by role
- `isVerified` (boolean, optional) - Filter by verification status
- `page` (number, optional) - Page number
- `limit` (number, optional) - Items per page

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Users search completed",
  "data": [/* filtered users array */],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalRecords": 25,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Response Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `500` - Server error

### 22. Create User (Admin Only)
- **Endpoint:** `POST /api/users/create`
- **Description:** Create a new user (admin access required)
- **Access:** Admin only
- **Authentication:** Required (JWT token)

**Query Parameters:** None

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "securePassword123",
  "role": "USER",
  "phone": "+1234567890",
  "name": "New User"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "user_id",
    "email": "newuser@example.com",
    "role": "USER",
    "isVerified": false,
    "createdAt": "2025-08-07T12:00:00.000Z"
  }
}
```

**Response Codes:**
- `201` - Created successfully
- `400` - Validation errors
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `409` - User already exists
- `500` - Server error

### 23. Delete User (Admin Only)
- **Endpoint:** `DELETE /api/users/:id`
- **Description:** Delete a user (admin access required)
- **Access:** Admin only
- **Authentication:** Required (JWT token)

**URL Parameters:**
- `id` (string, required) - User ID

**Query Parameters:** None
**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Response Codes:**
- `200` - Deleted successfully
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - User not found
- `500` - Server error

### 24. Approve Customer Data (Admin Only)
- **Endpoint:** `POST /api/users/:id/approve-customer-data`
- **Description:** Approve customer KYC data (admin access required)
- **Access:** Admin only
- **Authentication:** Required (JWT token)

**URL Parameters:**
- `id` (string, required) - User ID

**Query Parameters:** None
**Request Body:** None

**Response:**
```json
{
  "success": true,
  "message": "Customer data approved successfully"
}
```

**Response Codes:**
- `200` - Approved successfully
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - User not found
- `500` - Server error

---

## Quotations API

### 25. Submit Quotation
- **Endpoint:** `POST /api/quotations`
- **Description:** User submits quotation(s) (users only, admins cannot submit)
- **Access:** Authenticated users only (not admins)
- **Authentication:** Required (JWT token)

**Query Parameters:** None

**Request Body:**
```json
{
  "quotations": [
    "GEM001 - $5000",
    "GEM002 - $3500"
  ]
}
```

Or single quotation:
```json
{
  "quotations": "GEM001 - $5000"
}
```

**Response:**
```json
{
  "message": "2 quotation(s) submitted successfully",
  "quotations": [
    "GEM001 - $5000",
    "GEM002 - $3500"
  ]
}
```

**Response Codes:**
- `201` - Quotations submitted successfully
- `400` - Invalid quotation format or empty strings
- `401` - User not authenticated
- `403` - Admins cannot submit quotations
- `500` - Server error

### 26. Get Quotations
- **Endpoint:** `GET /api/quotations`
- **Description:** Get quotations (admins see all users' quotations, users see only their own)
- **Access:** Authenticated users
- **Authentication:** Required (JWT token)

**Query Parameters:**
- `page` (number, optional) - Page number
- `limit` (number, optional) - Items per page

**Request Body:** None

**Response (for regular users):**
```json
{
  "success": true,
  "message": "Quotations retrieved successfully",
  "data": {
    "quotations": [
      "GEM001 - $5000",
      "GEM002 - $3500"
    ],
    "totalQuotations": 2
  }
}
```

**Response (for admins):**
```json
{
  "success": true,
  "message": "All quotations retrieved successfully",
  "data": [
    {
      "_id": "user_id_1",
      "email": "user1@example.com",
      "quotations": ["GEM001 - $5000"],
      "totalQuotations": 1
    },
    {
      "_id": "user_id_2", 
      "email": "user2@example.com",
      "quotations": ["GEM002 - $3500", "GEM003 - $2000"],
      "totalQuotations": 2
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 50,
    "recordsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Response Codes:**
- `200` - Success
- `401` - User not authenticated
- `500` - Server error

---

## Authentication

Most user management endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Rate Limiting

Several endpoints have rate limiting applied:

- **Gem Search:** 50 requests per 15 minutes
- **Filter Options:** 50 requests per 15 minutes  
- **Create Gem:** 10 requests per minute
- **Bulk Create:** 5 requests per 5 minutes
- **Update/Delete Gem:** 10 requests per minute
- **Bulk Delete:** 5 requests per minute

## Error Handling

The API includes comprehensive error handling with specific error codes and messages for different scenarios including validation errors, authentication failures, and server errors.

## File Upload Notes

- Supported file types for upload: images, videos, certificates
- Files are stored in AWS S3
- File URLs are stored in the gem records
- Multiple files can be uploaded in a single request
- Files can be individually deleted using their URLs