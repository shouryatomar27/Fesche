function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key, fallback) {
  const stored = localStorage.getItem(key);
  if (!stored) {
    return fallback;
  }
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return fallback;
  } catch (error) {
    console.error("Could not load " + key + ":", error);
    return fallback;
  }
}

function saveTasks() {
  saveData("tasks", tasks);
}

function loadTasks() {
  tasks = loadData("tasks", []);
}

function saveNotes() {
  saveData("notes", notes);
}

function loadNotes() {
  notes = loadData("notes", []);
}

function saveEvents() {
  saveData("events", events);
}

function loadEvents() {
  events = loadData("events", []);
}
function empty(){
  // testing empty function
}