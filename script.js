// Define Subjects and Topics
const subjects = {
  Pharmacology: ["intro.html", "pharmacology2.html"],
  Pharmacognosy: ["pharmacognosy1.html", "pharmacognosy2.html"],
  "Pharmaceutical Chemistry": ["chemistry1.html", "chemistry2.html"],
  Pharmaceutics: ["pharmaceutics1.html", "pharmaceutics2.html"],
  Biochemistry: ["biochemistry1.html", "biochemistry2.html"],
};

const subjectListDiv = document.getElementById("subject-list");
const topicsDivMobile = document.getElementById("topics");
const topicsDivDesktop = document.getElementById("desktop-topics");
const contentArea = document.getElementById("content-area");
const offcanvasTopics = document.getElementById("offcanvasTopics"); // Offcanvas menu for mobile

// Populate Subject List (Navbar)
Object.keys(subjects).forEach((subject) => {
  const button = document.createElement("button");
  button.className = "btn btn-outline-primary subject-btn"; // Added class for identification
  button.textContent = subject;

  // Set onclick to load topics and make the subject active
  button.onclick = () => {
    setActiveSubject(button); // Call function to handle active state
    loadTopics(subject);
  };

  subjectListDiv.appendChild(button);
});

// Function to make a subject active
function setActiveSubject(activeButton) {
  const allSubjectButtons = document.querySelectorAll(".subject-btn");
  allSubjectButtons.forEach((btn) => btn.classList.remove("active-subject"));
  activeButton.classList.add("active-subject");
}

// Load Topics for a Selected Subject
function loadTopics(subject) {
  topicsDivMobile.innerHTML = ""; // Clear previous topics (mobile)
  topicsDivDesktop.innerHTML = ""; // Clear previous topics (desktop)
  const topicFiles = subjects[subject];

  topicFiles.forEach((file) => {
    fetch(`subjects/${subject}/${file}`)
      .then((response) => response.text())
      .then((html) => {
        const topicTitleMatch = html.match(/const topicTitle = "(.*?)";/);
        const topicTitle = topicTitleMatch ? topicTitleMatch[1] : "Untitled Topic";

        // Mobile Topics
        const buttonMobile = document.createElement("button");
        buttonMobile.className = "list-group-item list-group-item-action";
        buttonMobile.textContent = topicTitle;
        buttonMobile.onclick = () => {
          loadContent(subject, file, buttonMobile);
          closeOffcanvasMenu(); // Close the offcanvas menu after selection
        };
        topicsDivMobile.appendChild(buttonMobile);

        // Desktop Topics
        const buttonDesktop = document.createElement("button");
        buttonDesktop.className = "list-group-item list-group-item-action";
        buttonDesktop.textContent = topicTitle;
        buttonDesktop.onclick = () => loadContent(subject, file, buttonDesktop);
        topicsDivDesktop.appendChild(buttonDesktop);
      })
      .catch(() => {
        console.error(`Error loading topic file: subjects/${subject}/${file}`);
      });
  });

  contentArea.innerHTML = "<h2>Select a topic to view content</h2>";
}

// Function to close the offcanvas menu
function closeOffcanvasMenu() {
  const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasTopics);
  if (offcanvasInstance) {
    offcanvasInstance.hide();
  }
}

// Load Content Dynamically
function loadContent(subject, file, button) {
  const allButtons = document.querySelectorAll(".list-group-item");
  allButtons.forEach((btn) => btn.classList.remove("active-topic"));
  button.classList.add("active-topic");

  fetch(`subjects/${subject}/${file}`)
    .then((response) => response.text())
    .then((html) => {
      const content = html.replace(/<script.*?<\/script>/gs, "");
      contentArea.innerHTML = content;
    })
    .catch((error) => {
      contentArea.innerHTML = `<p>Error loading content: ${error.message}</p>`;
    });
}
