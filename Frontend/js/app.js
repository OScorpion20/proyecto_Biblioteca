document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (response.status === 201) {
          alert('Aguardado exitosamente');
          // Limpia el formulario después de un registro exitoso
          registerForm.reset();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Error al registrar usuario');
      }
    });
  }
});

async function fetchBooks() {
  try {
    const response = await fetch('/api/books');
    const books = await response.json();

    const bookList = document.getElementById('book-list');
    if (bookList) {
      books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        bookList.appendChild(li);
      });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

async function fetchLoans() {
  try {
    const response = await fetch('/api/loans');
    const loans = await response.json();

    const loanList = document.getElementById('loan-list');
    if (loanList) {
      loans.forEach(loan => {
        const li = document.createElement('li');
        li.textContent = `Book ID: ${loan.book}, User ID: ${loan.user}, Loan Date: ${new Date(loan.loanDate).toLocaleDateString()}`;
        loanList.appendChild(li);
      });
    }
  } catch (error) {
    console.error('Error fetching loans:', error);
  }
}
