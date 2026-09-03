<p align="center">
  <h1 align="center">🔒 brutal-audit</h1>
  <p align="center">
    <strong>Security Auditor yang Brutal, Kejam, dan 100% Konkret untuk AI Coding Agents</strong>
  </p>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://www.npmjs.com/package/brutal-audit"><img src="https://img.shields.io/npm/v/brutal-audit.svg" alt="NPM Version"></a>
  <a href="https://skills.sh"><img src="https://img.shields.io/badge/skills.sh-standard%20skill-success" alt="skills.sh"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
</p>

---

## 📖 Apa Itu brutal-audit?

**brutal-audit** adalah sebuah paket **Standard Agent Skill** dan sistem audit keamanan yang mengubah AI coding assistant Anda (Claude Code, Antigravity, Cursor, Codex, OpenCode) menjadi **Principal Security Auditor yang kejam, tanpa basa-basi, dan 100% konkret**.

Ketika AI biasa cenderung memberi nasihat normatif yang basi (*"sebaiknya sanitasi input"*, *"pastikan library selalu di-update"*), **brutal-audit** memaksa AI melakukan **Data Flow & Taint Analysis** serta **Threat Modeling** dengan standar industri yang ketat.

> **Baru pertama kali menggunakan? Baca [Panduan Lengkap (guide.md)](guide.md)** untuk petunjuk instalasi dari nol.

---

## 🔥 Kenapa "Brutal"?

Karena sistem ini:
- ❌ **TIDAK** menoleransi alasan atau asumsi developer.
- ❌ **TIDAK** memberikan saran umum tanpa kode perbaikan konkret.
- ❌ **TIDAK** membiarkan kerentanan dijelaskan secara samar (*"di bagian login"*).
- ✅ **HANYA** menerima temuan konkret: **Nama File + Nomor Baris + Potongan Kode Asli**.
- ✅ **WAJIB** menyertakan **Proof of Concept (PoC) konseptual** yang menjelaskan bagaimana hacker membobolnya.
- ✅ **WAJIB** menyertakan **blok kode perbaikan yang siap di-copy-paste**.

---

## ⚙️ 6 Aturan Besi (Iron Rules: R-01 s/d R-06)

| Aturan | Nama Aturan | Keterangan Mutlak |
| :---: | :--- | :--- |
| **R-01** | **4 Level Severity** | WAJIB menggunakan 🔴 CRITICAL, 🟠 HIGH, 🟡 MEDIUM, 🔵 LOW. |
| **R-02** | **Presisi Lokasi** | WAJIB menyebutkan File + Baris + Kode Asli yang bermasalah. |
| **R-03** | **Solusi Konkret** | WAJIB menyertakan blok kode perbaikan siap copy-paste (bukan pseudo-code). |
| **R-04** | **PoC Konseptual** | WAJIB menjelaskan skenario exploit nyata dari sudut pandang attacker. |
| **R-05** | **5 Ranah Kritis** | WAJIB memindai minimal: Secrets, Injection, Broken Auth, XSS, Dependencies. |
| **R-06** | **Zero Bullshit** | DILARANG memberi nasihat umum. Jika aman, wajib tulis: *"✅ Aman: Tidak ditemukan [ranah]"*. |

---

## 🚀 5 Cara Instalasi

Pilih salah satu cara di bawah ini:

### 1. Interactive CLI Picker (Sangat Direkomendasikan)
Cukup jalankan satu perintah ini di terminal. CLI akan mendeteksi lingkungan Anda, meminta Anda memilih AI Agent (Claude Code, Antigravity, Cursor, Codex), dan secara otomatis menuliskan pointer rules:

```bash
npx brutal-audit
```

### 2. Melalui Direktori Resmi skills.sh
`brutal-audit` mematuhi spesifikasi standar Agent Skills:

```bash
npx skills add Muhfaizr21/brutal-audit
```
> *Gunakan flag `-g` untuk instalasi global atau `--all` untuk menyalin seluruh dependensi.*

### 3. Plugin Claude Code
Tambahkan ke marketplace Claude Code dan pasang:

```text
/plugin marketplace add https://github.com/Muhfaizr21/Brutal-audit
/plugin install brutal-audit@Brutal-audit
```

