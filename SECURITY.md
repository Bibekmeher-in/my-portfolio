# Security & Access Control

## Admin Panel Protection

The admin panel is fully protected with multiple layers of security:

### 1. Frontend Protection

**Client-Side Checks:**
- Admin routes check authentication status on page load
- Redirects to `/admin/login` if not authenticated
- Verifies user role is 'admin' before showing content
- Navbar only shows admin link to admin users

**Files Protected:**
- `/app/admin/page.js` - Main admin dashboard
- `/app/admin/login/page.js` - Admin login page

### 2. Backend Protection

**API Middleware:**
All admin operations require authentication token with admin role.

**Protected Routes:**

#### Products API (`/api/products`)
- ✅ GET `/` - Public (anyone can view)
- ✅ GET `/:id` - Public (anyone can view)
- 🔒 POST `/` - Admin only (create product)
- 🔒 PUT `/:id` - Admin only (update product)
- 🔒 DELETE `/:id` - Admin only (delete product)

#### Projects API (`/api/projects`)
- ✅ GET `/` - Public
- ✅ GET `/:id` - Public
- 🔒 POST `/` - Admin only
- 🔒 PUT `/:id` - Admin only
- 🔒 DELETE `/:id` - Admin only

#### Services API (`/api/services`)
- ✅ GET `/` - Public
- ✅ GET `/:id` - Public
- 🔒 POST `/` - Admin only
- 🔒 PUT `/:id` - Admin only
- 🔒 DELETE `/:id` - Admin only

#### Blog API (`/api/blog`)
- ✅ GET `/` - Public (published posts only)
- ✅ GET `/:slug` - Public
- 🔒 POST `/` - Admin only
- 🔒 PUT `/:id` - Admin only
- 🔒 DELETE `/:id` - Admin only

#### Contact Messages API (`/api/contact`)
- ✅ POST `/` - Public (submit contact form)
- 🔒 GET `/` - Admin only (view messages)
- 🔒 DELETE `/:id` - Admin only (delete message)

#### Payment API (`/api/payment`)
- ✅ POST `/create-order` - Authenticated users
- ✅ POST `/verify-payment` - Authenticated users
- ✅ GET `/orders/:email` - User's own orders

### 3. Authentication Flow

```
User Login → JWT Token Generated → Token Stored in localStorage
↓
Admin Panel Access → Check Token → Verify Role → Allow/Deny
↓
API Request → Send Token in Header → Backend Validates → Allow/Deny
```

### 4. Admin Middleware

**File:** `server/middleware/adminAuth.js`

**Checks:**
1. Token exists in Authorization header
2. Token is valid JWT
3. User exists in database
4. User role is 'admin'

**Response Codes:**
- `401` - No token or invalid token
- `403` - Valid token but not admin
- `200` - Success (admin verified)

### 5. How to Test Security

#### Test 1: Try accessing admin panel without login
```
1. Open browser in incognito mode
2. Go to http://localhost:3000/admin
3. Should redirect to /admin/login
```

#### Test 2: Try accessing admin panel as regular user
```
1. Sign up as regular user
2. Try to go to /admin
3. Should redirect to /admin/login
```

#### Test 3: Try API calls without admin token
```bash
# This should fail with 401 or 403
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test","price":100}'
```

#### Test 4: Try API calls with admin token
```bash
# This should succeed
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{"title":"Test","description":"Test","price":100}'
```

### 6. Creating Admin User

**Method 1: Using Script**
```bash
npm run create-admin
```

**Method 2: Manual Database**
```javascript
// In MongoDB, set user role to 'admin'
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### 7. Security Best Practices

✅ **Implemented:**
- JWT token authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Environment variables for secrets
- CORS protection
- Input validation
- SQL injection prevention (using Mongoose)

⚠️ **Recommended for Production:**
- Enable HTTPS
- Add rate limiting
- Implement refresh tokens
- Add CSRF protection
- Enable security headers (helmet.js)
- Add request logging
- Implement 2FA for admin
- Regular security audits

### 8. Common Issues

**Issue:** "Access denied. Admin only."
**Solution:** Make sure you're logged in with admin account

**Issue:** "Invalid token"
**Solution:** Token expired or corrupted. Login again

**Issue:** Can't access admin panel
**Solution:** Check if user role is 'admin' in database

### 9. Emergency Admin Access

If you lose admin access:

```bash
# Connect to MongoDB
mongo your_connection_string

# Find your user
db.users.find({ email: "your@email.com" })

# Set role to admin
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

### 10. Monitoring

**Check admin activities:**
- Monitor API logs for admin operations
- Track failed authentication attempts
- Review user role changes
- Audit content modifications

---

## Summary

✅ Admin panel is fully protected
✅ Only admin users can access admin routes
✅ All admin API operations require authentication
✅ Regular users cannot see or access admin features
✅ Multiple layers of security (frontend + backend)
