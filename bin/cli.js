#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m'
};

const banner = `
${c.red}${c.bold}
██████╗ ██████╗ ██╗   ██╗████████╗ █████╗ ██╗         █████╗ ██╗   ██╗██████╗ ██╗████████╗
██╔══██╗██╔══██╗██║   ██║╚══██╔══╝██╔══██╗██║        ██╔══██╗██║   ██║██╔══██╗██║╚══██╔══╝
██████╔╝██████╔╝██║   ██║   ██║   ███████║██║        ███████║██║   ██║██║  ██║██║   ██║   
██╔══██╗██╔══██╗██║   ██║   ██║   ██╔══██║██║        ██╔══██║██║   ██║██║  ██║██║   ██║   
██████╔╝██║  ██║╚██████╔╝   ██║   ██║  ██║███████╗    ██║  ██║╚██████╔╝██████╔╝██║   ██║   
╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝   ╚═╝   
${c.reset}${c.yellow}           Security Auditor Tanpa Kompromi, Kejam, dan 100% Konkret${c.reset}
`;

console.log(banner);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function appendPointer(filePath, pointerContent) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  let existing = '';
  if (fs.existsSync(filePath)) {
    existing = fs.readFileSync(filePath, 'utf8');
  }
  if (!existing.includes('brutal-audit')) {
    const separator = existing.length > 0 && !existing.endsWith('\n') ? '\n\n' : '';
    // atomic write via temp file rename
    const tmpPath = `${filePath}.tmp.${process.pid}`;
    const fd = fs.openSync(tmpPath, 'w');
    fs.writeSync(fd, `${separator}${pointerContent}\n`, 'utf8');
    fs.closeSync(fd);
    fs.renameSync(tmpPath, filePath);
    console.log(`  ${c.green}✔${c.reset} Pointer ditambahkan ke ${c.bold}${filePath}${c.reset}`);
  } else {
    console.log(`  ${c.blue}ℹ${c.reset} Pointer sudah ada di ${filePath}`);
  }
}

