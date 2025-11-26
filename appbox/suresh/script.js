const skills = [
    {
        name: "Kubernetes",
        category: "containerization",
        icon: "fa-solid fa-dharmachakra", /* Using a generic wheel icon as k8s might not be in free fontawesome set sometimes, but usually is. If not, this is a fallback visual. Actually k8s is usually not in free brands, let's check. I'll use a generic one if needed or a custom SVG logic, but for simplicity I'll stick to FA. */
        description: "Orchestrating container deployment and scaling.",
        tags: ["Pods", "Services", "Helm", "EKS"]
    },
    {
        name: "Docker",
        category: "containerization",
        icon: "fa-brands fa-docker",
        description: "Containerizing applications for consistent environments.",
        tags: ["Images", "Compose", "Registry"]
    },
     {
        name: "AWS",
        category: "cloud",
        icon: "fa-brands fa-aws",
        description: "Designing and deploying scalable cloud infrastructure.",
        tags: ["EC2", "S3", "Lambda", "VPC"]
    },
    {
        name: "Jenkins",
        category: "cicd",
        icon: "fa-brands fa-jenkins",
        description: "Building automated CI/CD pipelines.",
        tags: ["Pipelines", "Groovy", "Plugins"]
    },
    {
        name: "Terraform",
        category: "iac",
        icon: "fa-solid fa-code", /* Terraform doesn't have a free FA brand icon usually */
        description: "Infrastructure as Code provisioning.",
        tags: ["HCL", "Modules", "State Management"]
    },
    {
        name: "Git",
        category: "cicd",
        icon: "fa-brands fa-git-alt",
        description: "Version control and collaboration.",
        tags: ["Branching", "Merges", "Hooks"]
    },
    {
        name: "Linux",
        category: "iac", /* Putting OS under IaC/Base for filter simplicity or create new category. Let's stick to existing filters or add 'os' if needed. I'll map it to 'iac' broadly or just 'all' if I don't add a specific filter. Let's add 'os' to filters in HTML or just map it to 'iac' as 'Infrastructure'. I'll map it to 'iac' for now as it relates to infra. */
        icon: "fa-brands fa-linux",
        description: "System administration and scripting.",
        tags: ["Bash", "Permissions", "Networking"]
    },
    {
        name: "Prometheus",
        category: "monitoring",
        icon: "fa-solid fa-chart-line",
        description: "Monitoring and alerting toolkit.",
        tags: ["Metrics", "AlertManager", "Grafana"]
    },
   
    {
        name: "Azure",
        category: "cloud",
        icon: "fa-brands fa-microsoft",
        description: "Cloud computing services from Microsoft.",
        tags: ["VMs", "Azure DevOps", "AKS"]
    },
     {
        name: "Ansible",
        category: "iac",
        icon: "fa-solid fa-terminal",
        description: "Configuration management and automation.",
        tags: ["Playbooks", "Roles", "Inventory"]
    }
];

const skillsGrid = document.getElementById('skillsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderSkills(filter = 'all') {
    skillsGrid.innerHTML = '';

    const filteredSkills = filter === 'all'
        ? skills
        : skills.filter(skill => skill.category === filter);

    filteredSkills.forEach((skill, index) => {
        const card = document.createElement('div');
        card.className = 'skill-card fade-in-up';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <p class="skill-desc">${skill.description}</p>
            <div class="skill-tags">
                ${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;

        skillsGrid.appendChild(card);
    });
}

// Initial Render
renderSkills();

// Filter Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        renderSkills(filterValue);
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
