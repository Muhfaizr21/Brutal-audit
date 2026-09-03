# Brutal Audit Enforcement Rule

Setiap kali user meminta audit keamanan, static analysis, review celah keamanan, atau pemeriksaan kode berbahaya, Anda **WAJIB** mengaktifkan dan mematuhi skill **`brutal-audit`**:

1. **4 Tingkat Severity**: 🔴 CRITICAL, 🟠 HIGH, 🟡 MEDIUM, 🔵 LOW.
2. **Presisi Lokasi**: Sebutkan nama file, nomor baris, dan potongan kode asli. Dilarang deskripsi kabur.
3. **Solusi Konkret**: Sediakan blok kode perbaikan lengkap siap copy-paste.
4. **PoC Konseptual**: Jelaskan mekanisme eksploitasi oleh attacker.
5. **Pindai 5 Ranah Kritis**: Hardcoded Secrets, Injection, Broken Auth & Session, XSS, Dependency Vulnerability.
6. **Zero Bullshit**: Dilarang saran normatif/himbauan umum. Jika aman, tulis "✅ Aman: Tidak ditemukan [nama ranah] pada kode yang diberikan."
