// ============================================
// TEMA DEĞİŞTİRİCİ
// ============================================
// Sağ üstteki 4 renkli butona tıklanınca <body>'ye
// ilgili "tema-..." sınıfı eklenir/çıkarılır, böylece
// :root'taki tüm renk değişkenleri o temaya göre değişir.
// Seçim localStorage'a kaydedilir, sayfa yenilense de hatırlanır.

// Tüm tema butonlarını seçiyoruz
const temaButonlari = document.querySelectorAll(".tema-btn");

// "mavi" varsayılan temadır (:root'ta tanımlı), diğerleri body'ye
// eklenen sınıflarla geliyor. Tema değiştirirken önce bu sınıfları
// body'den temizlememiz gerekiyor.
const temaSiniflari = ["tema-yesil", "tema-turuncu", "tema-acik"];

// Verilen temayı sayfaya uygular ve aktif butonu işaretler
function temaUygula(tema) {
  // Önce olası eski tema sınıflarını kaldır
  document.body.classList.remove(...temaSiniflari);

  // "mavi" dışındaki temalar için body'ye ilgili sınıfı ekle
  if (tema !== "mavi") {
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
// yoksa varsayılan tema olan "mavi" ile başla
const kayitliTema = localStorage.getItem("secilenTema") || "mavi";
temaUygula(kayitliTema);
