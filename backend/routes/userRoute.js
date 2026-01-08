import  express from 'express'
import { deleteUser, getAllUsers, login, logout,register } from '../controllers/userController.js'


const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/allUsers',getAllUsers)
router.delete('/deleteUser/:id',deleteUser)
router.post('/logout',logout)

export default router