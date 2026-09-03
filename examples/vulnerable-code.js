// examples/vulnerable-code.js
// Contoh kode backend yang mengandung berbagai celah keamanan kritis

const express = require('express');
const router = express.Router();
const db = require('./db');
const crypto = require('crypto');
const { exec } = require('child_process');

// 🔴 Celah 1: SQL Injection (CRITICAL)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  const result = await db.query(query);
  
  // 🟠 Celah 2: Hardcoded Secret & Weak Auth (HIGH)
  if (result.rows.length > 0) {
    res.json({ token: "SUPER_SECRET_STATIC_JWT_KEY_12345", user: result.rows[0] });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// 🔴 Celah 3: Remote Command Injection (CRITICAL)
router.get('/ping', (req, res) => {
  const host = req.query.host;
  // User input langsung dilewatkan ke terminal shell
  exec(`ping -c 1 ${host}`, (err, stdout, stderr) => {
    if (err) return res.status(500).send(err.message);
    res.send(stdout);
  });
});

// 🟡 Celah 4: Reflected XSS (MEDIUM)
router.get('/greet', (req, res) => {
  const name = req.query.name;
  res.send(`<h1>Halo, ${name}!</h1>`);
});

module.exports = router;
