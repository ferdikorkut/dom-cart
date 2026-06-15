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


// ============================================
// SEPET (CART) MANTIĞI
// ============================================
// Sepetteki ürünleri bir dizi (array) içinde tutuyoruz.
// Her ürün şu şekilde bir obje: { isim, fiyat, adet }
// Sayfa ilk açıldığında localStorage'da kayıtlı bir sepet varsa onunla
// başlıyoruz (JSON.parse ile metinden diziye çeviriyoruz), yoksa boş dizi.
let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

// Sayfadaki ilgili elementleri seçiyoruz
const sepeteEkleButonlari = document.querySelectorAll(".sepete-ekle-btn");
const sepetListesi = document.getElementById("sepet-listesi");
const sepetBosMesaji = document.getElementById("sepet-bos-mesaji");
const toplamAdetEl = document.getElementById("toplam-adet");
const toplamFiyatEl = document.getElementById("toplam-fiyat");
const sepetiTemizleBtn = document.getElementById("sepeti-temizle-btn");
const bildirimKutu = document.getElementById("bildirim");
const bildirimMetin = document.getElementById("bildirim-metin");

// Bir metni HTML içine güvenli şekilde yazmak için kullanılır.
// Önce metni gizli bir <div>'in "textContent"ine veriyoruz (tarayıcı
// bunu düz metin olarak kabul eder), sonra o div'in "innerHTML"ini
// okuyoruz. Bu sırada tarayıcı <, >, & gibi karakterleri otomatik
// olarak HTML karşılıklarına çevirir (örn. < -> &lt;).
// Böylece bir ürün adı yanlışlıkla "<b>" gibi bir HTML etiketi
// içerse bile, kod olarak çalışmaz, düz yazı olarak görünür.
function escapeHTML(metin) {
  const gecici = document.createElement("div");
  gecici.textContent = metin;
  return gecici.innerHTML;
}

// "sepet" dizisini localStorage'a JSON metni olarak kaydeder
// (JSON.stringify ile diziyi metne çeviriyoruz). Böylece sayfa
// yenilense veya tarayıcı kapatılsa da sepet içeriği kaybolmaz.
function sepetiKaydet() {
  localStorage.setItem("sepet", JSON.stringify(sepet));
}

// Üstteki bildirim kutusunu verilen mesajla gösterir ve
// birkaç saniye sonra otomatik olarak gizler.
let bildirimZamanlayici;
function bildirimGoster(mesaj) {
  bildirimMetin.textContent = mesaj;
  bildirimKutu.classList.add("goster");

  // Üst üste hızlı tıklamalarda kutunun erken kapanmaması için
  // önceki zamanlayıcıyı iptal edip yeniden başlatıyoruz.
  clearTimeout(bildirimZamanlayici);
  bildirimZamanlayici = setTimeout(() => {
    bildirimKutu.classList.remove("goster");
  }, 10000);
}

// "sepet" dizisindeki verilere göre sayfanın sepet bölümünü
// baştan çizer: ürün satırlarını oluşturur, toplam adet ve
// toplam fiyatı günceller, sepet boşsa "boş" mesajını gösterir.
function sepetiGuncelle() {
  // Listeyi temizle, aşağıda yeniden dolduracağız
  sepetListesi.innerHTML = "";

  // Sepet boşsa "Sepetiniz şu anda boş." mesajını göster, doluysa gizle
  if (sepet.length === 0) {
    sepetBosMesaji.style.display = "block";
  } else {
    sepetBosMesaji.style.display = "none";
  }

  let toplamAdet = 0;
  let toplamFiyat = 0;

  // Sepetteki her ürün için bir liste öğesi (li) oluştur
  sepet.forEach((urun) => {
    toplamAdet += urun.adet;
    const araToplam = urun.fiyat * urun.adet;
    toplamFiyat += araToplam;

    const li = document.createElement("li");
    li.className = "sepet-urunu";
    // Şablon string (backtick ` `) kullanarak içine değişken
    // gömüyoruz: ${...} yazılan yerler gerçek değerle değişir.
    li.innerHTML = `
      <div class="sepet-urunu-ust">
        <div>
          <div class="sepet-urunu-ad">${escapeHTML(urun.isim)}</div>
          <div class="sepet-urunu-fiyat">${urun.fiyat} ₺</div>
        </div>
        <button class="sil-btn" data-isim="${escapeHTML(urun.isim)}">
          <i class="fa-solid fa-trash"></i> Sil
        </button>
      </div>
      <div class="sepet-urunu-alt">
        <div class="sepet-adet-kontrol">
          <button class="adet-btn azalt-btn" data-isim="${escapeHTML(urun.isim)}">-</button>
          <span class="sepet-adet">${urun.adet}</span>
          <button class="adet-btn artir-btn" data-isim="${escapeHTML(urun.isim)}">+</button>
        </div>
        <div class="sepet-urunu-arasum">${araToplam} ₺</div>
      </div>
    `;
    sepetListesi.appendChild(li);
  });

  // Toplam fiyatı yazdır
  toplamFiyatEl.textContent = toplamFiyat;

  // Toplam adedi yazdır
  toplamAdetEl.textContent = toplamAdet;

  // Güncel sepeti localStorage'a kaydet, böylece sayfa yenilense de kalır
  sepetiKaydet();
}

