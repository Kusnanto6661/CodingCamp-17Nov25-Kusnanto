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
        welcomeElement.textContent = `Halo ${name}Selamat Datang di Website Topi Jerami Kusnanto`;
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
             userName = "Harti"; // Default nama jika dibatalkan/kosong
        }
    }
    
    setWelcomeMessage(userName);
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