### 4. Plugin Google Antigravity
Pasang langsung menggunakan CLI Antigravity:

```bash
agy plugin install https://github.com/Muhfaizr21/Brutal-audit
```

### 5. Pengguna Cursor IDE
Salin file `.cursor/rules/brutal-audit.mdc` ke dalam folder `.cursor/rules/` di root proyek Anda, atau gunakan opsi **Cursor (3)** pada CLI `npx brutal-audit`.

---

## 💻 Cara Penggunaan

Setelah terpasang, cukup panggil di prompt AI Anda:

```text
Gunakan skill brutal-audit untuk memeriksa kode berikut:
[tempel kode Anda di sini]
```

Atau audit file tertentu:

```text
Audit file routes/auth.js dan controllers/user.js secara brutal. Cari celah sampai level CRITICAL!
```

---

## 📝 Format Output Nyata (Gold Standard)

```markdown
### 📊 Ringkasan Audit
| Severity | Jumlah Temuan | Komponen / Fitur Terdampak |
| :--- | :---: | :--- |
| 🔴 CRITICAL | 1 | Autentikasi Pengguna & Database (`routes/login.js`) |
| 🟠 HIGH | 1 | Token Generator (`routes/login.js`) |
| 🟡 MEDIUM | 1 | Rate Limiting Login (`routes/login.js`) |
| 🔵 LOW | 0 | - |

---

### 🔴 [CRITICAL] SQL Injection (Authentication Bypass)
- **Lokasi**: `routes/login.js` | **Baris**: 8
- **Kode Berbahaya**:
```javascript
const sql = "SELECT id, email, role FROM users WHERE email = '" + email + "' AND password = '" + password + "'";
```
- **Eksploitasi (PoC)**: Attacker mengirimkan payload `' OR '1'='1` pada field `email`. Query SQL berubah menjadi:
```sql
SELECT id, email, role FROM users WHERE email = '' OR '1'='1' AND password = ''
```
Kondisi `'1'='1'` selalu bernilai benar (TRUE), membypass verifikasi password dan mengembalikan data administrator secara instan.
- **Solusi KONKRET**:
```javascript
const sql = 'SELECT id, email, role FROM users WHERE email = $1 AND password = $2';
const user = await db.query(sql, [email, password]);
```
- **Referensi**: OWASP Top 10:2021-A03 (Injection), CWE-89.

---

### 🛡️ Status 5 Ranah Kritis
- **Hardcoded Secrets**: Terdeteksi 1 celah (🟠 HIGH: Token statis hardcoded di baris 11).
- **Injection**: Terdeteksi 1 celah (🔴 CRITICAL: SQL Injection di baris 8).
- **Broken Authentication & Session**: Terdeteksi 1 celah (🟡 MEDIUM: Tidak ada Rate Limiting di baris 6).
- **Cross-Site Scripting (XSS)**: ✅ Aman: Tidak ditemukan XSS pada kode yang diberikan.
- **Dependency Vulnerability**: ✅ Aman: Tidak ditemukan Dependency Vulnerability pada kode yang diberikan.

---

### ✅ Status Akhir
Sistem ini **TIDAK AMAN** untuk diproduksi.
```

---

## 📂 Struktur Repositori

```
brutal-audit/
├── README.md                    # Dokumentasi utama
├── guide.md                     # Panduan instalasi dari nol
├── SKILL.md                     # Definisi skill utama
├── plugin.json                  # Manifest plugin Antigravity
├── package.json                 # NPM packaging & bin runner
├── bin/
│   └── cli.js                   # Interactive CLI installer (zero-dependency)
├── skills/
│   └── brutal-audit/
│       └── SKILL.md             # Folder skill standar agent
├── rules/
│   └── brutal-audit.md          # Pointer rule enforcement
├── .claude-plugin/
│   └── plugin.json              # Manifest Claude Code plugin
├── .codex-plugin/
│   └── plugin.json              # Manifest Codex plugin
└── .cursor/
    └── rules/
        └── brutal-audit.mdc     # Rule Cursor IDE
```

---

## 🤝 Kontribusi

Kontribusi selalu terbuka! Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk pedoman kontribusi.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE).