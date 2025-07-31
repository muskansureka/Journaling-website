// Wait until the webpage content is fully loaded
window.onload = function () {
    loadEntries();
};

// Save a new journal entry
function saveEntry() {
    const textArea = document.getElementById("journalInput");
    let text = textArea.value.trim();

    if (text === "") {
        alert("⚠ Please write something before saving.");
        return;
    }

    // Get existing entries or create an empty array
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

    // Create new entry with timestamp
    let entry = {
        date: new Date().toLocaleString(),
        text: text
    };

    // Add entry and save
    entries.push(entry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    // Clear input and reload entries
    textArea.value = "";
    loadEntries();
}

// Load all journal entries and display them
function loadEntries() {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    let container = document.getElementById("entries");
    container.innerHTML = "";

    if (entries.length === 0) {
        container.innerHTML = "<p>No journal entries yet. Start writing!</p>";
        return;
    }

    // Show each entry
    entries.forEach((entry, index) => {
        let div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `
            <strong>${entry.date}</strong>
            <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
            <p>${entry.text}</p>
        `;
        container.appendChild(div);
    });
}

// Delete a specific entry
function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.splice(index, 1); // remove entry
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    loadEntries();
}
