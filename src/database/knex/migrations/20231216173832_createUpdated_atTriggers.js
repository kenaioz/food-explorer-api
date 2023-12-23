// Lista de tabelas nas quais você deseja adicionar a trigger
const tables = ["users", "foods"];

// Crie uma função que gera o SQL para a trigger
function generateTriggerSQL(tableName) {
  return `
    CREATE TRIGGER update_updated_at_${tableName}
    AFTER UPDATE
    ON ${tableName}
    FOR EACH ROW
    BEGIN
      UPDATE ${tableName}
      SET updated_at = datetime('now', 'localtime')
      WHERE id = NEW.id;
    END;
  `;
}

async function addTriggers(knex, tables) {
  const triggerSQLs = tables.map((tableName) => generateTriggerSQL(tableName));

  await Promise.all(triggerSQLs.map((sql) => knex.raw(sql)));
}

exports.up = async (knex) => {
  await addTriggers(knex, tables);
};

exports.down = async (knex) => {};
