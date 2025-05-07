const buildSelectQuery = (tableName) => {
	return `SELECT * FROM ${tableName}`;
};

const buildInsertQuery = (tableName, data) => {
	const columns = Object.keys(data).join(', ');
	const values = Object.values(data);
	const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
	return `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
};

const buildUpdateQuery = (tableName, data, id) => {
	const columns = Object.keys(data)
		.map((key, index) => `${key} = $${index + 1}`)
		.join(', ');
	return `UPDATE ${tableName} SET ${columns} WHERE id = ${id} RETURNING *`;
};

const buildDeleteQuery = (tableName) => {
	return `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;
};

export {
	buildSelectQuery,
	buildInsertQuery,
	buildUpdateQuery,
	buildDeleteQuery,
};
