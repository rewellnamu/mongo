document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });

  const data = await res.json();
  const messageDiv = document.getElementById('message');
  if (res.ok) {
    messageDiv.textContent = '🎉 User has been added successfully!';
    messageDiv.classList.remove('error');
    messageDiv.style.opacity = '1';
    setTimeout(() => {
      messageDiv.style.transition = 'opacity 0.7s';
      messageDiv.style.opacity = '0';
      setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.style.transition = '';
        messageDiv.style.opacity = '';
      }, 700);
    }, 1800);
  } else {
    messageDiv.textContent = `❌ Error: ${data.message || 'Failed to add user'}`;
    messageDiv.classList.add('error');
    messageDiv.style.opacity = '1';
  }
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
});