async function main() {
  const packageRoot = path.resolve(__dirname, '..');
  const sourceSkillDir = path.join(packageRoot, 'skills', 'brutal-audit');
  const sourceSkillFile = path.join(sourceSkillDir, 'SKILL.md');

  if (!fs.existsSync(sourceSkillFile)) {
    console.error(`${c.red}Error: File sumber ${sourceSkillFile} tidak ditemukan.${c.reset}`);
    process.exit(1);
  }

  console.log(`${c.bold}${c.cyan}Selamat datang di installer brutal-audit!${c.reset}\n`);
  console.log(`${c.white}Pilih target AI Coding Agent:${c.reset}`);
  console.log(`  ${c.yellow}1)${c.reset} Claude Code        ${c.gray}(~/.claude/skills/brutal-audit)${c.reset}`);
  console.log(`  ${c.yellow}2)${c.reset} Google Antigravity ${c.gray}(~/.gemini/config/skills/brutal-audit)${c.reset}`);
  console.log(`  ${c.yellow}3)${c.reset} Cursor             ${c.gray}(.cursor/rules/brutal-audit.mdc)${c.reset}`);
  console.log(`  ${c.yellow}4)${c.reset} OpenAI Codex       ${c.gray}(~/.codex/skills/brutal-audit)${c.reset}`);
  console.log(`  ${c.yellow}5)${c.reset} Semua Agent        ${c.gray}(Install ke semua agent yang terdeteksi)${c.reset}\n`);

  const agentChoice = (await ask(`${c.bold}Pilihan Anda [1-5] (default: 5): ${c.reset}`)).trim() || '5';

  console.log(`\n${c.white}Pilih lingkup instalasi:${c.reset}`);
  console.log(`  ${c.yellow}1)${c.reset} Global             ${c.gray}(Tersedia di semua project di komputer ini - Rekomendasi)${c.reset}`);
  console.log(`  ${c.yellow}2)${c.reset} Project Saat Ini   ${c.gray}(Hanya aktif di direktori kerja saat ini)${c.reset}\n`);

  const scopeChoice = (await ask(`${c.bold}Pilihan Lingkup [1-2] (default: 1): ${c.reset}`)).trim() || '1';
  const isGlobal = scopeChoice === '1';

  console.log(`\n${c.cyan}Memulai proses instalasi...${c.reset}\n`);

  const homeDir = os.homedir();
  const cwd = process.cwd();

  const installClaude = () => {
    const targetDir = isGlobal
      ? path.join(homeDir, '.claude', 'skills', 'brutal-audit')
      : path.join(cwd, '.claude', 'skills', 'brutal-audit');
    copyDir(sourceSkillDir, targetDir);
    console.log(`  ${c.green}✔${c.reset} Skill brutal-audit disalin ke: ${targetDir}`);

    const pointerFile = isGlobal ? path.join(homeDir, '.claude', 'CLAUDE.md') : path.join(cwd, 'CLAUDE.md');
    appendPointer(pointerFile, `## Security Auditing Skill\nUntuk setiap audit keamanan atau review kode, aktifkan dan patuhi skill **brutal-audit** (6 Aturan Besi R-01 s/d R-06).`);
  };

  const installAntigravity = () => {
    const targetDir = isGlobal
      ? path.join(homeDir, '.gemini', 'config', 'skills', 'brutal-audit')
      : path.join(cwd, '.agents', 'skills', 'brutal-audit');
    copyDir(sourceSkillDir, targetDir);
    console.log(`  ${c.green}✔${c.reset} Skill brutal-audit disalin ke: ${targetDir}`);

    const pointerFile = isGlobal ? path.join(homeDir, '.gemini', 'config', 'rules', 'brutal-audit.md') : path.join(cwd, 'GEMINI.md');
    appendPointer(pointerFile, `# Brutal Audit Enforcement\nKetika user meminta audit keamanan atau review kode berbahaya, gunakan skill \`brutal-audit\` dengan klasifikasi Severity 4 tingkat, lokasi baris konkret, dan perbaikan copy-paste.`);
  };

  const installCursor = () => {
    const targetRulesDir = isGlobal
      ? path.join(homeDir, '.cursor', 'rules')
      : path.join(cwd, '.cursor', 'rules');
    if (!fs.existsSync(targetRulesDir)) {
      fs.mkdirSync(targetRulesDir, { recursive: true });
    }
    const targetFile = path.join(targetRulesDir, 'brutal-audit.mdc');
    const mdcContent = `---
description: Security Auditor yang brutal dan 100% konkret
globs: "*.{js,ts,jsx,tsx,py,go,rs,php,java,rb,c,cpp,cs,sh,pl,sql}"
alwaysApply: false
---
${fs.readFileSync(sourceSkillFile, 'utf8')}
`;
    fs.writeFileSync(targetFile, mdcContent, 'utf8');
    console.log(`  ${c.green}✔${c.reset} Rule Cursor dibuat di: ${targetFile}`);

    // pointer hanya ditambahkan pada scope project, tidak untuk global
    if (!isGlobal) {
      const cursorrulesPath = path.join(cwd, '.cursorrules');
      appendPointer(cursorrulesPath, `Review keamanan kode wajib mengikuti standar 'brutal-audit' dengan severity R-01 s/d R-06.`);
    }
  };

  const installCodex = () => {
    const targetDir = isGlobal
      ? path.join(homeDir, '.codex', 'skills', 'brutal-audit')
      : path.join(cwd, '.codex', 'skills', 'brutal-audit');
    copyDir(sourceSkillDir, targetDir);
    console.log(`  ${c.green}✔${c.reset} Skill brutal-audit disalin ke: ${targetDir}`);

    // pointer agar Codex memuat aturan brutal-audit secara konsisten
    const pointerContent = `# Brutal Audit Enforcement\nKetika user meminta audit keamanan, gunakan skill \`brutal-audit\` dengan severity R-01 s/d R-06.`;
    if (isGlobal) {
      const globalInstructionsPath = path.join(homeDir, '.codex', 'INSTRUCTIONS.md');
      appendPointer(globalInstructionsPath, pointerContent);
    } else {
      const localInstructionsPath = path.join(cwd, 'CODEX.md');
      appendPointer(localInstructionsPath, pointerContent);
    }
  };

  if (agentChoice === '1') {
    installClaude();
  } else if (agentChoice === '2') {
    installAntigravity();
  } else if (agentChoice === '3') {
    installCursor();
  } else if (agentChoice === '4') {
    installCodex();
  } else {
    console.log(`${c.bold}Menginstall untuk semua platform...${c.reset}`);
    installClaude();
    installAntigravity();
    installCursor();
    installCodex();
  }

  console.log(`\n${c.green}${c.bold}🎉 Instalasi Berhasil Selesai!${c.reset}\n`);
  console.log(`${c.bold}Cara Penggunaan:${c.reset}`);
  console.log(`Cukup ketikkan di agent AI Anda:`);
  console.log(`${c.cyan}"Gunakan skill brutal-audit untuk mengaudit keamanan file ini: [nama_file]"${c.reset}\n`);

  rl.close();
}

// Graceful shutdown
const shutdown = (signal) => {
  if (rl) rl.close();
  process.exit(signal === 'SIGINT' ? 130 : 0);
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

main().catch((err) => {
  console.error(`\n${c.red}Terjadi kesalahan:${c.reset}`, err);
  if (rl) rl.close();
  process.exit(1);
});

// Export untuk testing — hanya saat dijalankan sebagai modul, bukan langsung
if (require.main !== module) {
  module.exports = {
    copyDir,
    appendPointer,
  };
}
