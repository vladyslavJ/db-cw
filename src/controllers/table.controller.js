import pool from '../config/db.config.js';
import {
	buildSelectQuery,
	buildInsertQuery,
	buildUpdateQuery,
	buildDeleteQuery,
} from '../services/query.builder.js';

const getTableMeta = async (req, res) => {
	const { table } = req.params;
	try {
		const query = `
      		SELECT column_name
      		FROM information_schema.columns
      		WHERE table_name = $1 AND table_schema = 'public'
      		ORDER BY ordinal_position
    	`;
		const result = await pool.query(query, [table]);
		console.log(result.rowCount);

		if (result.rows.length === 0) {
			return res
				.status(404)
				.json({ error: `Table "${table}" not found` });
		}
		res.json(result.rowCount);
	} catch (error) {
		console.error(`Error fetching columns for table "${table}":`, error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const getAllTables = async (req, res) => {
	try {
		const query = `
	  		SELECT table_name 
			FROM information_schema.tables 
			WHERE table_schema = 'public' 
			ORDER BY table_name;
		`;
		const result = await pool.query(query);
		res.json(result.rows.map((row) => row.table_name));
	} catch (error) {
		console.error('Error fetching tables:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const getEntireTable = async (req, res) => {
	const { table } = req.params;
	try {
		const query = buildSelectQuery(table);
		const result = await pool.query(query);
		res.json(result.rows);
	} catch (error) {
		console.error(`Error fetching data from table "${table}":`, error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const createRecord = async (req, res) => {
	const { table } = req.params;
	const data = req.body;
	try {
		const query = buildInsertQuery(table, data);
		const result = await pool.query(query, Object.values(data));
		res.status(201).json(result.rows);
	} catch (error) {
		console.error(`Error creating record in table "${table}":`, error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const updateRecord = async (req, res) => {
	const { table, id } = req.params;
	const data = req.body;
	try {
		const query = buildUpdateQuery(table, data, id);
		console.log(Object.values(data));
		const result = await pool.query(query, Object.values(data));
		res.status(200).json(result.rows);
	} catch (error) {
		console.error(`Error updating record in table "${table}":`, error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const deleteRecord = async (req, res) => {
	const { table, id } = req.params;
	try {
		const query = buildDeleteQuery(table);
		const result = await pool.query(query, [id]);
		res.status(200).json(result.rows);
	} catch (error) {
		console.error(`Error deleting record from table "${table}":`, error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

export {
	getEntireTable,
	getAllTables,
	createRecord,
	updateRecord,
	deleteRecord,
};
