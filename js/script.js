// Event ini akan dijalankan ketika seluruh elemen halaman selesai dimuat
// form email account emailjs

window.onload = function () {
  // Hilangkan spinner
  document.querySelector(".loading-screen").style.display = "none";

  // Tampilkan konten halaman
  document.querySelector(".container-page").style.display = "block";

  // Validasi input sebelum submit
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Ambil nilai input dari form
      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let subject = document.getElementById("subject").value.trim();
      let message = document.getElementById("message").value.trim();

      // Validasi email
      if (!validateEmail(email)) {
        Swal.fire({
          icon: "error",
          title: "Email tidak valid!",
          text: "Mohon masukkan email yang benar",
        });
        return;
      }

      // Validasi apakah field tidak kosong
      if (name === "" || subject === "" || message === "") {
        Swal.fire({
          icon: "error",
          title: "Form tidak lengkap!",
          text: "Nama, Subjek, dan Pesan tidak boleh kosong.",
        });
        return;
      }

      // Sanitasi input sebelum dikirim
      name = sanitizeInput(name);
      subject = sanitizeInput(subject);
      message = sanitizeInput(message);

      // Kirim form melalui emailjs
      emailjs.sendForm("service_snz9fuj", "template_z2rk5g7", this).then(
        () => {
          Swal.fire({
            title: "Berhasil!",
            text: "Pesan terkirim!",
            icon: "success",
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Mohon maaf...",
            text: "Silahkan tunggu beberapa saat lagi!",
            footer:
              '<a href="https://wa.me/628114119788">Atau klik disini, untuk kontak kami di Whatsapp?</a>',
          });
        }
      );
    });
};

// Function validasi email menggunakan regex
function validateEmail(email) {
  const re = /^[^\s@]+@gmail\.com$/; // Validasi hanya untuk @gmail.com
  return re.test(String(email).toLowerCase());
}

// Function sanitasi input agar aman dari karakter berbahaya
function sanitizeInput(input) {
  return input.replace(/<\/?[^>]+(>|$)/g, ""); // Menghapus tag HTML
}

// Inisialisasi AOS untuk animasi
AOS.init({
  duration: 1200, // Durasi animasi dalam milidetik
});

// Event listener untuk video
document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".interactiveVideo");
  const playButtons = document.querySelectorAll(".playButton");
  const fullscreenButtons = document.querySelectorAll(".fullscreenButton");

  // Fungsi untuk pause video dan menampilkan tombol play
  function pauseVideoWhenOutOfView(entries) {
    entries.forEach((entry) => {
      const video = entry.target;
      const playButton = video.nextElementSibling;

      if (!entry.isIntersecting) {
        video.pause();
        playButton.style.display = "flex";
      }
    });
  }

  // Buat Intersection Observer
  const observer = new IntersectionObserver(pauseVideoWhenOutOfView, {
    threshold: 0.1,
  });

  // Iterasi dan tambahkan event listener untuk setiap video
  videos.forEach((video, index) => {
    const playButton = playButtons[index];
    const fullscreenButton = fullscreenButtons[index];

    // Tampilkan tombol play jika video dijeda
    video.addEventListener("pause", () => {
      playButton.style.display = "flex";
    });

    // Sembunyikan tombol play jika video diputar
    video.addEventListener("play", () => {
      playButton.style.display = "none";
    });

    // Play/Pause ketika tombol play di-klik
    playButton.addEventListener("click", () => {
      video.paused ? video.play() : video.pause();
    });

    // Play/Pause ketika video di-klik
    video.addEventListener("click", () => {
      video.paused ? video.play() : video.pause();
    });

    // Fungsi fullscreen
    fullscreenButton.addEventListener("click", () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    });

    // Tambahkan video ke observer
    observer.observe(video);
  });

  // Integrasi ke whatsapp
  const whatsappLinks = document.querySelectorAll(".whatsapp-link");

  whatsappLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah link default
      const productName = this.getAttribute("data-product-name");
      const phoneNumber = "628114119788"; // Ganti dengan nomor yang sesuai
      const message = `Saya ingin membeli produk: ${productName}`;
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      // Buka link WhatsApp baru
      window.open(whatsappURL, "_blank");
    });
  });
});

// Back to top button
let mybutton = document.getElementById("myBtb");

// Ketika pengguna menggulir ke bawah 20px dari atas dokumen, tampilkan tombol
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  mybutton.style.display =
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      ? "block"
      : "none";
}

// Ketika pengguna mengklik tombol, gulir ke atas dokumen
function topFunction() {
  document.body.scrollTop = 0; // Untuk Safari
  document.documentElement.scrollTop = 0; // Untuk Chrome, Firefox, IE, dan Opera
}
