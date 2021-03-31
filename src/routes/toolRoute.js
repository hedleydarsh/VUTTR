import { Router } from 'express';
import toolController from '../controllers/ToolController';

const router = new Router();

router.get('/', toolController.index);
router.post('/', toolController.store);
router.get('/:id', toolController.show);
router.put('/:id', toolController.update);
router.delete('/:id', toolController.delete);

export default router;
