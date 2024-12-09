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
const prevTopicButton = document.querySelector('#prev-topic');
const nextTopicButton = document.querySelector('#next-topic');

let activeSubject = null;  // To store the active subject
let activeTopic = null;    // To store the active topic
let currentSubject = null; // To track the currently selected subject
let currentTopicIndex = -1; // To track the current topic index

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

  currentSubject = subject; // Store the currently selected subject
  currentTopicIndex = 0; // Start at the first topic of the selected subject

  // Display topics for the selected subject
  subjects[subject].forEach((topic, index) => {
    let topicItem = document.createElement('div');
    topicItem.className = 'topic-item';
    topicItem.innerText = topic;
    topicItem.onclick = () => loadContent(subject, topic, topicItem, index);
    topicList.appendChild(topicItem);
  });

  // Load the first topic
  loadContent(subject, subjects[subject][0], topicList.children[0], 0);
}

function loadContent(subject, topic, topicItem, topicIndex) {
  // Set the active topic item
  if (activeTopic) {
    activeTopic.classList.remove('active');
  }
  topicItem.classList.add('active');
  activeTopic = topicItem;

  // Update the current topic index
  currentTopicIndex = topicIndex;

  // Simulate loading content for the selected subject and topic
  fetch(`content/${subject}/${topic}.html`)
    .then(response => response.text())
    .then(data => {
      contentArea.innerHTML = data;
    })
    .catch(error => {
      contentArea.innerHTML = `<h2>${topic}</h2><p>Content for ${topic} will be displayed here.</p>`;
    });

  // Update the buttons visibility
  updateNavButtons();
}

function updateNavButtons() {
  // Enable/Disable buttons based on the current topic index
  const subjectTopics = subjects[currentSubject];
  
  // Enable/Disable Previous Topic button
  if (currentTopicIndex > 0) {
    prevTopicButton.disabled = false;
  } else {
    prevTopicButton.disabled = true;
  }

  // Enable/Disable Next Topic button
  if (currentTopicIndex < subjectTopics.length - 1) {
    nextTopicButton.disabled = false;
  } else {
    nextTopicButton.disabled = true;
  }
}

// Functions for Previous and Next buttons
function prevTopic() {
  if (currentTopicIndex > 0) {
    currentTopicIndex--;
    loadContent(currentSubject, subjects[currentSubject][currentTopicIndex], topicList.children[currentTopicIndex], currentTopicIndex);
  }
}

function nextTopic() {
  if (currentTopicIndex < subjects[currentSubject].length - 1) {
    currentTopicIndex++;
    loadContent(currentSubject, subjects[currentSubject][currentTopicIndex], topicList.children[currentTopicIndex], currentTopicIndex);
  }
}

// Attach event listeners to buttons
prevTopicButton.addEventListener('click', prevTopic);
nextTopicButton.addEventListener('click', nextTopic);

loadSubjects();
