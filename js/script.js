// js/script.js

// 1. Fungsi untuk menampilkan tanggal dan waktu saat ini
function displayCurrentDateTime() {
    const dateTimeElement = document.getElementById('current-date-time');
    const now = new Date();
    
    // Format tanggal dan waktu
    const options = {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZoneName: 'short'
    };
    const formattedDateTime = now.toLocaleDateString('id-ID', options);
    
    // Tampilkan
    if (dateTimeElement) {
        dateTimeElement.textContent = formattedDateTime;
    }
}

// 2. Fungsi untuk menampilkan pesan selamat datang (Hi [Nama])
function setWelcomeMessage(name = "User") {
    const welcomeElement = document.getElementById('welcome-message');
    if (welcomeElement) {
        welcomeElement.textContent = ` ${name}  Selamat Datang di Website Topi Jerami Kusnanto`;
    }
}

// Panggil saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Tampilkan waktu/tanggal saat ini
    displayCurrentDateTime();
    
    // Ambil nama dari user (bisa dari prompt, local storage, atau hardcode)
    // Sesuai instruksi: "Nama tersebut diisi menggunakan JavaScript."
    // Kita gunakan prompt sebagai contoh interaktif
    let userName = localStorage.getItem('userName');
    if (!userName) {
        userName = prompt("Masukkan nama Anda untuk pesan selamat datang:");
        if (userName) {
             // Simpan nama di local storage agar tidak ditanyakan lagi
             localStorage.setItem('userName', userName);
        } else {
             userName = "Nakama"; // Default nama jika dibatalkan/kosong
        }
    }
    
    setWelcomeMessage(userName);
});

// js/script.js - Revisi untuk mensimulasikan Server API

// 1. Variabel Global dan Simulai Database (In-Memory Array)
let tasks = [];
let nextId = 1; // Untuk simulasi ID unik dari database

// Mendapatkan referensi ke elemen HTML
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');


// --- FUNGSI SIMULASI API (Asynchronous) ---

// 2. Simulasi GET Request (Load Tasks)
function simulateFetchTasks() {
    return new Promise(resolve => {
        // Simulasikan delay jaringan 500ms
        setTimeout(() => {
            resolve(tasks); 
        }, 500);
    });
}

// 3. Simulasi POST Request (Add Task)
function simulatePostTask(taskText) {
    const newTask = { 
        id: nextId++, 
        text: taskText 
    };
    return new Promise(resolve => {
        setTimeout(() => {
            tasks.push(newTask);
            resolve(newTask);
        }, 500);
    });
}

// 4. Simulasi DELETE Request (Delete Task)
function simulateDeleteTask(idToDelete) {
    return new Promise(resolve => {
        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== idToDelete);
            resolve(true);
        }, 500);
    });
}


// --- FUNGSI UTAMA DISPLAY (Render dan Interaksi) ---

// 5. Render Tasks (Menampilkan data ke HTML)
function renderTasks() {
    taskList.innerHTML = ''; 

    tasks.forEach(task => {
        // Misi 1: Membuat elemen HTML baru (li, button) hanya dengan JavaScript
        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-button');

        // Menggunakan task.id, BUKAN index
        deleteButton.addEventListener('click', () => handleDelete(task.id));

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}


// 6. Handler Ambil Tugas (ASYNC)
async function handleLoad() {
    taskList.innerHTML = '<li>Memuat data dari server...</li>'; // Loading state
    try {
        const fetchedTasks = await simulateFetchTasks();
        tasks = fetchedTasks;
        renderTasks();
    } catch (e) {
        taskList.innerHTML = '<li>Gagal memuat data.</li>';
    }
}

// 7. Handler Tambah Tugas (ASYNC)
async function handleAdd() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Nonaktifkan tombol saat loading
        addTaskButton.disabled = true;
        addTaskButton.textContent = 'Menyimpan...'; 
        
        await simulatePostTask(taskText); 
        
        // Aktifkan kembali
        addTaskButton.disabled = false;
        addTaskButton.textContent = 'Tambah Tugas'; 

        taskInput.value = '';
        renderTasks(); // Render setelah penambahan
    } else {
        alert('Tugas tidak boleh kosong!');
    }
}

