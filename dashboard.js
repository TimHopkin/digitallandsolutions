// Dashboard JavaScript for Digital Land Solutions
// Interactive functionality and data visualisation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize all dashboard components
    initCounterAnimations();
    initWorldMap();
    initCharts();
    initActivityFeed();
    initFilters();
    updateLastUpdatedTime();
    
    // Start real-time updates
    setInterval(updateLastUpdatedTime, 30000); // Update every 30 seconds
    setInterval(addRandomActivity, 45000); // Add activity every 45 seconds
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.style.overflow = '';
    }

    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close menu on overlay click
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Close menu on menu link click
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Animated Counter Function
function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        // Format number with commas for large numbers
        let displayValue = current.toLocaleString();
        
        // Handle special formatting
        if (suffix === ' M' && target >= 1000000) {
            displayValue = (current / 1000000).toFixed(1);
        } else if (suffix === ' K' && target >= 1000) {
            displayValue = (current / 1000).toFixed(0);
        }
        
        element.textContent = prefix + displayValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Initialize Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.metric-number');
    
    // Intersection Observer for triggering animations when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const prefix = entry.target.getAttribute('data-prefix') || '';
                const suffix = entry.target.getAttribute('data-suffix') || '';
                
                animateCounter(entry.target, target, 2000, prefix, suffix);
                entry.target.setAttribute('data-animated', 'true');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// World Map Data and Functionality - Expanded to 15 Countries
