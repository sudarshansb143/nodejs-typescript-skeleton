import express from 'express';
import { createHobby, getHobbies, getHobbyById, updateHobbyById, deleteHobbyById } from './../controllers';
import { createHobbyValidator, updateHobbyValidator } from './../validators'

const router = express.Router();

router.post('/', createHobbyValidator, createHobby);
router.put('/:id', updateHobbyValidator, updateHobbyById);
router.get('/', getHobbies);
router.get('/:id', getHobbyById);
router.delete('/:id', deleteHobbyById);

export default router;