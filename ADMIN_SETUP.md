# Admin Panel Setup Guide

## Step 1: Create Admin User

Run this command to create the admin user in your database:

```bash
npm run create-admin
```

This will create an admin account with:
- **Email:** admin@bibeklabs.com
- **Password:** admin123

## Step 2: Access Admin Panel

1. Make sure both servers are running:
   ```bash
   npm run dev          # Frontend (port 3000)
   npm run server:dev   # Backend (port 5000)
   ```

2. Visit the admin login page:
   ```
   http://localhost:3000/admin/login
   ```

3. Login with the credentials:
   - Email: admin@bibeklabs.com
   - Password: admin123

## Step 3: Admin Dashboard Features

After logging in, you can:
- View and manage products
- View and manage blog posts
- Read contact messages
- View orders
- See newsletter subscribers

## Security Notes

⚠️ **IMPORTANT:** Change the default password after first login!

To change password, you can:
1. Use MongoDB Compass or CLI to update the password
2. Or implement a "Change Password" feature in the admin panel

## Troubleshooting

### Can't login?
- Make sure MongoDB is running
- Make sure the backend server is running on port 5000
- Check if admin user was created: `npm run create-admin`

### "Access denied" error?
- Make sure the user role is set to 'admin' in the database

### Token errors?
- Clear browser localStorage
- Try logging in again

## Creating Additional Admin Users

You can modify `scripts/createAdmin.js` to create more admin users with different credentials.
