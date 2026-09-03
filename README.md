<p align="center">
  <h1 align="center">🔒 brutal-audit</h1>
  <p align="center">
    <strong>Ruthless, Uncompromising, and 100% Concrete Security Auditor for AI Coding Agents</strong>
  </p>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://www.npmjs.com/package/brutal-audit"><img src="https://img.shields.io/npm/v/brutal-audit.svg" alt="NPM Version"></a>
  <a href="https://skills.sh"><img src="https://img.shields.io/badge/skills.sh-standard%20skill-success" alt="skills.sh"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
</p>

---

## 📖 What is brutal-audit?

**brutal-audit** is a **Standard Agent Skill** and security audit enforcement system that turns your AI coding assistant (Claude Code, Google Antigravity, Cursor, OpenAI Codex, OpenCode) into a **Principal Security Auditor that is ruthless, cuts through the noise, and delivers 100% concrete results**.

Standard AI models often generate vague, generic recommendations (*"sanitize your inputs"*, *"make sure to keep libraries updated"*). **brutal-audit** forces AI agents to execute deep **Data Flow & Taint Analysis** and **Threat Modeling** adhering to strict industry standards.

> **First time here? Check out the [Installation & Getting Started Guide (guide.md)](guide.md)**.

---

## 🔥 Why "Brutal"?

Because this skill:
- ❌ **NEVER** tolerates developer assumptions, excuses, or vague justifications.
- ❌ **NEVER** outputs generic advice without a copy-pasteable remediation snippet.
- ❌ **NEVER** describes vulnerabilities ambiguously (*e.g., "in the login logic"*).
- ✅ **ONLY** accepts pinpoint precision: **File Name + Line Number + Original Vulnerable Code**.
- ✅ **MANDATES** a **conceptual Proof of Concept (PoC)** breaking down how an attacker exploits the flaw.
- ✅ **MANDATES** a **drop-in, copy-paste ready code solution**.

---

## ⚙️ 6 Iron Rules (R-01 to R-06)

| Rule | Name | Strict Requirement |
| :---: | :--- | :--- |
| **R-01** | **4-Tier Severity** | MUST categorize using 🔴 CRITICAL, 🟠 HIGH, 🟡 MEDIUM, 🔵 LOW. |
| **R-02** | **Pinpoint Location** | MUST state File + Line Number + Exact Problematic Code Snippet. |
| **R-03** | **Concrete Solution** | MUST provide complete, copy-pasteable replacement code (no pseudo-code). |
| **R-04** | **Conceptual PoC** | MUST explain the real-world exploitation mechanic from an attacker's perspective. |
| **R-05** | **5 Critical Domains** | MUST deeply scan: Secrets, Injection, Broken Auth/Session, XSS, Dependencies. |
| **R-06** | **Zero Bullshit** | FORBIDDEN from giving generic advice. If clean, output: *"✅ Safe: No [domain] found"*. |

---

## 🚀 5 Installation Methods

Choose the path that best fits your developer workflow:

### 1. Interactive CLI Picker (Recommended)
Run a single command in your terminal. The zero-dependency CLI detects your environment, prompts you to select target AI agents (Claude Code, Antigravity, Cursor, Codex), and automatically configures skill directories and rule pointers:

```bash
npx brutal-audit
```

### 2. Official skills.sh Directory
`brutal-audit` complies with the standard Agent Skills specification:

```bash
npx skills add Muhfaizr21/brutal-audit
```
> *Use the `-g` flag for global installation across all projects.*

### 3. Claude Code Plugin
Add to Claude Code marketplace and install:

```text
/plugin marketplace add https://github.com/Muhfaizr21/Brutal-audit
/plugin install brutal-audit@Brutal-audit
```

### 4. Google Antigravity Plugin
Install directly via the Antigravity CLI:

```bash
agy plugin install https://github.com/Muhfaizr21/Brutal-audit
```

### 5. Cursor IDE
Copy `.cursor/rules/brutal-audit.mdc` into `.cursor/rules/` inside your project root, or select **Cursor (3)** when running `npx brutal-audit`.

---

## 💻 How to Use

Once installed, invoke your AI agent using direct commands:

```text
Use brutal-audit skill to audit the following code:
[paste your code here]
```

Or target specific project files:

```text
Audit routes/auth.js and controllers/user.js with brutal-audit. Find every vulnerability down to CRITICAL!
```

---

## 📝 Gold Standard Output Format

```markdown
### 📊 Audit Summary
| Severity | Count | Affected Components |
| :--- | :---: | :--- |
| 🔴 CRITICAL | 1 | User Authentication & Database (`routes/login.js`) |
| 🟠 HIGH | 1 | Token Generator (`routes/login.js`) |
| 🟡 MEDIUM | 1 | Login Rate Limiting (`routes/login.js`) |
| 🔵 LOW | 0 | - |

---

### 🔴 [CRITICAL] SQL Injection (Authentication Bypass)
- **Location**: `routes/login.js` | **Line**: 8
- **Vulnerable Code**:
```javascript
const sql = "SELECT id, email, role FROM users WHERE email = '" + email + "' AND password = '" + password + "'";
```
- **Exploitation (PoC)**: An attacker supplies the payload `' OR '1'='1` in the `email` field. The SQL statement evaluates to:
```sql
SELECT id, email, role FROM users WHERE email = '' OR '1'='1' AND password = ''
```
The condition `'1'='1'` always resolves to TRUE, bypassing password verification and immediately retrieving the first user record (typically the administrator).
- **Concrete Solution**:
```javascript
const sql = 'SELECT id, email, role FROM users WHERE email = $1 AND password = $2';
const user = await db.query(sql, [email, password]);
```
- **References**: OWASP Top 10:2021-A03 (Injection), CWE-89.

---

### 🛡️ 5 Critical Domains Status
- **Hardcoded Secrets**: 1 vulnerability detected (🟠 HIGH: Hardcoded static token on line 11).
- **Injection**: 1 vulnerability detected (🔴 CRITICAL: SQL Injection on line 8).
- **Broken Authentication & Session**: 1 vulnerability detected (🟡 MEDIUM: Missing rate limiting on line 6).
- **Cross-Site Scripting (XSS)**: ✅ Safe: No XSS vulnerabilities found in submitted code.
- **Dependency Vulnerability**: ✅ Safe: No direct vulnerable dependencies found in submitted snippet.

---

### ✅ Final Verdict
This system is **NOT SAFE** for production deployment.
```

---

## 📂 Repository Structure

```
brutal-audit/
├── README.md                    # Main documentation (English)
├── guide.md                     # Getting started & setup guide
├── SKILL.md                     # Skill rule specification
├── plugin.json                  # Google Antigravity plugin manifest
├── package.json                 # NPM packaging & bin configuration
├── bin/
│   └── cli.js                   # Interactive multi-platform CLI installer
├── skills/
│   └── brutal-audit/
│       └── SKILL.md             # Standard agent skill folder
├── rules/
│   └── brutal-audit.md          # Agent rule enforcement pointer
├── .claude-plugin/
│   └── plugin.json              # Claude Code plugin manifest
├── .codex-plugin/
│   └── plugin.json              # OpenAI Codex plugin manifest
└── .cursor/
    └── rules/
        └── brutal-audit.mdc     # Cursor IDE rule specification
```

---

## 🤝 Contributing

Contributions are warmly welcomed! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on guidelines and our code of conduct.

---

## 📄 License

Distributed under the [MIT License](LICENSE).