// 8. Handler Hapus Tugas (ASYNC)
async function handleDelete(id) {
    const listItem = event.target.closest('li');
    listItem.style.opacity = 0.5; // Efek visual saat menghapus
    
    await simulateDeleteTask(id);
    
    renderTasks(); // Render setelah penghapusan
}


// --- TITIK AWAL APLIKASI (Initialization) ---
handleLoad(); // Panggil handler load baru

// Menambahkan event listener ke tombol utama
addTaskButton.addEventListener('click', handleAdd);

// Memungkinkan Enter Key di input
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleAdd();
    }
});
// js/script.js (lanjutan)

// 3. Fungsi untuk validasi form dan menampilkan hasilnya
function handleFormSubmission(event) {
    event.preventDefault(); // Mencegah reload halaman default

    const form = document.getElementById('messageForm');
    const outputDiv = document.getElementById('output-data');
    
    // Ambil nilai dari semua input
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const phone = form.elements['phone'].value;
    const dob = form.elements['dob'].value;
    const gender = form.elements['gender'].value;
    const message = form.elements['message'].value;

    // --- Validasi (Sederhana) ---
    // Pastikan semua kolom yang required sudah terisi
    if (!name || !email || !phone || !dob || !gender || !message) {
        alert("Mohon lengkapi semua kolom yang wajib diisi!");
        return; 
    }

    // Validasi format Email (sederhana)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Format email tidak valid.");
        return;
    }

    // Validasi Nomor Telepon (hanya angka, minimal 8 digit)
    const phoneRegex = /^\d{8,}$/;
    if (!phoneRegex.test(phone)) {
        alert("Nomor telepon minimal 8 digit dan hanya boleh mengandung angka.");
        return;
    }
    // --- Akhir Validasi ---

    // Jika validasi berhasil, tampilkan hasilnya
    outputDiv.innerHTML = `
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nomor Telepon:</strong> ${phone}</p>
        <p><strong>Tanggal Lahir:</strong> ${dob}</p>
        <p><strong>Jenis Kelamin:</strong> ${gender}</p>
        <p><strong>Pesan:</strong> ${message}</p>
    `;

    // Opsional: Reset form setelah submit
    form.reset();
    alert("Pesan berhasil dikirim dan ditampilkan di samping!");
}

// Tambahkan event listener untuk form setelah DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... kode 5.1 sebelumnya ...
    // Panggil displayCurrentDateTime(); dan setWelcomeMessage(userName); di sini.

    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', handleFormSubmission);
    }
});

// js/script.js - Tambahkan di bagian paling bawah.

// Mendapatkan referensi elemen
const quoteContainer = document.getElementById('quote-container');
const fetchQuoteButton = document.getElementById('fetch-quote-button');
const QUOTE_API_URL = './data/quote.json'; // API kutipan publik sederhana

// --- FUNGSI UTAMA ASYNCHRONOUS ---

async function fetchQuote() {
    // 1. Tampilkan status loading
    quoteContainer.innerHTML = '<p>Sedang memuat kutipan...</p>';

    try {
        // 2. Misi 2: Menggunakan 'await fetch()' untuk meminta data dari server
        // 'await' akan menunggu sampai data benar-benar datang dari internet
        const response = await fetch(QUOTE_API_URL); 

        // 3. Memastikan respons berhasil (Kode status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 4. Mengubah respons data menjadi format JSON
        // Logika Baru: Mengambil Array data, lalu memilih 1 item secara acak
const data = await response.json(); 
        
// Pilih kutipan acak dari Array data JSON lokal
const randomIndex = Math.floor(Math.random() * data.length);
const randomQuote = data[randomIndex]; // <-- Ambil objek kutipan

// Tampilkan kutipan dalam Bahasa Indonesia
quoteContainer.innerHTML = `
    <p>"${randomQuote.quote}"</p>
    <small>— ${randomQuote.author}</small>
`;

    } catch (error) {
        // 6. Penanganan error jika koneksi gagal atau API bermasalah
        console.error("Gagal mengambil kutipan:", error);
        quoteContainer.innerHTML = '<p style="color: red;">Gagal mengambil kutipan. Cek koneksi internet Anda.</p>';
    }
}

// Tambahkan event listener untuk tombol
fetchQuoteButton.addEventListener('click', fetchQuote);

// Ambil kutipan secara otomatis saat halaman pertama kali dimuat
fetchQuote();