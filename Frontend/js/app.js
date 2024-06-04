document.addEventListener('DOMContentLoaded', () => {
  fetchBooks();

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
        const data = await response.json();
        alert(data.message);
      } catch (error) {
        console.error('Error registering user:', error);
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
        const data = await response.json();
        alert(data.message);
        fetchLoans();
      } catch (error) {
        console.error('Error creating loan:', error);
      }
    });
  }

  fetchLoans();
});

async function fetchBooks() {
  try {
    const response = await fetch('http://localhost:5000/api/books');
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
    const response = await fetch('http://localhost:5000/api/loans');
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
