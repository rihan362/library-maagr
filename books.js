// Sample book data
const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "fiction",
        cover: "https://via.placeholder.com/300x450?text=The+Great+Gatsby",
        status: "available",
        description: "A story of wealth, love, and the American Dream in the 1920s."
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "fiction",
        cover: "https://via.placeholder.com/300x450?text=To+Kill+a+Mockingbird",
        status: "available",
        description: "A powerful story of racial injustice and moral growth in the American South."
    },
    {
        id: 3,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "science",
        cover: "https://via.placeholder.com/300x450?text=A+Brief+History+of+Time",
        status: "checked-out",
        description: "A popular-science book on cosmology by English physicist Stephen Hawking."
    },
    {
        id: 4,
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        category: "non-fiction",
        cover: "https://via.placeholder.com/300x450?text=Sapiens",
        status: "available",
        description: "Explores the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century."
    }
];

// Initialize books page
function initBooksPage() {
    if (!document.getElementById('book-grid')) return;
    
    renderBooks(books);
    
    // Set up search
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
    
    // Set up filters
    const categoryFilter = document.getElementById('category-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterBooks);
    }
    
    if (availabilityFilter) {
        availabilityFilter.addEventListener('change', filterBooks);
    }
}

// Render books to the page
function renderBooks(booksToRender) {
    const bookGrid = document.getElementById('book-grid');
    if (!bookGrid) return;
    
    bookGrid.innerHTML = booksToRender.map(book => `
        <div class="book-card" data-id="${book.id}">
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p>${book.description}</p>
                <span class="book-status status-${book.status}">
                    ${book.status === 'available' ? 'Available' : 'Checked Out'}
                </span>
            </div>
        </div>
    `).join('');
}

// Handle search
function handleSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    filterBooks(searchTerm);
}

// Filter books based on search and filters
function filterBooks(searchTerm = '') {
    const category = document.getElementById('category-filter').value;
    const availability = document.getElementById('availability-filter').value;
    
    let filteredBooks = books;
    
    // Apply search filter
    if (searchTerm) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply category filter
    if (category !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.category === category);
    }
    
    // Apply availability filter
    if (availability !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.status === availability);
    }
    
    renderBooks(filteredBooks);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initBooksPage);