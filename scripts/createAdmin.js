const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    createdAt: { type: Date, default: Date.now },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')

        const adminExists = await User.findOne({ email: 'admin@bibeklabs.com' })

        if (adminExists) {
            console.log('Admin user already exists!')
            process.exit(0)
        }

        const hashedPassword = await bcrypt.hash('admin123', 10)

        const admin = await User.create({
            email: 'admin@bibeklabs.com',
            password: hashedPassword,
            name: 'Admin',
            role: 'admin'
        })

        console.log('✅ Admin user created successfully!')
        console.log('Email: admin@bibeklabs.com')
        console.log('Password: admin123')
        console.log('\n⚠️  Please change the password after first login!')

        process.exit(0)
    } catch (error) {
        console.error('Error creating admin:', error)
        process.exit(1)
    }
}

createAdmin()
