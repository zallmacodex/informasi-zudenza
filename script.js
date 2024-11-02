const validPasswords = ["namaAnda", "namaTeman"]; // Ganti "namaAnda" dan "namaTeman" dengan nama yang sebenarnya

window.onload = function() {
    loadDiaryEntries();
    displayDiaryEntries();
    showPage('add-page'); // Menampilkan halaman tambah catatan secara default
};

document.getElementById('diary-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const diaryEntry = document.getElementById('diary-entry').value;
    const userName = document.getElementById('user-name').value;
    const entryPassword = document.getElementById('entry-password').value;

    if (diaryEntry && userName && entryPassword) {
        if (validPasswords.includes(entryPassword)) {
            const entry = {
                name: userName,
                date: new Date().toLocaleString(),
                text: diaryEntry
            };
            saveDiaryEntry(entry);
            document.getElementById('diary-entry').value = '';
            document.getElementById('user-name').value = '';
            document.getElementById('entry-password').value = '';
            displayDiaryEntries();
        } else {
            alert('Kata sandi tidak sesuai. Informasi tidak dapat ditambahkan.');
        }
    } else {
        alert('Semua kolom harus diisi.');
    }
});

let entries = [];

function saveDiaryEntry(entry) {
    entries.push(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
}

function loadDiaryEntries() {
    const storedEntries = localStorage.getItem('diaryEntries');
    if (storedEntries) {
        entries = JSON.parse(storedEntries);
    }
}

function displayDiaryEntries() {
    const entriesList = document.getElementById('entries-list');
    entriesList.innerHTML = '';
    entries.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('entry');
        entryElement.innerHTML = `
            <strong>${index + 1}. ${entry.name}</strong><br>
            ${entry.text}<br>
            <em>${entry.date}</em>
        `;
        entriesList.appendChild(entryElement);
    });
}

document.getElementById('delete-button').addEventListener('click', function() {
    const deletePassword = document.getElementById('delete-password').value;
    const entryIndex = parseInt(document.getElementById('entry-index').value) - 1;

    if (entryIndex >= 0 && entryIndex < entries.length && deletePassword) {
        if (validPasswords.includes(deletePassword)) {
            entries.splice(entryIndex, 1);
            localStorage.setItem('diaryEntries', JSON.stringify(entries));
            document.getElementById('delete-password').value = '';
            document.getElementById('entry-index').value = '';
            displayDiaryEntries();
        } else {
            alert('Kata sandi tidak sesuai.');
        }
    } else {
        alert('Indeks informasi tidak valid atau password tidak diisi.');
    }
});

// Fungsi untuk menampilkan halaman yang sesuai
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none'; // Sembunyikan semua halaman
    });
    document.getElementById(pageId).style.display = 'block'; // Tampilkan halaman yang dipilih
}