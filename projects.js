// Projects Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProjectsPage();
    
    // Page transition
    setTimeout(() => {
        document.querySelector('.page-transition').classList.add('loaded');
    }, 100);
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Smooth page transitions
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            document.querySelector('.page-transition').style.opacity = '0';
            document.querySelector('.page-transition').style.transform = 'translateY(-30px)';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// Projects page initialization
function initializeProjectsPage() {
    fetchGitHubData();
}

// Fetch GitHub data
async function fetchGitHubData() {
    const username = 'prachichoudhary2004';
    const projectsContainer = document.getElementById('projects-container');
    const statsContainer = document.getElementById('github-stats');
    
    // Show loading state
    showLoading(projectsContainer);
    
    try {
        // Fetch user data and repositories
        const [userResponse, reposResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        ]);
        
        if (!userResponse.ok || !reposResponse.ok) {
            throw new Error('Failed to fetch GitHub data');
        }
        
        const userData = await userResponse.json();
        const reposData = await reposResponse.json();
        
        // Display GitHub stats
        displayGitHubStats(userData, reposData, statsContainer);
        
        // Filter and display repositories
        const filteredRepos = filterRepositories(reposData);
        displayProjects(filteredRepos, projectsContainer);
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        showFallbackData(projectsContainer, statsContainer);
    }
}

// Filter repositories to show relevant projects
function filterRepositories(repos) {
    return repos
        .filter(repo => !repo.fork && repo.name !== 'prachichoudhary2004') // Exclude forks and profile repo
        .sort((a, b) => {
            // Sort by stars first, then by update date
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at) - new Date(a.updated_at);
        })
        .slice(0, 12); // Show top 12 projects
}

// Display GitHub stats
function displayGitHubStats(userData, reposData, container) {
    const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languages = [...new Set(reposData.map(repo => repo.language).filter(lang => lang))];
    
    container.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${userData.public_repos}</div>
            <div class="stat-label">Public Repos</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${totalStars}</div>
            <div class="stat-label">Total Stars</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${totalForks}</div>
            <div class="stat-label">Total Forks</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${languages.length}</div>
            <div class="stat-label">Languages</div>
        </div>
    `;
}

// Display projects
function displayProjects(repos, container) {
    if (repos.length === 0) {
        container.innerHTML = '<div class="error-message">No repositories found.</div>';
        return;
    }
    
    container.innerHTML = repos.map(repo => createProjectCard(repo)).join('');
}

// Create project card HTML
function createProjectCard(repo) {
    const description = repo.description || 'No description available';
    const language = repo.language || 'Unknown';
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();
    
    // Get icon based on language
    const icon = getLanguageIcon(language);
    
    // Create tags from topics and language
    const tags = [...(repo.topics || []), language].filter(Boolean).slice(0, 4);
    
    return `
        <div class="project-card">
            <div class="project-header">
                <div class="project-icon">
                    <i class="${icon}"></i>
                </div>
                <h3 class="project-title">${repo.name}</h3>
            </div>
            
            <p class="project-description">${description}</p>
            
            <div class="project-stats">
                <div class="project-stat">
                    <i class="fas fa-star"></i>
                    <span>${repo.stargazers_count}</span>
                </div>
                <div class="project-stat">
                    <i class="fas fa-code-branch"></i>
                    <span>${repo.forks_count}</span>
                </div>
                <div class="project-stat">
                    <i class="fas fa-calendar"></i>
                    <span>${updatedDate}</span>
                </div>
            </div>
            
            <div class="project-tags">
                ${tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            
            <a href="${repo.html_url}" target="_blank" class="project-link">
                <i class="fab fa-github"></i>
                View Code
            </a>
        </div>
    `;
}

// Get icon based on programming language
function getLanguageIcon(language) {
    const icons = {
        'JavaScript': 'fab fa-js-square',
        'TypeScript': 'fab fa-js-square',
        'Python': 'fab fa-python',
        'Java': 'fab fa-java',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'React': 'fab fa-react',
        'Vue': 'fab fa-vuejs',
        'Angular': 'fab fa-angular',
        'Node.js': 'fab fa-node-js',
        'PHP': 'fab fa-php',
        'C++': 'fas fa-code',
        'C': 'fas fa-code',
        'C#': 'fas fa-code',
        'Go': 'fas fa-code',
        'Rust': 'fas fa-code',
        'Swift': 'fab fa-swift',
        'Kotlin': 'fas fa-code',
        'Dart': 'fas fa-code',
        'Shell': 'fas fa-terminal',
        'Dockerfile': 'fab fa-docker'
    };
    
    return icons[language] || 'fas fa-file-code';
}

// Show loading state
function showLoading(container) {
    container.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Loading projects from GitHub...</p>
        </div>
    `;
}

// Show fallback data when GitHub API fails
function showFallbackData(projectsContainer, statsContainer) {
    // Fallback stats
    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">25+</div>
            <div class="stat-label">Public Repos</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">50+</div>
            <div class="stat-label">Total Stars</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">20+</div>
            <div class="stat-label">Total Forks</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">8+</div>
            <div class="stat-label">Languages</div>
        </div>
    `;
    
    // Fallback projects
    const fallbackProjects = [
        {
            name: 'TeleRewards',
            description: 'A comprehensive rewards and loyalty management system built with Java and Spring Boot',
            language: 'Java',
            topics: ['spring-boot', 'rewards', 'loyalty'],
            stargazers_count: 15,
            forks_count: 5,
            updated_at: '2024-01-15',
            html_url: 'https://github.com/prachichoudhary2004'
        },
        {
            name: 'SoulZen',
            description: 'Mental health and wellness platform with AI-powered recommendations',
            language: 'Python',
            topics: ['ai', 'mental-health', 'wellness'],
            stargazers_count: 12,
            forks_count: 3,
            updated_at: '2024-01-10',
            html_url: 'https://github.com/prachichoudhary2004'
        },
        {
            name: 'Traffic-Policy-Management',
            description: 'Smart traffic management system using machine learning algorithms',
            language: 'Python',
            topics: ['machine-learning', 'traffic', 'smart-city'],
            stargazers_count: 20,
            forks_count: 8,
            updated_at: '2024-01-05',
            html_url: 'https://github.com/prachichoudhary2004'
        },
        {
            name: 'Metro-Navigator',
            description: 'Real-time metro navigation app with route optimization',
            language: 'JavaScript',
            topics: ['navigation', 'metro', 'optimization'],
            stargazers_count: 18,
            forks_count: 6,
            updated_at: '2023-12-20',
            html_url: 'https://github.com/prachichoudhary2004'
        },
        {
            name: 'Student-Database-Management',
            description: 'Comprehensive student management system with advanced features',
            language: 'Java',
            topics: ['database', 'management', 'education'],
            stargazers_count: 10,
            forks_count: 4,
            updated_at: '2023-12-15',
            html_url: 'https://github.com/prachichoudhary2004'
        },
        {
            name: 'AI-Data-Analysis-Tool',
            description: 'Advanced data analysis tool with machine learning capabilities',
            language: 'Python',
            topics: ['ai', 'data-science', 'analysis'],
            stargazers_count: 25,
            forks_count: 10,
            updated_at: '2023-12-10',
            html_url: 'https://github.com/prachichoudhary2004'
        }
    ];
    
    displayProjects(fallbackProjects, projectsContainer);
}
