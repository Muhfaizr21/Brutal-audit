# 📖 Panduan Lengkap brutal-audit

> **Panduan instalasi dan penggunaan brutal-audit dari nol untuk semua AI Coding Agents.**

---

## 🎯 Apa Itu brutal-audit?

**brutal-audit** adalah paket **Agent Skill standar** dan **Rule Enforcer** yang mengubah AI coding assistant Anda (Claude Code, Antigravity, Cursor, Codex, OpenCode) menjadi **Principal Security Auditor** yang kejam, tanpa kompromi, dan 100% konkret.

Ketika AI biasa cenderung memberikan saran normatif yang basi (*"sebaiknya sanitasi input"*, *"pastikan library selalu update"*), **brutal-audit** memaksa AI untuk:
1. Menyebutkan nomor baris dan potongan kode asli yang berbahaya.
2. Membuktikan bagaimana celah tersebut dapat dieksploitasi (PoC konseptual).
3. Memberikan kode pengganti yang langsung bisa di-copy-paste.
4. Menolak memberikan saran umum yang tidak ada gunanya.

---

## 🚀 5 Cara Instalasi

Pilih salah satu cara di bawah ini yang paling cocok dengan alur kerja Anda:

### Jalur 1: Interactive Picker via NPX (Sangat Direkomendasikan)
Cara tercepat dan paling lengkap. Satu perintah untuk memilih target agent dan menulis konfigurasi otomatis:

```bash
npx brutal-audit
```

CLI interaktif akan menanyakan:
- Pilihan Agent (Claude Code, Antigravity, Cursor, Codex, atau Semua).
- Lingkup (Global di seluruh komputer atau hanya Project saat ini).
- Secara otomatis menyalin file skill dan menambahkan pointer agar agent selalu memuat aturan brutal-audit.

---

### Jalur 2: Melalui Direktori Resmi skills.sh
`brutal-audit` terdaftar sebagai standar folder agent skills:

```bash
npx skills add Muhfaizr21/brutal-audit
```

Gunakan opsi:
- `-g` untuk instalasi global
- `--all` untuk menginstall seluruh paket

---

### Jalur 3: Plugin Claude Code
Jika Anda pengguna Claude Code CLI:

```text
/plugin marketplace add https://github.com/Muhfaizr21/Brutal-audit
/plugin install brutal-audit@Brutal-audit
```

---

### Jalur 4: Plugin Google Antigravity
Repositori ini dilengkapi dengan manifest `plugin.json` standar Antigravity:

```bash
agy plugin install https://github.com/Muhfaizr21/Brutal-audit
```

Atau salin folder `skills/brutal-audit` ke:
- Global: `~/.gemini/config/skills/brutal-audit/`
- Workspace: `.agents/skills/brutal-audit/`

---

### Jalur 5: Pengguna Cursor IDE
1. Jalankan `npx brutal-audit` dan pilih opsi **Cursor (3)**, atau
2. Salin file `.cursor/rules/brutal-audit.mdc` ke folder `.cursor/rules/` di root proyek Anda.
3. Di dalam chat Cursor, Anda bisa langsung mention `@brutal-audit` saat meminta review kode.

---

## 💡 Cara Menggunakan brutal-audit

Setelah terpasang, panggil AI Anda dengan kalimat lugas:

```text
Gunakan skill brutal-audit untuk memeriksa file routes/auth.js dan middleware/jwt.js
```
atau
```text
Lakukan audit keamanan brutal pada kode backend berikut:
[paste kode Anda di sini]
```

### Membaca Hasil Laporan

Setiap laporan yang keluar akan terstruktur menjadi 4 bagian:
1. **📊 Ringkasan Audit**: Tabel severity berisi jumlah temuan per level.
2. **Detail Kerentanan**:
   - **Lokasi**: File + Nomor Baris + Potongan Kode Asli.
   - **Eksploitasi (PoC)**: Skenario bagaimana penyerang membobol kode tersebut.
   - **Solusi KONKRET**: Blok kode siap copy-paste.
   - **Referensi**: Standar OWASP/CVE/CWE terkait.
3. **🛡️ Status 5 Ranah Kritis**: Status kelulusan untuk Secrets, Injection, Broken Auth, XSS, dan Dependencies.
4. **✅ Status Akhir**: Keputusan mutlak apakah sistem Anda **AMAN** atau **TIDAK AMAN** untuk dirilis ke produksi.
