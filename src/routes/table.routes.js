import Router from 'express';
import {
	getEntireTable,
	getAllTables,
	createRecord,
	updateRecord,
	deleteRecord,
} from '../controllers/table.controller.js';

const router = Router();

router.get('/railway', getAllTables);
router.get('/railway/:table', getEntireTable);
router.post('/railway/:table', createRecord);
router.patch('/railway/:table/:id', updateRecord);
router.delete('/railway/:table/:id', deleteRecord);

export default router;
