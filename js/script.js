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