const countryData = {
    'Kenya': {
        name: 'Kenya',
        projects: 3,
        assets: '285K',
        area: '45K',
        status: 'active',
        coordinates: [-0.023559, 37.906193],
        projectList: [
            { name: 'Nairobi Land Registry', type: 'Land Registry', status: 'Active' },
            { name: 'Coastal Environmental Monitoring', type: 'Environmental', status: 'Active' },
            { name: 'Agricultural Land Certification', type: 'Land Registry', status: 'Completed' }
        ]
    },
    'Brazil': {
        name: 'Brazil',
        projects: 5,
        assets: '892K',
        area: '125K',
        status: 'active',
        coordinates: [-14.235004, -51.92528],
        projectList: [
            { name: 'Amazon Deforestation Monitoring', type: 'Environmental', status: 'Active' },
            { name: 'São Paulo Urban Registry', type: 'Land Registry', status: 'Active' },
            { name: 'Indigenous Land Rights Protection', type: 'Dispute Resolution', status: 'Active' }
        ]
    },
    'India': {
        name: 'India',
        projects: 4,
        assets: '567K',
        area: '89K',
        status: 'active',
        coordinates: [20.593684, 78.96288],
        projectList: [
            { name: 'Delhi Digital Land Records', type: 'Land Registry', status: 'Active' },
            { name: 'Rural Land Survey Modernisation', type: 'Land Registry', status: 'Active' },
            { name: 'Agricultural Sustainability Tracking', type: 'Environmental', status: 'Active' }
        ]
    },
    'Ghana': {
        name: 'Ghana',
        projects: 2,
        assets: '156K',
        area: '32K',
        status: 'active',
        coordinates: [7.946527, -1.023194],
        projectList: [
            { name: 'Accra Land Administration', type: 'Land Registry', status: 'Active' },
            { name: 'Cocoa Farm Certification', type: 'Environmental', status: 'Completed' }
        ]
    },
    'Philippines': {
        name: 'Philippines',
        projects: 3,
        assets: '234K',
        area: '56K',
        status: 'active',
        coordinates: [12.879721, 121.774017],
        projectList: [
            { name: 'Manila Bay Environmental Protection', type: 'Environmental', status: 'Active' },
            { name: 'Island Land Tenure Security', type: 'Land Registry', status: 'Active' },
            { name: 'Disaster Recovery Land Assessment', type: 'Dispute Resolution', status: 'Planned' }
        ]
    },
    'Nigeria': {
        name: 'Nigeria',
        projects: 4,
        assets: '423K',
        area: '67K',
        status: 'active',
        coordinates: [9.081999, 8.675277],
        projectList: [
            { name: 'Lagos Digital Property Registry', type: 'Land Registry', status: 'Active' },
            { name: 'Agricultural Land Mapping', type: 'Environmental', status: 'Active' }
        ]
    },
    'Indonesia': {
        name: 'Indonesia',
        projects: 3,
        assets: '334K',
        area: '89K',
        status: 'active',
        coordinates: [-0.789275, 113.921327],
        projectList: [
            { name: 'Forest Conservation Monitoring', type: 'Environmental', status: 'Active' },
            { name: 'Jakarta Land Registration', type: 'Land Registry', status: 'Active' }
        ]
    },
    'Colombia': {
        name: 'Colombia',
        projects: 2,
        assets: '198K',
        area: '43K',
        status: 'completed',
        coordinates: [4.570868, -74.297333],
        projectList: [
            { name: 'Rural Land Reform Registry', type: 'Land Registry', status: 'Completed' },
            { name: 'Bogotá Urban Planning', type: 'Land Registry', status: 'Completed' }
        ]
    },
    'Tanzania': {
        name: 'Tanzania',
        projects: 2,
        assets: '167K',
        area: '38K',
        status: 'active',
        coordinates: [-6.369028, 34.888822],
        projectList: [
            { name: 'Dar es Salaam Land Registration', type: 'Land Registry', status: 'Active' },
            { name: 'Wildlife Conservation Monitoring', type: 'Environmental', status: 'Active' }
        ]
    },
    'Bangladesh': {
        name: 'Bangladesh',
        projects: 3,
        assets: '278K',
        area: '29K',
        status: 'active',
        coordinates: [23.684994, 90.356331],
        projectList: [
            { name: 'Dhaka Digital Land Records', type: 'Land Registry', status: 'Active' },
            { name: 'Climate Resilience Monitoring', type: 'Environmental', status: 'Active' }
        ]
    },
    'Peru': {
        name: 'Peru',
        projects: 2,
        assets: '145K',
        area: '52K',
        status: 'completed',
        coordinates: [-9.189967, -75.015152],
        projectList: [
            { name: 'Amazon Territory Protection', type: 'Environmental', status: 'Completed' },
            { name: 'Lima Property Registration', type: 'Land Registry', status: 'Completed' }
        ]
    },
    'South Africa': {
        name: 'South Africa',
        projects: 3,
        assets: '312K',
        area: '78K',
        status: 'active',
        coordinates: [-30.559482, 22.937506],
        projectList: [
            { name: 'Cape Town Land Reform', type: 'Land Registry', status: 'Active' },
            { name: 'Conservation Area Management', type: 'Environmental', status: 'Active' }
        ]
    },
    'Mexico': {
        name: 'Mexico',
        projects: 2,
        assets: '234K',
        area: '45K',
        status: 'planned',
        coordinates: [23.634501, -102.552784],
        projectList: [
            { name: 'Mexico City Urban Registry', type: 'Land Registry', status: 'Planned' },
            { name: 'Yucatan Environmental Monitoring', type: 'Environmental', status: 'Planned' }
        ]
    },
    'Vietnam': {
        name: 'Vietnam',
        projects: 2,
        assets: '189K',
        area: '34K',
        status: 'planned',
        coordinates: [14.058324, 108.277199],
        projectList: [
            { name: 'Ho Chi Minh City Registry', type: 'Land Registry', status: 'Planned' },
            { name: 'Mekong Delta Monitoring', type: 'Environmental', status: 'Planned' }
        ]
    },
    'Rwanda': {
        name: 'Rwanda',
        projects: 1,
        assets: '67K',
        area: '18K',
        status: 'completed',
        coordinates: [-1.940278, 29.873888],
        projectList: [
            { name: 'National Land Registration', type: 'Land Registry', status: 'Completed' }
        ]
    },
    'United Kingdom': {
        name: 'United Kingdom',
        projects: 7500,
        assets: '2.8M',
        area: '10M',
        status: 'active',
        coordinates: [54.5, -2.0],
        projectList: [
            { name: 'England Digital Land Registry', type: 'Land Registry', status: 'Active' },
            { name: 'UK Environmental Monitoring Network', type: 'Environmental', status: 'Active' },
            { name: 'Scotland Land Reform Initiative', type: 'Land Registry', status: 'Active' },
            { name: 'Wales Sustainable Agriculture Programme', type: 'Environmental', status: 'Active' },
            { name: 'Northern Ireland Property Digitisation', type: 'Land Registry', status: 'Active' },
            { name: 'UK Carbon Monitoring System', type: 'Environmental', status: 'Active' }
        ]
    }
};

