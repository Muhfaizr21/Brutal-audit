# Panduan Kontribusi brutal-audit

Terima kasih atas minat Anda untuk berkontribusi pada **brutal-audit**! Proyek ini bertujuan untuk menciptakan standar audit keamanan kode AI yang paling tajam, konkret, dan tanpa kompromi.

---

## 🛠️ Area Kontribusi

Anda dapat berkontribusi dalam hal:
1. **Penyempurnaan Heuristik Audit**: Menambahkan skenario celah keamanan baru (misalnya SSRF, prototype pollution, race condition).
2. **Platform & Agent Integrasi**: Memperluas kompatibilitas untuk agent atau IDE baru.
3. **Contoh Kasus Nyata (Test Cases)**: Menambahkan contoh kode rentan dan perbaikannya di folder `examples/`.
4. **Dokumentasi & Lokalisasi**: Menerjemahkan panduan ke berbagai bahasa.

---

## 📋 Aturan Kontribusi

Setiap aturan atau perubahan baru wajib memenuhi:
- **Konkret**: Tidak menerima saran berbasis opini atau normatif.
- **Dukungan Baris & Kode**: Wajib menyertakan contoh kode perbaikan copy-paste.
- **Standar Severity**: Mematuhi 4 level severity (CRITICAL, HIGH, MEDIUM, LOW).

---

## 🚀 Alur Kerja Pull Request

1. Fork repositori ini.
2. Buat branch baru: `git checkout -b feat/nama-fitur`.
3. Lakukan commit perubahan Anda: `git commit -m "feat: tambahkan deteksi XSS DOM"`.
4. Push ke branch Anda: `git push origin feat/nama-fitur`.
5. Buka Pull Request di GitHub.
