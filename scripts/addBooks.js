const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const Product = require('../server/models/Product')

const books = [
    {
        title: 'Java Programming Masterclass',
        description: 'Complete guide to Java programming from basics to advanced concepts. Learn OOP, Collections, Streams, and build real-world applications.',
        price: 499,
        category: 'ebook',
        image: 'https://via.placeholder.com/300x400?text=Java+Book',
        features: [
            'Complete Java fundamentals',
            'Object-Oriented Programming',
            'Collections Framework',
            'Streams and Lambda',
            'Exception Handling',
            'File I/O Operations',
            'Multithreading',
            'Real-world projects'
        ]
    },
    {
        title: 'Python Complete Guide',
        description: 'Master Python programming with comprehensive coverage of syntax, libraries, and practical applications. Perfect for beginners and intermediate developers.',
        price: 399,
        category: 'ebook',
        image: 'https://via.placeholder.com/300x400?text=Python+Book',
        features: [
            'Python fundamentals',
            'Data structures',
            'Functions and modules',
            'File handling',
            'Regular expressions',
            'Web scraping',
            'Data analysis with Pandas',
            'Machine learning basics'
        ]
    }
]

async function addBooks() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ MongoDB connected')

        for (const book of books) {
            const existing = await Product.findOne({ title: book.title })
            if (existing) {
                console.log(`⚠️  ${book.title} already exists`)
            } else {
                await Product.create(book)
                console.log(`✅ Added: ${book.title}`)
            }
        }

        console.log('✅ Books added successfully!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Error:', error.message)
        process.exit(1)
    }
}

addBooks()
