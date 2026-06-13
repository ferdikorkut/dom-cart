// ============================================
// TEMA DEĞİŞTİRİCİ
// ============================================
// Sağ üstteki 4 renkli butona tıklanınca <body>'ye
// ilgili "tema-..." sınıfı eklenir/çıkarılır, böylece
// :root'taki tüm renk değişkenleri o temaya göre değişir.
// Seçim localStorage'a kaydedilir, sayfa yenilense de hatırlanır.

// Tüm tema butonlarını seçiyoruz
const temaButonlari = document.querySelectorAll(".tema-btn");

// "acik" varsayılan temadır (:root'ta tanımlı), diğerleri body'ye
// eklenen sınıflarla geliyor. Tema değiştirirken önce bu sınıfları
// body'den temizlememiz gerekiyor.
const temaSiniflari = ["tema-yesil", "tema-turuncu", "tema-mavi"];

// Verilen temayı sayfaya uygular ve aktif butonu işaretler
function temaUygula(tema) {
  // Önce olası eski tema sınıflarını kaldır
  document.body.classList.remove(...temaSiniflari);

  // "acik" dışındaki temalar için body'ye ilgili sınıfı ekle
  if (tema !== "acik") {
    document.body.classList.add("tema-" + tema);
  }

  // Hangi buton seçiliyse ona "aktif" sınıfını ver, diğerlerinden kaldır
  temaButonlari.forEach((buton) => {
    buton.classList.toggle("aktif", buton.dataset.tema === tema);
  });

  // Seçimi kaydet, sayfa yenilenince aynı tema açılsın
  localStorage.setItem("secilenTema", tema);
}

// Her butona tıklama olayı ekliyoruz
temaButonlari.forEach((buton) => {
  buton.addEventListener("click", () => {
    temaUygula(buton.dataset.tema);
  });
});

// Sayfa ilk açıldığında: önceden seçilmiş bir tema varsa onu uygula,
// yoksa varsayılan tema olan "acik" ile başla
const kayitliTema = localStorage.getItem("secilenTema") || "acik";
temaUygula(kayitliTema);
