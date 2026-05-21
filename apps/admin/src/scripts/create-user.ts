import { getPayload } from 'payload'
import config from '../payload.config'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

process.env.MONGODB_URI = 'mongodb://localhost:27017/lpap'
process.env.PAYLOAD_SECRET = '69c5e7b1a2f3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9'

const resetAndCreate = async () => {
  const payload = await getPayload({ config })

  // Delete all existing users
  const existingUsers = await payload.find({ collection: 'users', limit: 100 })
  console.log(`Found ${existingUsers.docs.length} existing users. Deleting...`)

  for (const user of existingUsers.docs) {
    await payload.delete({ collection: 'users', id: user.id })
    console.log(`Deleted user: ${user.email}`)
  }

  // Create fresh admin user
  const newUser = await payload.create({
    collection: 'users',
    data: {
      email: 'lunavalos.e1@gmail.com',
      password: 'admin123',
      role: 'admin',
    },
  })

  console.log('✅ Admin user created:', newUser.email)
  process.exit(0)
}

resetAndCreate().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
