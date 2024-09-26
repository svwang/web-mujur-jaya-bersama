document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("form1").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const items = document.querySelectorAll(".row .col-lg-2");

    items.forEach((item) => {
      const textContent = item.textContent.toLowerCase();
      const matchesKeyword = textContent.includes(keyword);

      if (keyword === "") {
        item.style.display = ""; // Tampilkan semua item jika input kosong
      } else if (matchesKeyword) {
        item.style.display = ""; // Tampilkan item yang cocok
      } else {
        item.style.display = "none"; // Sembunyikan item yang tidak cocok
      }
    });
  });

  function searchContent(event) {
    event.preventDefault(); // Mencegah halaman refresh

    const keyword = document.getElementById("form1").value.toLowerCase();
    const items = document.querySelectorAll(".row .col-lg-2");

    items.forEach((item) => {
      const textContent = item.textContent.toLowerCase();
      const matchesKeyword = textContent.includes(keyword);

      if (matchesKeyword) {
        item.style.display = ""; // Tampilkan item yang cocok
      } else {
        item.style.display = "none"; // Sembunyikan item yang tidak cocok
      }
    });
  }

  document
    .querySelector(".fa-search")
    .addEventListener("click", function (event) {
      searchContent(event);
    });

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
