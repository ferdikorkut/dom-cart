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

**Sıradaki adım:** JS ile sepete ekleme, adet artırma/azaltma, ürün silme, toplam hesaplama, bildirim mesajları (escapeHTML ile güvenli) ve sepeti temizleme mantığını yazmak. Ayrıca sepet içeriği de localStorage'da kalıcı hale gelecek.
