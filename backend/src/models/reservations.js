// Database schema for reservations (for reference)
// Table is created in config/db.js, but you can define helper functions here if needed.

// Helper functions for reservations
function getAllReservations(db, callback) {
  db.all('SELECT * FROM reservations ORDER BY created_at DESC', [], callback);
}

function addReservation(db, data, callback) {
  db.run(
    'INSERT INTO reservations (name, phoneNumber, date, time, guests, note) VALUES (?, ?, ?, ?, ?, ?)',
    [data.name || '', data.phoneNumber || '', data.date, data.time, data.guests, data.note || ''],
    function (err) {
      callback(err, this ? this.lastID : null);
    }
  );
}

module.exports = {
  getAllReservations,
  addReservation,
};
