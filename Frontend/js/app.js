document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://localhost:5000/api/users', {
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

  const addBookForm = document.getElementById('add-book-form');
  if (addBookForm) {
    addBookForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const isbn = document.getElementById('isbn').value;

      try {
        const response = await fetch('http://localhost:5000/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, author, isbn })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (response.status === 201) {
          alert('Libro agregado exitosamente');
          addBookForm.reset();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error agregando libro:', error);
        alert('Error al agregar libro');
      }
    });
  }

  const loanForm = document.getElementById('loan-form');
  if (loanForm) {
    loanForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const userId = document.getElementById('userId').value;
      const bookId = document.getElementById('bookId').value;

      try {
        const response = await fetch('http://localhost:5000/api/loans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user: userId, book: bookId })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (response.status === 201) {
          alert('Préstamo creado exitosamente');
          loanForm.reset();
          fetchBooks(); // Volver a obtener la lista de libros para reflejar el estado actualizado
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error creando préstamo:', error);
        alert('Error al crear préstamo');
      }
    });
  }

  fetchBooks();
  fetchLoans();
});

async function fetchBooks() {
  try {
    const response = await fetch('http://localhost:5000/api/books');
    const books = await response.json();

    const bookList = document.getElementById('book-list');
    if (bookList) {
      bookList.innerHTML = ''; // Limpiar la lista antes de agregar elementos
      books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} - ${book.available ? 'Available' : 'On loan'}`;
        bookList.appendChild(li);
      });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

async function fetchLoans() {
  try {
    const response = await fetch('http://localhost:5000/api/loans');
    const loans = await response.json();

    const loanList = document.getElementById('loan-list');
    if (loanList) {
      loanList.innerHTML = ''; // Limpiar la lista antes de agregar elementos
      loans.forEach(loan => {
        const bookId = loan.book ? loan.book._id : 'Unknown';
        const userId = loan.user ? loan.user._id : 'Unknown';
        const li = document.createElement('li');
        li.textContent = `Book ID: ${bookId}, User ID: ${userId}, Loan Date: ${new Date(loan.loanDate).toLocaleDateString()}`;
        loanList.appendChild(li);
      });
    }
  } catch (error) {
    console.error('Error fetching loans:', error);
  }
}
