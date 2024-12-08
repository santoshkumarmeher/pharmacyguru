// Define notes in a JavaScript object
const notes = [
    {
        subject: "Pharmacology",
        content: [
            "Introduction to Pharmacology",
            "Drug Classifications",
            "Mechanism of Drug Action"
        ]
    },
    {
        subject: "Pharmacognosy",
        content: [
            "Herbal Medicines",
            "Extraction Methods",
            "Phytochemical Screening"
        ]
    },
    {
        subject: "Pharmaceutical Chemistry",
        content: [
            "Organic Chemistry Basics",
            "Medicinal Chemistry",
            "Analytical Techniques"
        ]
    },
    {
        subject: "Pharmaceutics",
        content: [
            "Dosage Forms",
            "Drug Delivery Systems",
            "Stability Studies"
        ]
    },
    {
        subject: "Biochemistry",
        content: [
            "Enzymes",
            "Metabolic Pathways",
            "Biochemical Analysis"
        ]
    }
];

const subjectList = document.getElementById('subject-list');
const contentArea = document.getElementById('content-area');

// Render subjects and content dynamically
notes.forEach((note, index) => {
    // Add subjects to the scroll-container
    const subjectDiv = document.createElement('div');
    subjectDiv.classList.add('scroll-item');
    subjectDiv.textContent = note.subject;
    subjectDiv.setAttribute('data-index', index);
    subjectList.appendChild(subjectDiv);

    // Create corresponding content areas
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content-area');
    contentDiv.id = `content${index}`;
    const contentHtml = `
        <h3>${note.subject}</h3>
        <ul>
            ${note.content.map(item => `<li>${item}</li>`).join('')}
        </ul>`;
    contentDiv.innerHTML = contentHtml;
    contentArea.appendChild(contentDiv);
});

// Event listener for subject clicks
subjectList.addEventListener('click', (event) => {
    if (event.target.classList.contains('scroll-item')) {
        const targetIndex = event.target.getAttribute('data-index');

        // Hide all content areas
        document.querySelectorAll('.content-area').forEach(area => area.classList.remove('active'));

        // Show selected content area
        document.getElementById(`content${targetIndex}`).classList.add('active');
    }
});