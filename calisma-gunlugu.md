# Çalışma Günlüğü — DOM Cart

Bu dosya, projede yaptığımız işlemlerin kısa kaydını tutar.
Her oturumda neyin neden yapıldığını buradan tekrar gözden geçirebilirsin.

---

## 2026-06-13

### Proje Planı
- Proje fikri: DOM manipülasyonu öğrenmek için basit bir "ürün listesi + sepete ekle" uygulaması.
- Sayfa düzeni kararlaştırıldı:
  - Üstte "DOM CART" başlığı + açıklama paragrafı + işlem bildirim satırı
  - Solda ürünler (2'li grid), sağda "Sepetim" bölümü
  - Mobilde tek sütuna düşecek, sepet en altta kalacak
- Adımlar: 1) HTML  2) CSS  3) JS (sepet mantığı + bildirim)  4) localStorage ile kalıcı kayıt

### 1. Adım — HTML (tamamlandı)
- `index.html` oluşturuldu.
- `header`: "DOM CART" başlığı, açıklama paragrafı, `#bildirim` (işlem mesajları için boş paragraf)
- `main` içinde iki bölüm:
  - `.urunler` (section): 4 ürün kartı (`.urun-karti`) — Klavye (450₺), Kulaklık (650₺), Laptop (25000₺), Mouse (250₺)
    - Her kartta: resim, isim, açıklama, fiyat, adet `input`, "Sepete Ekle" `button`
    - Butonlarda `data-isim` ve `data-fiyat` özel attribute'ları var — JS bunları okuyacak
  - `.sepetim` (aside): "Sepetim" başlığı, `#toplam-adet`, `#sepet-listesi` (ul), `#toplam-fiyat`, "Sepeti Temizle" butonu
- Tüm bölümlere ne işe yaradığını açıklayan Türkçe yorumlar eklendi.

### 2. Adım — CSS (tamamlandı)
- `style.css` oluşturuldu.
- Genel reset (`* { box-sizing: border-box; margin: 0; padding: 0; }`)
- `header`: ortalanmış başlık/açıklama, `#bildirim` için min-height (sayfa zıplamasın)
- `main`: flexbox ile `.urunler` ve `.sepetim` yan yana (flex: 2 / flex: 1)
- `.urunler`: 2 sütunlu CSS Grid (`grid-template-columns: repeat(2, 1fr)`)
- `.urun-karti`: flexbox column — resim, isim, açıklama, fiyat üstte; `.urun-alt` (adet + buton) `margin-top: auto` ile kartın en altına sabitlendi
- `.sepetim`: liste, toplamlar ve "Sepeti Temizle" butonu için stiller
- Mobil uyum: `@media (max-width: 768px)` → `main` dikey sıralanır (ürünler üstte, sepetim altta), `.urunler` grid'i 1 sütuna düşer

### 2b. Adım — Tasarım ve Responsive Güncellemesi (tamamlandı)
- Kullanıcının verdiği örnek dosya incelendi, resize sorununun nedeni belirlendi:
  eski `.urunler` grid'i sabit `repeat(2, 1fr)` idi → ara genişliklerde kartlar sıkışıyordu.
- **HTML güncellemeleri:**
  - Tüm içerik `.sayfa` kapsayıcısına alındı
  - Font Awesome ikonları eklendi (Google Fonts eklenmedi, varsayılan sistem fontu kullanılıyor)
  - `#bildirim` artık ikon + metin içeren, JS ile açılıp kapanacak bir kutu
  - `.sepetim` içine `#sepet-bos-mesaji` eklendi (sepet boşken gösterilecek)
  - `#sepet-listesi` boş bırakıldı — sepet öğeleri JS tarafından oluşturulacak
- **CSS güncellemeleri:**
  - `:root` içinde koyu/mor tema renk değişkenleri tanımlandı
  - `.urunler` grid'i `repeat(auto-fill, minmax(300px, 1fr))` yapıldı → resize'da sütun sayısı otomatik ayarlanıyor
  - `main` artık grid (`2fr 1.2fr`), `.sepetim` `position: sticky`
  - İki breakpoint: **950px** (main tek sütun, sepet sticky→static) ve **680px** (urunler tek sütun, urun-alt dikey dizilim)
  - Sepet ürün satırları (`.sepet-urunu`, `.sil-btn`, `.adet-btn` vb.) için stiller eklendi — JS'in 3. adımda kullanacağı sınıflar

