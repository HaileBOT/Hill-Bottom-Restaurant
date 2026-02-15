// Simple vanilla JS interactivity demo
// Shows an alert when the button is clicked

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('vanilla-btn');
  if (btn) {
    btn.addEventListener('click', function() {
      alert('Vanilla JS works!');
    });
  }
});
