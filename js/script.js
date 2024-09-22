AOS.init({
  duration: 1200, // Durasi animasi dalam milidetik
});

document.getElementById("form1").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const tabContent = document.getElementById("myTabContent");
  const items = tabContent.getElementsByClassName("col-lg-2");

  Array.from(items).forEach((item) => {
    const textContent = item.textContent.toLowerCase();
    const matchesKeyword = textContent.includes(keyword);

    if (keyword === "") {
      // Jika pencarian kosong, sembunyikan elemen yang memiliki class 'd-none'
      if (item.classList.contains("hide")) {
        item.style.display = "none";
      } else {
        item.style.display = "";
      }
    } else {
      // Jika ada kata kunci, tampilkan elemen jika sesuai dengan pencarian
      if (matchesKeyword) {
        item.classList.remove("d-none"); // Hapus class d-none jika sesuai pencarian
        item.style.display = ""; // Tampilkan item jika sesuai dengan pencarian
      } else {
        item.style.display = "none"; // Sembunyikan item jika tidak sesuai dengan pencarian
      }
    }
  });
});

// Dapatkan semua elemen video dan tombol play/pause
const videos = document.querySelectorAll(".interactiveVideo");
const playButtons = document.querySelectorAll(".playButton");
const fullscreenButtons = document.querySelectorAll(".fullscreenButton");

// Fungsi untuk pause dan menampilkan tombol play ketika video hilang dari layar
function pauseVideoWhenOutOfView(entries, observer) {
  entries.forEach((entry) => {
    const video = entry.target;
    const playButton = video.nextElementSibling; // Ambil tombol play dari video terkait

    if (!entry.isIntersecting) {
      // Jika video keluar dari viewport, pause dan tampilkan tombol play
      video.pause();
      playButton.style.display = "flex";
    }
  });
}

// Buat Intersection Observer untuk memantau video keluar dari viewport
const observer = new IntersectionObserver(pauseVideoWhenOutOfView, {
  threshold: 0.1, // Video akan terdeteksi hilang jika kurang dari 10% terlihat
});

// Iterasi setiap video dan tambahkan event listener serta observer
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

  // Play atau Pause ketika tombol play di-klik
  playButton.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  // Play/Pause juga bisa dilakukan ketika video di-klik
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
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

  // Tambahkan video ke observer agar bisa terdeteksi ketika hilang dari layar
  observer.observe(video);
});

// back to top
// Get the button:
let mybutton = document.getElementById("myBtb");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
