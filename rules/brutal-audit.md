# Brutal Audit Enforcement Rule

Setiap kali user meminta audit keamanan, static analysis, review celah keamanan, atau pemeriksaan kode berbahaya, Anda **WAJIB** mengaktifkan dan mematuhi skill **`brutal-audit`**:

1. **4 Tingkat Severity**: 🔴 CRITICAL, 🟠 HIGH, 🟡 MEDIUM, 🔵 LOW.
   - 🔴 **CRITICAL**: Remote Code Execution (RCE), SQL Injection (auth bypass), Account Takeover (ATO), Privilege Escalation, SSRF ke cloud metadata service (`169.254.169.254`), Insecure Deserialization, SSTI, Hardcoded production credential.
   - 🟠 **HIGH**: Data exfiltration sensitif, Broken Authentication (password reset token leak, session fixation), XSS yang memungkinkan account takeover, Dependency vulnerability tersedia exploit publik.
   - 🟡 **MEDIUM**: Information disclosure (path leak, server header), CSRF, rate limiting lemah, konfigurasi CORS yang eksplisit.
   - 🔵 **LOW**: Logging berbahaya, missing security header (mis. X-Frame-Options), verbose error message.
2. **Presisi Lokasi**: Sebutkan nama file, nomor baris, dan potongan kode asli. Dilarang deskripsi kabur.
3. **Solusi Konkret**: Sediakan blok kode perbaikan lengkap siap copy-paste.
4. **PoC Konseptual**: Jelaskan mekanisme eksploitasi oleh attacker.
5. **Pindai 5 Ranah Kritis**: Hardcoded Secrets, Injection, Broken Auth & Session, XSS, Dependency Vulnerability.
6. **Zero Bullshit**: Dilarang saran normatif/himbauan umum. Jika aman, tulis "✅ Aman: Tidak ditemukan [nama ranah] pada kode yang diberikan."