// Global map variables
let worldMap;
let currentLayer = 'street';
let countryMarkers = [];
let projectMarkers = [];

// Initialize Interactive World Map with Leaflet and OpenStreetMap
function initWorldMap() {
    const mapContainer = document.getElementById('world-map');
    
    // Initialize the map
    worldMap = L.map('world-map', {
        centre: [20, 0], // Centre on equator
        zoom: 2,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true
    });
    
    // Add OpenStreetMap tiles
    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    });
    
    // Add satellite tiles (using Esri World Imagery)
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 19
    });
    
    // Add default layer
    streetLayer.addTo(worldMap);
    
    // Add country markers and project locations
    addCountryMarkers();
    
    // Add map controls event listeners
    initMapControls();
    
    // Custom map styling
    worldMap.on('load', function() {
        console.log('World map loaded successfully');
    });
}

// Add Country Markers to Map
function addCountryMarkers() {
    // Clear existing markers
    countryMarkers.forEach(marker => worldMap.removeLayer(marker));
    projectMarkers.forEach(marker => worldMap.removeLayer(marker));
    countryMarkers = [];
    projectMarkers = [];
    
    // Add markers for each country
    Object.keys(countryData).forEach(countryName => {
        const country = countryData[countryName];
        const [lat, lng] = country.coordinates;
        
        // Determine marker style based on project status
        let markerColor = '#e0e0e0'; // default
        let markerSize = 10;
        
        switch(country.status) {
            case 'active':
                markerColor = '#009933'; // brand green
                markerSize = 12;
                break;
            case 'completed':
                markerColor = '#003366'; // brand blue
                markerSize = 10;
                break;
            case 'planned':
                markerColor = '#ffa500'; // orange
                markerSize = 8;
                break;
        }
        
        // Create custom marker
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: ${markerColor};
                width: ${markerSize}px;
                height: ${markerSize}px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                cursor: pointer;
                transition: all 0.3s ease;
            "></div>`,
            iconSize: [markerSize + 6, markerSize + 6],
            iconAnchor: [markerSize/2 + 3, markerSize/2 + 3]
        });
        
        // Create marker
        const marker = L.marker([lat, lng], { icon: customIcon })
            .addTo(worldMap);
        
        // Add popup with country information
        const popupContent = `
            <div style="min-width: 200px; font-family: 'Inter', sans-serif;">
                <h3 style="color: #003366; margin: 0 0 10px 0; font-size: 16px;">${country.name}</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-weight: 600;">Projects:</span>
                    <span>${country.projects}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-weight: 600;">Assets:</span>
                    <span>${country.assets}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="font-weight: 600;">Area:</span>
                    <span>${country.area} hectares</span>
                </div>
                <button onclick="showCountryDetail('${countryName}')" style="
                    background: #009933;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 600;
                    width: 100%;
                ">View Details</button>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // Add hover effects
        marker.on('mouseover', function() {
            const markerElement = this.getElement().querySelector('div');
            if (markerElement) {
                markerElement.style.transform = 'scale(1.3)';
                markerElement.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
            }
        });
        
        marker.on('mouseout', function() {
            const markerElement = this.getElement().querySelector('div');
            if (markerElement) {
                markerElement.style.transform = 'scale(1)';
                markerElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            }
        });
        
        // Add click handler
        marker.on('click', function() {
            showCountryDetail(countryName);
            worldMap.setView([lat, lng], 6); // Zoom to country
        });
        
        countryMarkers.push(marker);
    });
}

// Initialize Map Controls
function initMapControls() {
    const worldViewBtn = document.getElementById('world-view-btn');
    const satelliteViewBtn = document.getElementById('satellite-view-btn');
    
    if (worldViewBtn && satelliteViewBtn) {
        worldViewBtn.addEventListener('click', function() {
            if (currentLayer !== 'street') {
                worldMap.eachLayer(function(layer) {
                    if (layer._url && layer._url.includes('arcgisonline')) {
                        worldMap.removeLayer(layer);
                    }
                });
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 19
                }).addTo(worldMap);
                
                currentLayer = 'street';
                worldViewBtn.classList.add('active');
                satelliteViewBtn.classList.remove('active');
            }
        });
        
        satelliteViewBtn.addEventListener('click', function() {
            if (currentLayer !== 'satellite') {
                worldMap.eachLayer(function(layer) {
                    if (layer._url && layer._url.includes('openstreetmap')) {
                        worldMap.removeLayer(layer);
                    }
                });
                
                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                    maxZoom: 19
                }).addTo(worldMap);
                
                currentLayer = 'satellite';
                satelliteViewBtn.classList.add('active');
                worldViewBtn.classList.remove('active');
            }
        });
    }
}

// Show Country Detail Panel
function showCountryDetail(countryName) {
    const country = countryData[countryName];
    if (!country) return;
    
    const detailPanel = document.getElementById('country-detail');
    const countryNameElement = document.getElementById('country-name');
    const countryProjects = document.getElementById('country-projects');
    const countryAssets = document.getElementById('country-assets');
    const countryArea = document.getElementById('country-area');
    const projectsList = document.getElementById('country-projects-list');
    
    // Update country information
    countryNameElement.textContent = country.name;
    countryProjects.textContent = country.projects;
    countryAssets.textContent = country.assets;
    countryArea.textContent = country.area;
    
    // Update projects list
    projectsList.innerHTML = '';
    country.projectList.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.innerHTML = `
            <div style="margin-bottom: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                <div style="font-weight: 600; color: var(--primary-blue); margin-bottom: 0.25rem;">${project.name}</div>
                <div style="font-size: 0.9rem; color: var(--secondary-grey); margin-bottom: 0.25rem;">Type: ${project.type}</div>
                <div style="font-size: 0.85rem;">
                    <span style="padding: 0.25rem 0.75rem; border-radius: 12px; font-weight: 500; 
                          ${project.status === 'Active' ? 'background: rgba(0, 153, 51, 0.1); color: var(--accent-green);' : 
                            project.status === 'Completed' ? 'background: rgba(0, 51, 102, 0.1); color: var(--primary-blue);' : 
                            'background: rgba(255, 165, 0, 0.1); color: #ff8c00;'}">
                        ${project.status}
                    </span>
                </div>
            </div>
        `;
        projectsList.appendChild(projectDiv);
    });
    
    // Show the panel with animation
    detailPanel.style.display = 'block';
    
    // Zoom to country on map
    const [lat, lng] = country.coordinates;
    if (worldMap) {
        worldMap.setView([lat, lng], 6, { animate: true, duration: 1 });
    }
    
    // Add close functionality
    document.getElementById('close-detail').onclick = function() {
        detailPanel.style.display = 'none';
        // Return to world view
        if (worldMap) {
            worldMap.setView([20, 0], 2, { animate: true, duration: 1 });
        }
    };
}

// Initialize Charts
function initCharts() {
    // Growth Chart
    const growthCtx = document.getElementById('growth-chart');
    if (growthCtx) {
        new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: 'Projects Completed',
                    data: [2, 8, 15, 28, 45, 67],
                    borderColor: '#009933',
                    backgroundColor: 'rgba(0, 153, 51, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Countries Served',
                    data: [1, 3, 6, 9, 12, 15],
                    borderColor: '#003366',
                    backgroundColor: 'rgba(0, 51, 102, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Regional Distribution Chart
    const regionalCtx = document.getElementById('regional-chart');
    if (regionalCtx) {
        new Chart(regionalCtx, {
            type: 'doughnut',
            data: {
                labels: ['Africa', 'Asia', 'Latin America', 'Pacific'],
                datasets: [{
                    data: [40, 35, 20, 5],
                    backgroundColor: ['#009933', '#003366', '#0066cc', '#00cc66'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Project Types Chart
    const projectTypesCtx = document.getElementById('project-types-chart');
    if (projectTypesCtx) {
        new Chart(projectTypesCtx, {
            type: 'bar',
            data: {
                labels: ['Land Registry', 'Environmental', 'Dispute Resolution', 'Digital Services'],
                datasets: [{
                    label: 'Active Projects',
                    data: [28, 22, 12, 8],
                    backgroundColor: ['#009933', '#003366', '#0066cc', '#00cc66']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Environmental Impact Chart
    const environmentalCtx = document.getElementById('environmental-chart');
    if (environmentalCtx) {
        new Chart(environmentalCtx, {
            type: 'radar',
            data: {
                labels: ['Carbon Reduction', 'Biodiversity', 'Water Protection', 'Soil Conservation', 'Sustainable Agriculture'],
                datasets: [{
                    label: '2025 Impact',
                    data: [85, 78, 92, 76, 88],
                    borderColor: '#009933',
                    backgroundColor: 'rgba(0, 153, 51, 0.2)',
                    pointBackgroundColor: '#009933'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

// Activity Feed Data and Management
const activityTemplates = [
    {
        icon: '🏠',
        title: 'New Land Assets Secured',
        description: 'Successfully registered {count} new properties in {location}',
        locations: ['Nairobi, Kenya', 'São Paulo, Brazil', 'Mumbai, India', 'Lagos, Nigeria', 'Manila, Philippines']
    },
    {
        icon: '🌱',
        title: 'Environmental Monitoring Update',
        description: 'Satellite monitoring detected positive changes across {area} hectares in {location}',
        locations: ['Amazon Basin', 'Kenyan Highlands', 'Indonesian Forests', 'Ghanaian Reserves']
    },
    {
        icon: '⚖️',
        title: 'Land Dispute Resolved',
        description: 'Successfully mediated land boundary dispute in {location} through digital verification',
        locations: ['Rural Kenya', 'Urban Brazil', 'Coastal Philippines', 'Northern Ghana']
    },
    {
        icon: '📊',
        title: 'System Update',
        description: 'Enhanced data processing capabilities deployed across {count} active projects',
        locations: ['Global Network']
    }
];

// Initialize Activity Feed
function initActivityFeed() {
    const activityFeed = document.getElementById('activity-feed');
    
    // Add initial activities
    for (let i = 0; i < 5; i++) {
        addRandomActivity();
    }
}

// Add Random Activity to Feed
function addRandomActivity() {
    const activityFeed = document.getElementById('activity-feed');
    const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
    
    let description = template.description;
    if (description.includes('{count}')) {
        const count = Math.floor(Math.random() * 50) + 10;
        description = description.replace('{count}', count);
    }
    if (description.includes('{area}')) {
        const area = (Math.random() * 5000 + 1000).toFixed(0);
        description = description.replace('{area}', area);
    }
    if (description.includes('{location}')) {
        const location = template.locations[Math.floor(Math.random() * template.locations.length)];
        description = description.replace('{location}', location);
    }
    
    const timeAgo = Math.floor(Math.random() * 60) + 1;
    
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
        <div class="activity-icon">${template.icon}</div>
        <div class="activity-content">
            <div class="activity-title">${template.title}</div>
            <div class="activity-description">${description}</div>
            <div class="activity-time">${timeAgo} minutes ago</div>
        </div>
    `;
    
    // Insert at the beginning
    activityFeed.insertBefore(activityItem, activityFeed.firstChild);
    
    // Keep only the last 10 activities
    while (activityFeed.children.length > 10) {
        activityFeed.removeChild(activityFeed.lastChild);
    }
}

// Initialize Filters
function initFilters() {
    const regionFilter = document.getElementById('region-filter');
    const projectFilter = document.getElementById('project-filter');
    const timeframeFilter = document.getElementById('timeframe-filter');
    
    [regionFilter, projectFilter, timeframeFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
}

// Apply Filters (simulated)
function applyFilters() {
    const region = document.getElementById('region-filter').value;
    const projectType = document.getElementById('project-filter').value;
    const timeframe = document.getElementById('timeframe-filter').value;
    
    // Simulate filter application with visual feedback
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.style.opacity = '0.7';
        setTimeout(() => {
            card.style.opacity = '1';
        }, 500);
    });
    
    // In a real implementation, this would update the data and re-render charts
    console.log('Filters applied:', { region, projectType, timeframe });
}

// Update Last Updated Time
function updateLastUpdatedTime() {
    const lastUpdated = document.getElementById('last-updated');
    if (lastUpdated) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        lastUpdated.textContent = timeString;
    }
}

// Smooth scrolling for navigation (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behaviour: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    }
});