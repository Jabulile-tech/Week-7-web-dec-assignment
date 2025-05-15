const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const subjectSelect = document.getElementById('subjectSelect');
const customSubject = document.getElementById('customSubject');
const materialsContainer = document.getElementById('materialsContainer');

// Music toggle
const bgMusic = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
let isPlaying = false;

toggleBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    toggleBtn.textContent = '🎵 Play Music';
  } else {
    bgMusic.play();
    toggleBtn.textContent = '⏸ Pause Music';
  }
  isPlaying = !isPlaying;
});

// Drag and drop
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  fileInput.files = e.dataTransfer.files;
  soundDrop.play();
  document.getElementById('uploadForm').dispatchEvent(new Event('submit'));
});

// Show custom subject input
subjectSelect.addEventListener('change', () => {
  customSubject.style.display = subjectSelect.value === 'Other' ? 'block' : 'none';
});

// Upload form
document.getElementById('uploadForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return;

  const subject = subjectSelect.value === 'Other' ? customSubject.value : subjectSelect.value;
  if (!subject) return;

  const reader = new FileReader();
  reader.onload = function () {
    addMaterial(subject, file.name, reader.result);
    soundUpload.play();
    fileInput.value = '';
    customSubject.value = '';
  };
  reader.readAsDataURL(file);
});

// Add material to UI
function addMaterial(subject, fileName, fileData) {
  let subjectSection = document.querySelector(`.subject-section[data-subject="${subject}"]`);
  if (!subjectSection) {
    subjectSection = document.createElement('div');
    subjectSection.className = 'subject-section';
    subjectSection.dataset.subject = subject;
    subjectSection.innerHTML = `<h2>${subject}</h2><ul></ul>`;
    materialsContainer.appendChild(subjectSection);
  }

  const li = document.createElement('li');
  const ext = fileName.split('.').pop().toLowerCase();
  let content = `<strong>${fileName}</strong><br/>`;

  if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
    content += `<img src="${fileData}" alt="${fileName}" />`;
  } else if (ext === 'pdf') {
    content += `<iframe src="${fileData}" width="100%" height="200px"></iframe>`;
  } else {
    content += `<a href="${fileData}" download="${fileName}">📥 Download</a>`;
  }

  li.innerHTML = content;
  subjectSection.querySelector('ul').appendChild(li);
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function () {
  soundSearch.play();
  const searchTerm = this.value.toLowerCase();
  document.querySelectorAll('.subject-section').forEach(section => {
    const subject = section.dataset.subject.toLowerCase();
    const matchesSubject = subject.includes(searchTerm);
    let matchesFiles = false;

    section.querySelectorAll('li').forEach(li => {
      const match = li.textContent.toLowerCase().includes(searchTerm);
      li.style.display = match ? '' : 'none';
      if (match) matchesFiles = true;
    });

    section.style.display = matchesSubject || matchesFiles ? '' : 'none';
  });
});