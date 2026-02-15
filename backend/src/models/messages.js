// Database schema for messages (for reference)
// Table is created in config/db.js, but you can define helper functions here if needed.

// Helper functions for messages
function getAllMessages(db, callback) {
  db.all('SELECT * FROM messages ORDER BY created_at DESC', [], callback);
}

function addMessage(db, data, callback) {
  db.run(
    'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
    [data.name, data.email, data.message],
    function (err) {
      callback(err, this ? this.lastID : null);
    }
  );
}

function deleteMessageById(db, id, callback) {
  db.run('DELETE FROM messages WHERE id = ?', [id], callback);
}

module.exports = {
  getAllMessages,
  addMessage,
  deleteMessageById,
};
