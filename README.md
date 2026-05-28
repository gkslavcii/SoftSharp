# Soft#  (SoftSharp)

Özel yazılım çözümleri için kişisel tanıtım/portfolyo sitesi. Tek sayfa (one-page), statik HTML/CSS/JavaScript.

> **Marka yazımı:** Görsel/markalama yerlerinde `Soft#`, URL ve dosya adlarında `SoftSharp`.

## Dosya Yapısı

```
SoftSharp/
├── index.html              # Tek sayfa, tüm bölümler
├── README.md
├── Plan.docx               # Proje planı (kaynak)
├── CNAME                   # (domain bağlandığında eklenecek)
└── assets/
    ├── css/
    │   ├── style.css       # Ana stil
    │   └── responsive.css  # Mobile/tablet düzenlemeleri
    ├── js/
    │   └── main.js         # Etkileşim (menu, modal, scroll-spy)
    └── images/
        └── favicon/
            └── favicon.svg
```

## Yerel Geliştirme

Tarayıcıda `index.html`'i çift tıklayarak açabilirsiniz. Yine de bazı tarayıcı davranışları (font, fetch, vs.) için yerel sunucu önerilir:

**Python (yüklüyse):**
```bash
python -m http.server 5173
```

**Node.js (yüklüyse):**
```bash
npx serve
```

Sonra: <http://localhost:5173>

## GitHub Pages'te Yayınlama

1. GitHub'da yeni public repo oluşturun (örn. `softsharp-website`).
2. Bu klasördeki tüm dosyaları repoya pushlayın:
   ```bash
   git init
   git add .
   git commit -m "İlk yayın: SoftSharp"
   git branch -M main
   git remote add origin https://github.com/<KULLANICI>/softsharp-website.git
   git push -u origin main
   ```
3. Repo → **Settings** → **Pages**
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
4. Birkaç dakika içinde site `https://<KULLANICI>.github.io/softsharp-website/` adresinde yayında olur.

## Özel Domain Bağlama (sonra)

1. Domain alındıktan sonra (örn. `softsharp.com`) repo köküne `CNAME` dosyası oluşturup içine sadece domaini yazın:
   ```
   softsharp.com
   ```
2. Domain sağlayıcınızda DNS ayarlarına şu A kayıtlarını ekleyin:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   ve www için CNAME: `<KULLANICI>.github.io`
3. Settings → Pages → **Enforce HTTPS** seçin.

## Yapılacaklar (Tamamlanmamış İçerikler)

Aşağıdaki yerler `TODO` yorumlarıyla işaretli, sırası geldiğinde değiştirin:

- [ ] `index.html` → iletişim bağlantıları (telefon, WhatsApp, Instagram, e-posta) navbar'da TODO yorumlu
- [ ] `index.html` → Open Graph URL & görseli (domain alındıktan sonra)
- [ ] `assets/images/favicon/apple-touch-icon.png` → 180×180 PNG eklendiğinde `index.html`'deki ilgili satırı yorumdan çıkarın

## Lisans

Tüm hakları saklıdır — Soft# © 2026.