// Her "Sepete Ekle" butonuna tıklama olayı ekliyoruz
sepeteEkleButonlari.forEach((buton) => {
  buton.addEventListener("click", () => {
    const isim = buton.dataset.isim;
    const fiyat = Number(buton.dataset.fiyat);

    // Bu butonla aynı "urun-alt" kutusu içindeki adet input'unu bul
    const adetInput = buton.closest(".urun-alt").querySelector(".adet");
    let adet = Number(adetInput.value);

    // Geçersiz, boş, 0 veya negatif bir değer girilirse 1 kabul et
    if (!adet || adet < 1) {
      adet = 1;
    }

    // Bu ürün sepette zaten varsa adedini artır, yoksa sepete yeni ekle
    const mevcutUrun = sepet.find((u) => u.isim === isim);
    if (mevcutUrun) {
      mevcutUrun.adet += adet;
    } else {
      sepet.push({ isim: isim, fiyat: fiyat, adet: adet });
    }

    sepetiGuncelle();
    bildirimGoster(`${adet} adet ${isim} sepete eklendi.`);

    // Adet kutusunu tekrar 1'e döndür
    adetInput.value = 1;
  });
});

// Sepet listesindeki +/- ve Sil butonları sayfa yüklenirken DOM'da yok,
// JS tarafından sonradan oluşturuluyor. Bu yüzden tek tek bu butonlara
// değil, hep var olan #sepet-listesi'ne bir dinleyici ekliyoruz ve
// hangi butona tıklandığını "e.target" üzerinden anlıyoruz
// (buna "event delegation" denir).
sepetListesi.addEventListener("click", (e) => {
  // Tıklanan elemanın en yakın <button> atasını bul.
  // (İkon (<i>) üzerine tıklansa da butonun kendisini bulur.)
  const buton = e.target.closest("button");
  if (!buton) return;

  const isim = buton.dataset.isim;
  const urun = sepet.find((u) => u.isim === isim);
  if (!urun) return;

  if (buton.classList.contains("artir-btn")) {
    urun.adet++;
    bildirimGoster(`${isim} adedi ${urun.adet} olarak güncellendi.`);
  } else if (buton.classList.contains("azalt-btn")) {
    urun.adet--;
    if (urun.adet <= 0) {
      // Adet sıfırlanınca ürünü sepetten tamamen çıkar
      sepet = sepet.filter((u) => u.isim !== isim);
      bildirimGoster(`${isim} sepetten çıkarıldı.`);
    } else {
      bildirimGoster(`${isim} adedi ${urun.adet} olarak güncellendi.`);
    }
  } else if (buton.classList.contains("sil-btn")) {
    sepet = sepet.filter((u) => u.isim !== isim);
    bildirimGoster(`${isim} sepetten silindi.`);
  }

  sepetiGuncelle();
});

// "Sepeti Temizle" butonu: sepetteki tüm ürünleri kaldırır
sepetiTemizleBtn.addEventListener("click", () => {
  if (sepet.length === 0) return;
  sepet = [];
  sepetiGuncelle();
  bildirimGoster("Sepet temizlendi.");
});

// Sayfa ilk açıldığında localStorage'dan okunan sepeti ekrana bas
sepetiGuncelle();
