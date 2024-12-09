const subjects = {
  "Pharmacology": ["Introduction", "Drug Classifications", "Mechanism of Action"],
  "Pharmacognosy": ["Herbal Drugs", "Extraction Methods"],
  "Pharmaceutical Chemistry": ["Organic Chemistry", "Inorganic Chemistry"],
  "Pharmaceutics": ["Formulation", "Drug Delivery"],
  "Biochemistry": ["Metabolism", "Enzymes"]
};

const subjectList = document.querySelector('.subject-list');
const topicList = document.querySelector('.topic-list'); // Now this will be used for topics
const contentArea = document.querySelector('.content-area');

let activeSubject = null;  // To store the active subject
let activeTopic = null;    // To store the active topic

function loadSubjects() {
  for (let subject in subjects) {
    let subjectButton = document.createElement('button');
    subjectButton.className = 'btn btn-outline-primary mr-2';
    subjectButton.innerText = subject;
    subjectButton.onclick = () => loadTopics(subject, subjectButton);
    subjectList.appendChild(subjectButton);
  }
}

function loadTopics(subject, subjectButton) {
  // Clear previous topics
  topicList.innerHTML = '';

  // Set the active subject button
  if (activeSubject) {
    activeSubject.classList.remove('active');
  }
  subjectButton.classList.add('active');
  activeSubject = subjectButton;

  // Check if screen width is small (mobile view)
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    // For mobile, show topics in a simple list
    subjects[subject].forEach(topic => {
      let topicItem = document.createElement('div');
      topicItem.className = 'topic-item';
      topicItem.innerText = topic;
      topicItem.onclick = () => loadContent(subject, topic, topicItem);
      topicList.appendChild(topicItem);
    });
  } else {
    // For desktop, show topics horizontally scrollable
    subjects[subject].forEach(topic => {
      let topicItem = document.createElement('div');
      topicItem.className = 'topic-item';
      topicItem.innerText = topic;
      topicItem.onclick = () => loadContent(subject, topic, topicItem);
      topicList.appendChild(topicItem);
    });
  }
}

function loadContent(subject, topic, topicItem) {
  // Set the active topic item
  if (activeTopic) {
    activeTopic.classList.remove('active');
  }
  topicItem.classList.add('active');
  activeTopic = topicItem;

  // Simulate loading content for the selected subject and topic
  fetch(`content/${subject}/${topic}.html`)
    .then(response => response.text())
    .then(data => {
      contentArea.innerHTML = data;
    })
    .catch(error => {
      contentArea.innerHTML = `<h2>${topic}</h2><p>Content for ${topic} will be displayed here.</p>`;
    });
}

loadSubjects();
