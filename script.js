// Sample bhajan data (In production, this would come from a database/API)
const bhajansDatabase = [
    {
        id: 1,
        name: "Ganesha Sharanam",
        deity: "ganesha",
        beat: 6,
        speed: "medium",
        dateSung: "2024-01-15"
    },
    {
        id: 2,
        name: "Guru Brahma Guru Vishnu",
        deity: "guru",
        beat: 7,
        speed: "slow",
        dateSung: "2024-01-20"
    },
    {
        id: 3,
        name: "Sai Baba Namo Namo",
        deity: "sai",
        beat: 6,
        speed: "fast",
        dateSung: "2024-02-10"
    },
    {
        id: 4,
        name: "Devi Jagadambe",
        deity: "devi",
        beat: 7,
        speed: "medium",
        dateSung: "2024-02-15"
    },
    {
        id: 5,
        name: "Rama Raghu Rama",
        deity: "rama",
        beat: 6,
        speed: "mediumfast",
        dateSung: "2024-03-01"
    },
    {
        id: 6,
        name: "Krishna Govinda",
        deity: "krishna",
        beat: 7,
        speed: "fast",
        dateSung: "2024-03-10"
    },
    {
        id: 7,
        name: "Shiva Shankara",
        deity: "shiva",
        beat: 6,
        speed: "slow",
        dateSung: "2024-03-15"
    },
    {
        id: 8,
        name: "Hanuman Chalisa",
        deity: "hanuman",
        beat: 7,
        speed: "medium",
        dateSung: "2024-03-20"
    },
    {
        id: 9,
        name: "Vittala Panduranga",
        deity: "vittala",
        beat: 6,
        speed: "third",
        dateSung: "2024-04-01"
    },
    {
        id: 10,
        name: "Narayana Hari Om",
        deity: "narayana",
        beat: 7,
        speed: "mediumfast",
        dateSung: "2024-04-05"
    }
];

// Search by Name Function
function searchByName() {
    const searchTerm = document.getElementById('nameSearch').value.toLowerCase().trim();
    
    if (!searchTerm) {
        alert('Please enter a bhajan name to search');
        return;
    }

    const results = bhajansDatabase.filter(bhajan => 
        bhajan.name.toLowerCase().includes(searchTerm)
    );

    displayResults(results, `Search results for: "${searchTerm}"`);
}

// Quick Search Function
function quickSearch() {
    const deity = document.getElementById('deityFilter').value;
    const beat6 = document.getElementById('beat6').checked;
    const beat7 = document.getElementById('beat7').checked;
    const speed = document.getElementById('speedFilter').value;

    let results = bhajansDatabase;

    // Filter by deity
    if (deity !== 'all') {
        results = results.filter(bhajan => bhajan.deity === deity);
    }

    // Filter by beat
    if (beat6 || beat7) {
        results = results.filter(bhajan => {
            if (beat6 && beat7) return true;
            if (beat6) return bhajan.beat === 6;
            if (beat7) return bhajan.beat === 7;
            return false;
        });
    }

    // Filter by speed
    if (speed !== 'all') {
        results = results.filter(bhajan => bhajan.speed === speed);
    }

    displayResults(results, 'Quick Search Results');
}

// Search by Date Function
function searchByDate() {
    const dateInput = document.getElementById('dateFilter').value;
    
    if (!dateInput) {
        alert('Please select a date');
        return;
    }

    const results = bhajansDatabase.filter(bhajan => bhajan.dateSung === dateInput);

    displayResults(results, `Bhajans sung on: ${formatDate(dateInput)}`);
}

// Display Results Function
function displayResults(results, title) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContainer = document.getElementById('resultsContainer');

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="result-item">
                <p class="result-title">No bhajans found</p>
                <p class="result-details">Try adjusting your search criteria</p>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = results.map(bhajan => `
            <div class="result-item">
                <h3 class="result-title">${bhajan.name}</h3>
                <p class="result-details">
                    <strong>Deity:</strong> ${capitalizeFirst(bhajan.deity)} | 
                    <strong>Beat:</strong> ${bhajan.beat} | 
                    <strong>Speed:</strong> ${formatSpeed(bhajan.speed)} | 
                    <strong>Last Sung:</strong> ${formatDate(bhajan.dateSung)}
                </p>
            </div>
        `).join('');
    }

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Login Modal Functions
function showLogin() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // In production, this would validate against a backend
    if (username && password) {
        alert('Login functionality would be connected to backend in production');
        closeLogin();
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
}

// Utility Functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatSpeed(speed) {
    const speedMap = {
        'slow': 'Slow',
        'medium': 'Medium',
        'mediumfast': 'Medium Fast',
        'fast': 'Fast',
        'third': 'Third Speed'
    };
    return speedMap[speed] || speed;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLogin();
    }
}

// Enable Enter key for search
document.addEventListener('DOMContentLoaded', function() {
    const nameSearchInput = document.getElementById('nameSearch');
    
    if (nameSearchInput) {
        nameSearchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchByName();
            }
        });
    }

    // Set max date for date picker to today
    const dateFilter = document.getElementById('dateFilter');
    if (dateFilter) {
        const today = new Date().toISOString().split('T')[0];
        dateFilter.setAttribute('max', today);
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.search-section, .admin-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