### 2c. Adım — Görsel Cila (Polish) Güncellemesi (tamamlandı)
- Kullanıcı "görünüm olarak daha güzel bir yapı" istedi, referans dosyaya yakın "pill ve ferah" stil seçildi.
- `style.css` üzerinde yapılan değişiklikler:
  - Kartlar (`urun-karti`, `.sepetim`, `.sepet-urunu` vb.) köşe yuvarlaklığı artırıldı (16px → 18-24px)
  - Butonlar (Sepete Ekle, Sepeti Temizle, Sil, adet input) pill (hap) şekline getirildi (border-radius 24px / 16px)
  - Genel boşluklar/padding artırıldı (kart 15px→20px, sepet 20px→24px, gap'ler 20px→24px)
  - Başlık (`h1`) büyütüldü (2.5rem→2.8rem), fiyat yazısı büyütüldü ve kalınlaştırıldı (1.2rem→1.5rem, 800)
  - Ürün görseline arka plan rengi + köşe yuvarlama eklendi (çerçeve görünümü)
  - Hover efektleri: kartlarda `translateY(-4px)`, butonlarda `scale(0.96-0.98)`, adet butonlarında `scale(1.08)`
  - "Toplam Ürün" bilgisi pill rozet haline getirildi; sayı değişince "zıplama" animasyonu için `.pop` sınıfı ve `@keyframes sayac-pop` eklendi (JS adımında tetiklenecek)
  - Sepetteki adet artır/azalt kontrolleri (`.sepet-adet-kontrol`) pill kutu içinde yuvarlak butonlar olacak şekilde stillendirildi

### Küçük Düzenleme — Toplam Fiyat Satırı (tamamlandı)
- "Toplam Fiyat:" etiketi sola, fiyat değeri sağa hizalanacak şekilde güncellendi.
- `index.html`: `<p>` içine iki `<span>` eklendi (`toplam-satir` sınıfı ile).
- `style.css`: `.toplam-kutu p` kaldırıldı, yerine `.toplam-satir { display: flex; justify-content: space-between; ... }` eklendi.

### Renk Paleti Değişikliği (tamamlandı)
- Kullanıcı mevcut mor temayı beğenmedi, 4 alternatif palet önerildi (geçici `renk-onizleme.html` ile karşılaştırıldı, sonra silindi).
- Seçilen palet: **Koyu Lacivert + Turkuaz**.
- `style.css` → `:root` bloğundaki tüm renk değişkenleri bu palete göre güncellendi (CSS değişkenleri sayesinde tek yerden değişti, başka hiçbir kural değişmedi).

**Yeni fikir — Tema Değiştirici (planlanıyor):** Sağ üst köşeye 3 renk butonu eklenip, tıklanan butona göre sayfanın tüm renk paletinin değişmesi isteniyor. Detaylar netleştirilecek.

### Tema Değiştirici (tamamlandı)
- Kullanıcı, önceden önerilen 4 paletin (Mavi, Yeşil, Turuncu, Açık) hepsinin sağ üst köşede birer buton olarak yer almasını istedi.
- **CSS (`style.css`):**
  - `:root` bloğunun altına `body.tema-yesil`, `body.tema-turuncu`, `body.tema-acik` sınıfları eklendi — her biri `:root`'taki 19 renk değişkenini kendi paletine göre yeniden tanımlıyor. `:root` (Mavi) varsayılan tema olarak kalıyor.
  - `.tema-secici` (sağ üstte sabit/fixed konumlu kapsayıcı) ve `.tema-btn` (30px'lik daire butonlar, her biri kendi temasının renklerinden gradyan) eklendi. `.tema-btn.aktif` sınıfı, o an seçili temanın butonunu beyaz çerçeveyle vurguluyor.
- **HTML (`index.html`):**
  - `<body>` açıldıktan hemen sonra `.tema-secici` içinde 4 buton eklendi: `tema-btn-mavi`, `tema-btn-yesil`, `tema-btn-turuncu`, `tema-btn-acik`. Her birinde `data-tema` attribute'u var, JS bunu okuyor.
- **JS (`script.js`):**
  - İlk kod burada yazıldı. `temaUygula(tema)` fonksiyonu: eski tema sınıfını `body`'den kaldırır, yenisini ekler (mavi için sınıf eklenmez çünkü `:root` zaten mavi), aktif butonu işaretler ve seçimi `localStorage` içine `secilenTema` anahtarıyla kaydeder.
  - Butonlara `click` olayı eklendi.
  - Sayfa açılışında `localStorage`'dan kayıtlı tema okunup uygulanıyor (yoksa "mavi" varsayılan).

### Küçük Düzenleme — Kart/Sepet Gölgesi (tamamlandı)
- `.urun-karti` ve `.sepetim` kutularına `box-shadow: 0 8px 20px rgba(0,0,0,0.2/0.3)` eklendi — kartlar arka plandan hafifçe kabartılmış görünüyor.

### Varsayılan Tema Değişikliği — Açık (tamamlandı)
- Kullanıcı, sayfanın varsayılan (ilk açılış) temasının **Açık** olmasını istedi; "kapsamlı" yöntem seçildi — yani Açık, gerçek CSS varsayılanı (`:root`) oldu, eski varsayılan Mavi ise artık bir `body.tema-mavi` sınıfı.
- **`style.css`:**
  - `:root` bloğunun içeriği eski Açık renkleriyle değiştirildi (artık `:root` = Açık tema).
  - Eski `body.tema-acik` bloğu silindi; yerine eski `:root` (Mavi) renklerini içeren `body.tema-mavi` bloğu eklendi.
  - "ALTERNATİF TEMALAR" yorumu güncellendi: ":root, varsayılan 'Açık' temadır."
  - `.tema-btn-mavi` / `.tema-btn-acik` buton renkleri (gradyanlar) değişmedi — bunlar her temanın "kimlik rengini" gösteriyor, hangisinin `:root` olduğuyla ilgisi yok.
- **`script.js`:**
  - `temaSiniflari` listesinde `"tema-acik"` → `"tema-mavi"` olarak değiştirildi.
  - `if (tema !== "mavi")` → `if (tema !== "acik")` yapıldı (artık ekstra class gerektirmeyen tema "acik").
  - Varsayılan fallback `|| "mavi"` → `|| "acik"` yapıldı.
  - Önceden `localStorage`'a `"mavi"` kaydetmiş kullanıcılar için de sorun yok: `temaUygula("mavi")` artık `body`'ye `tema-mavi` class'ı ekleyip eski Mavi görünümü doğru şekilde uyguluyor.

**Sıradaki adım:** JS ile sepete ekleme, adet artırma/azaltma, ürün silme, toplam hesaplama, bildirim mesajları (escapeHTML ile güvenli) ve sepeti temizleme mantığını yazmak. Ayrıca sepet içeriği de localStorage'da kalıcı hale gelecek.

## 2026-06-15

### Sepet Mantığı (tamamlandı)
- `script.js`'e tema kodunun altına yeni bir bölüm eklendi: "SEPET (CART) MANTIĞI".
- **Veri yapısı:** `sepet` adında bir dizi — her öğe `{ isim, fiyat, adet }` şeklinde bir obje.
- **`escapeHTML(metin)`:** Bir metni gizli bir `<div>`'in `textContent`'ine yazıp `innerHTML`'ini okuyarak HTML'e güvenli hale getirir (`<`, `>`, `&` gibi karakterler kod olarak çalışmaz, düz yazı olur).
- **`bildirimGoster(mesaj)`:** Üstteki bildirim kutusuna mesaj yazar, `.goster` sınıfını ekler, 3 saniye sonra `setTimeout` ile otomatik kapatır (üst üste tıklamalarda `clearTimeout` ile zamanlayıcı sıfırlanır).
- **`sepetiGuncelle()`:** `sepet` dizisine bakarak `#sepet-listesi`'ni baştan oluşturur (her ürün için `.sepet-urunu` `<li>`'si — ad, birim fiyat x adet, ara toplam, Sil butonu, +/- adet kontrolleri), `#toplam-adet` ve `#toplam-fiyat`'ı günceller, sepet boşsa `#sepet-bos-mesaji`'nı gösterir/gizler. Toplam adet değişince `.pop` sınıfıyla "zıplama" animasyonu tetiklenir (`offsetWidth` ile reflow zorlanarak animasyon her seferinde yeniden başlatılır).
- **"Sepete Ekle" butonları:** Tıklanınca `data-isim`/`data-fiyat` ve yanındaki adet `input`'u okur, ürün sepette varsa adedini artırır, yoksa yeni ekler, `sepetiGuncelle()` çağırır, bildirim gösterir ("X adet Y sepete eklendi."), adet kutusunu 1'e sıfırlar.
- **Sepet listesi (+/-/Sil):** Bu butonlar sonradan oluştuğu için `#sepet-listesi` üzerinde tek bir "event delegation" dinleyicisi var — `e.target.closest("button")` ile hangi butona tıklandığı bulunuyor. `+` adedi artırır, `-` adedi azaltır (0 olunca ürünü sepetten çıkarır), Sil ürünü tamamen kaldırır.
- **"Sepeti Temizle":** `sepet` dizisini boşaltır, günceller, bildirim gösterir.
- Tarayıcıda açılıp test edildi.

### Küçük Düzenlemeler — Sepet Satırı ve Bildirim (tamamlandı)
- Sepet ürünü satırında ara toplam fiyatı (`.sepet-urunu-arasum`), adet +/- kontrollerinin (`.sepet-adet-kontrol`) bulunduğu satıra, en sağa alındı (`index.html`'de yeni `.sepet-urunu-alt` flex sarmalayıcı, `style.css`'de ilgili stil).
- Bildirim kutusunun otomatik kapanma süresi 3 saniyeden 20 saniyeye çıkarıldı (`script.js`, `bildirimGoster` içindeki `setTimeout` değeri 3000 → 20000).
- Sepet ürünü fiyat satırındaki "x {adet}" bilgisi kaldırıldı, artık sadece birim fiyat gösteriliyor (`script.js`, `sepetiGuncelle` şablonu).

### "Toplam Ürün" Satırının Taşınması (tamamlandı)
- "Toplam Ürün: X" bilgisi, "Sepetim" başlığının altından `.toplam-kutu` içine, "Toplam Fiyat" satırının hemen üstüne taşındı.
- Eski pill-rozet stili (`.sepet-bilgi`) kaldırıldı; yeni satır `.toplam-satir` ile aynı düzeni (etiket solda, değer sağda) kullanıyor ama `.toplam-satir-adet` ile daha küçük/sade gösteriliyor.
- Sayaç "zıplama" animasyonu artık `#toplam-adet.pop` üzerinden çalışıyor (`@keyframes sayac-pop` aynı kaldı).

### Bildirim Kutusunun Yeniden Tasarımı (tamamlandı)
- Bildirim kutusu `<header>` içinden çıkarılıp sayfanın en üstüne (menü konumuna) taşındı.
- `position: fixed; top: 0; left: 0; width: 100%;` ile sayfa akışından çıkarıldı — göründüğünde artık içeriği aşağı itmiyor, üstüne biniyor.
- `z-index` değeri tema seçici butonlarından (100) yüksek (200) yapıldı, böylece bildirim göründüğünde tema butonlarının önünde duruyor.
- Arka plan rengi, temanın vurgu rengiyle (`--bildirim-kenar`) dolgun hale getirildi (beyaz yazı), kullanılmayan `--bildirim-arka` değişkenleri 4 temadan da kaldırıldı.
- Bildirim metninin başındaki ikon (`fa-circle-info`) kaldırıldı, artık sadece metin gösteriliyor.
- `.sayfa` kapsayıcısına `margin-top: 40px` eklendi — tema butonları (fixed) yerinde kalırken, sayfanın diğer içeriği (başlık, ürünler, sepet) biraz aşağı kaydı, böylece üstte bildirim için boşluk oluştu.

### "Toplam Ürün" Zıplama Animasyonunun Kaldırılması (tamamlandı)
- `script.js`'de `sepetiGuncelle()` içindeki `.pop` sınıfı ekleme/kaldırma ve `offsetWidth` zorlama satırları kaldırıldı; `#toplam-adet` artık animasyonsuz, anında güncelleniyor.
- `style.css`'den artık kullanılmayan `@keyframes sayac-pop` ve `#toplam-adet.pop` kuralı silindi.

### localStorage ile Sepet Kalıcılığı (tamamlandı)
- `let sepet = [];` → `let sepet = JSON.parse(localStorage.getItem("sepet")) || [];` yapıldı: sayfa açılışında kayıtlı sepet varsa onunla başlıyor, yoksa boş dizi.
- Yeni `sepetiKaydet()` fonksiyonu eklendi: `localStorage.setItem("sepet", JSON.stringify(sepet))`. Bu fonksiyon `sepetiGuncelle()`'nin sonunda çağrılıyor, yani her ekleme/silme/+/-/temizleme sonrası sepet otomatik kaydediliyor.
- Dosyanın sonuna `sepetiGuncelle();` çağrısı eklendi — sayfa ilk açıldığında kayıtlı sepet ekrana basılıyor.
- Tema seçimiyle aynı `localStorage` + `JSON` mantığı kullanıldı. Tarayıcıda test edildi: sepete ürün eklenip sayfa yenilendiğinde sepet aynen kalıyor, "Sepeti Temizle" sonrası da boş kalıyor.

### Küçük Düzenleme — Adet Kontrolü Font Boyutu (tamamlandı)
- `.sepet-adet` (adet sayısı) için `font-size: 1.1rem;` eklendi.
- `.adet-btn` (+/- butonları) için `font-size: 1rem;` olarak netleştirildi (tekrarlanan `font-size` satırı temizlendi).

---

**Proje durumu:** Planlanan tüm adımlar (HTML, CSS, tema değiştirici, sepet mantığı, localStorage kalıcılığı) tamamlandı. Kullanıcı bu oturumu burada sonlandırdı.
