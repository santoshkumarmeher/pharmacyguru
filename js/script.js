// Define Subjects and Topics
const subjects = {
  Pharmacology: ["intro.html", "pharmacology2.html"],
  Pharmacognosy: ["pharmacognosy1.html", "pharmacognosy2.html"],
  "Pharmaceutical Chemistry": ["chemistry1.html", "chemistry2.html"],
  Pharmaceutics: ["pharmaceutics1.html", "pharmaceutics2.html"],
  Biochemistry: ["biochemistry1.html", "biochemistry2.html"],
};

const subjectListDiv = document.getElementById("subject-list");
const topicsDiv = document.getElementById("topics");
const contentArea = document.getElementById("content-area");

// Populate Subject List (Navbar)
Object.keys(subjects).forEach((subject) => {
  const li = document.createElement("li");
  li.className = "nav-item";

  const button = document.createElement("button");
  button.className = "btn btn-outline-light mx-2";
  button.textContent = subject;
  button.onclick = () => loadTopics(subject);

  li.appendChild(button);
  subjectListDiv.appendChild(li);
});

// Load Topics for a Selected Subject
function loadTopics(subject) {
  topicsDiv.innerHTML = ""; // Clear previous topics
  const topicFiles = subjects[subject];

  topicFiles.forEach((file) => {
      // Fetch topic files dynamically from the subject directory
      fetch(`subjects/${subject}/${file}`)
          .then((response) => response.text())
          .then((html) => {
              // Extract the topic title dynamically
              const topicTitleMatch = html.match(/const topicTitle = "(.*?)";/);
              const topicTitle = topicTitleMatch ? topicTitleMatch[1] : "Untitled Topic";

              // Add a button for the topic in the topic list
              const button = document.createElement("button");
              button.className = "list-group-item btn btn-link text-start w-100";
              button.textContent = topicTitle;
              button.onclick = () => loadContent(subject, file, button);
              topicsDiv.appendChild(button);
          })
          .catch(() => {
              console.error(`Error loading topic file: subjects/${subject}/${file}`);
          });
  });

  // Clear the content area when a new subject is selected
  contentArea.innerHTML = "<h2>Select a topic to view content</h2>";
}

// Load Content Dynamically
function loadContent(subject, file, button) {
  // Mark the clicked topic as active
  const allButtons = document.querySelectorAll(".list-group-item");
  allButtons.forEach((btn) => btn.classList.remove("active-topic")); // Remove "active" class from all buttons

  button.classList.add("active-topic"); // Add "active" class to the clicked topic

  // Load the content from the selected topic file
  fetch(`subjects/${subject}/${file}`)
      .then((response) => response.text())
      .then((html) => {
          // Remove the script tag to prevent it from re-executing
          const content = html.replace(/<script.*?<\/script>/gs, "");
          contentArea.innerHTML = content;
      })
      .catch((error) => {
          contentArea.innerHTML = `<p>Error loading content: ${error.message}</p>`;
      });
}
