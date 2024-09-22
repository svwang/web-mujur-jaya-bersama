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
});

// Pencarian berdasarkan input
document.getElementById("form1").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const tabContent = document.getElementById("myTabContent");
  const items = tabContent.getElementsByClassName("col-lg-2");

  Array.from(items).forEach((item) => {
    const textContent = item.textContent.toLowerCase();
    const matchesKeyword = textContent.includes(keyword);

    if (keyword === "") {
      // Tampilkan semua item jika pencarian kosong
      item.style.display = "";
    } else {
      // Tampilkan item jika sesuai dengan kata kunci
      item.style.display = matchesKeyword ? "" : "none";
    }
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
