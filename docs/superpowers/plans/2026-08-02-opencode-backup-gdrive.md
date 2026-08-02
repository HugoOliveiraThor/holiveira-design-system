# Backup OpenCode → Google Drive — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Backup automático diário das skills, commands, agentes, prompts e config do OpenCode para o Google Drive via rclone, com wake agendado e retorno ao sleep.

**Architecture:** Script bash dedicado `~/sync-opencode.sh` (padrão `sync-ai-memory.sh`) que espelha `~/.config/opencode/` e `~/.opencode/skills` em `gdrive:ai-tools-backup/opencode/`. Agendamento via LaunchAgent às 10:05 + wake do Mac às 10:00 via `pmset repeat`. Cleanup dos passos OpenCode duplicados no `sync-ai-tools.sh`.

**Tech Stack:** bash (`set -euo pipefail`), rclone v1.74.4 (remote `gdrive:` já configurado), launchd (plist), `pmset` (agendamento de energia).

## Global Constraints

- Destino único: `gdrive:ai-tools-backup/opencode/`
- Excluir SEMPRE: `node_modules/`, `.git/`, `cache/`, `*.log`, `secrets/`, `auth.json`, `*.bak*`, `*.backup-*`, `opencode.jsonc`, `package*.json`, `tui.json`, `settings.json`, `CLAUDE.md`
- Script usa `set -euo pipefail`
- Cada fonte checa `[ -d "$src" ]` antes de sincronizar (pula com aviso se ausente)
- `pmset sleepnow` apenas com flag `--auto` (execução via LaunchAgent)
- PATH do LaunchAgent: `/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`
- Wake agendado: `MTWRFSU 10:00:00` (requer AC Power; na bateria pula)
- Spec: `docs/superpowers/specs/2026-08-02-opencode-backup-gdrive-design.md`

---

### Task 1: Criar o script `~/sync-opencode.sh`

**Files:**
- Create: `~/sync-opencode.sh`

**Interfaces:**
- Consumes: remote rclone `gdrive:` (já configurado), diretórios `~/.config/opencode/`, `~/.opencode/skills`
- Produces: `gdrive:ai-tools-backup/opencode/` com `skills/`, `community-skills/`, `commands/`, `agent/`, `prompts/`, `opencode.json`, `sync-opencode.sh`; flag `--auto` para `pmset sleepnow`

- [ ] **Step 1: Escrever o script**

```bash
#!/bin/bash
# sync-opencode.sh — Backup do ecossistema OpenCode para Google Drive
# Estrutura: gdrive:ai-tools-backup/opencode/
# Uso: sync-opencode.sh [--auto]  (--auto = roda pmset sleepnow ao final)
set -euo pipefail

DEST="gdrive:ai-tools-backup/opencode"
CONFIG_DIR="$HOME/.config/opencode"
OPCODE_DIR="$HOME/.opencode"
AUTO=false
[ "${1:-}" = "--auto" ] && AUTO=true

echo "============================================"
echo "  OpenCode Backup - $(date '+%Y-%m-%d %H:%M')"
echo "============================================"

# 1. Skills pessoais (~/.config/opencode/skills)
echo "[1/7] Skills pessoais"
if [ -d "$CONFIG_DIR/skills" ]; then
  rclone sync "$CONFIG_DIR/skills" "$DEST/skills" \
    --exclude "node_modules/**" \
    --exclude ".git/**" \
    --exclude "cache/**" \
    --exclude "*.log" \
    --exclude "*.bak*" \
    --exclude "*.backup-*" \
    --progress
fi

# 2. Skills da comunidade (~/.opencode/skills)
echo "[2/7] Skills da comunidade"
if [ -d "$OPCODE_DIR/skills" ]; then
  rclone sync "$OPCODE_DIR/skills" "$DEST/community-skills" \
    --exclude "node_modules/**" \
    --exclude ".git/**" \
    --exclude "cache/**" \
    --exclude "*.log" \
    --progress
fi

# 3. Commands (slash commands)
echo "[3/7] Commands"
if [ -d "$CONFIG_DIR/commands" ]; then
  rclone sync "$CONFIG_DIR/commands" "$DEST/commands" --progress
fi

# 4. Agent (agentes custom)
echo "[4/7] Agent"
if [ -d "$CONFIG_DIR/agent" ]; then
  rclone sync "$CONFIG_DIR/agent" "$DEST/agent" --progress
fi

# 5. Prompts
echo "[5/7] Prompts"
if [ -d "$CONFIG_DIR/prompts" ]; then
  rclone sync "$CONFIG_DIR/prompts" "$DEST/prompts" \
    --exclude "node_modules/**" \
    --exclude "*.log" \
    --progress
fi

# 6. Config principal
echo "[6/7] opencode.json"
if [ -f "$CONFIG_DIR/opencode.json" ]; then
  rclone copy "$CONFIG_DIR/opencode.json" "$DEST/" --progress
fi

# 7. Inclui o próprio script no backup
echo "[7/7] Incluindo script no backup"
SCRIPT_PATH="$(readlink -f "$0")"
rclone copy "$SCRIPT_PATH" "$DEST/" --progress

echo ""
echo "=== Backup concluído em $(date '+%H:%M:%S') ==="

# Retorna ao sleep apenas quando agendado
if [ "$AUTO" = true ]; then
  echo "Dormindo em 15s..."
  sleep 15
  pmset sleepnow
fi
```

- [ ] **Step 2: Tornar executável e validar sintaxe**

```bash
chmod +x ~/sync-opencode.sh
bash -n ~/sync-opencode.sh && echo "SINTAXE OK"
```

Expected: `SINTAXE OK`

- [ ] **Step 3: Commit** (o script vive em `~/`, fora do repo — registrar o plano apenas)

N/A — script é fora do repo. Avançar.

---

### Task 2: Executar o backup manualmente e verificar no Drive

**Files:**
- Test: `gdrive:ai-tools-backup/opencode/`

**Interfaces:**
- Consumes: `~/sync-opencode.sh` (Task 1)
- Produces: árvore `opencode/` no Drive confirmada

- [ ] **Step 1: Rodar o script**

Run: `~/sync-opencode.sh`
Expected: 7 passos com `[1/7]` a `[7/7]` completos, sem erro, `set -e` não aborta.

- [ ] **Step 2: Verificar a árvore no Drive**

Run: `rclone lsf gdrive:ai-tools-backup/opencode -R | grep -v NOTICE | head -40`
Expected: contém `skills/`, `community-skills/`, `commands/`, `agent/`, `prompts/`, `opencode.json`, `sync-opencode.sh`.

- [ ] **Step 3: Verificar que exclusões não vazaram**

Run: `rclone lsf gdrive:ai-tools-backup/opencode -R | grep -v NOTICE | grep -iE "auth\.json|secrets|node_modules|\.bak" | head`
Expected: vazio (nenhuma exclusão vazou).

---

### Task 3: Criar o LaunchAgent `com.holiveira.sync-opencode.plist`

**Files:**
- Create: `~/Library/LaunchAgents/com.holiveira.sync-opencode.plist`

**Interfaces:**
- Consumes: `~/sync-opencode.sh` (Task 1)
- Produces: execução diária às 10:05 com logs; chama `--auto`

- [ ] **Step 1: Escrever o plist**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.holiveira.sync-opencode</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/hugo/sync-opencode.sh</string>
        <string>--auto</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>10</integer>
        <key>Minute</key>
        <integer>5</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>/Users/hugo/Library/Logs/sync-opencode.log</string>
    <key>StandardErrorPath</key>
    <string>/Users/hugo/Library/Logs/sync-opencode.error.log</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
    </dict>
    <key>RunAtLoad</key>
    <false/>
    <key>KeepAlive</key>
    <false/>
</dict>
</plist>
```

- [ ] **Step 2: Validar e carregar**

```bash
plutil -lint ~/Library/LaunchAgents/com.holiveira.sync-opencode.plist
launchctl load ~/Library/LaunchAgents/com.holiveira.sync-opencode.plist
launchctl list | grep sync-opencode
```

Expected: `OK` no plutil, plist listado no `launchctl list`.

---

### Task 4: Agendar wake do Mac às 10:00

**Files:**
- Modify: sistema (power management)

**Interfaces:**
- Consumes: — (independe de Tasks anteriores)
- Produces: wake diário às 10:00 (`pmset -g sched` mostra o evento)

- [ ] **Step 1: Agendar wake recorrente**

```bash
sudo pmset repeat wakeorpoweron MTWRFSU 10:00:00
```

- [ ] **Step 2: Confirmar o agendamento**

Run: `pmset -g sched`
Expected: `wakeorpoweron at 10:00:00` em todos os dias da semana.

- [ ] **Step 3: Documentar a limitação de energia**

Nota: wake agendado no Apple Silicon requer AC Power. Se estiver só na bateria às 10:00, o backup roda no próximo wake manual. Registrar no log da seção "Erros" se necessário.

---

### Task 5: Limpar os passos OpenCode do `sync-ai-tools.sh`

**Files:**
- Modify: `~/sync-ai-tools.sh` (linhas 33-64)

**Interfaces:**
- Consumes: script existente `~/sync-ai-tools.sh`
- Produces: script sem duplicação com `sync-opencode.sh`; passos renumeraldos

- [ ] **Step 1: Remover o bloco OpenCode**

Apagar as linhas 33-64 (seções `# ─── 4. OpenCode profile`, `# ─── 5. OpenCode studio`, `# ─── 6. OpenCode skills`), incluindo os `echo "[3/8]"`, `"[4/8]"`, `"[5/8]"`.

Resultado: o script passa de 8 seções numeradas a 7 (1. agents-skills, 2. rules, 3. Claude Code, 4. README+scripts, 5. rclone config, 6. VS Code).

- [ ] **Step 2: Renumerar os echos restantes**

Renumerar os `echo "[n/8]"` restantes para sequência contínua:
- `[6/8] Claude Code config` → `[3/7]`
- `[7/8] README + scripts` → `[4/7]`
- `[8/9] rclone config` → `[5/7]`
- `[9/9] VS Code config` → `[6/7]`

- [ ] **Step 3: Adicionar `sync-opencode.sh` à lista de scripts copiados**

No bloco `# ─── 8. README + Scripts`, alterar:
```bash
for s in sync-ai-tools.sh sync-ai-memory.sh; do
```
para:
```bash
for s in sync-ai-tools.sh sync-ai-memory.sh sync-opencode.sh; do
```

- [ ] **Step 4: Validar sintaxe**

Run: `bash -n ~/sync-ai-tools.sh && echo "SINTAXE OK"`
Expected: `SINTAXE OK`

- [ ] **Step 5: Rodar o sync-ai-tools para confirmar que segue funcionando**

Run: `~/sync-ai-tools.sh`
Expected: todos os passos executam sem erro, sem seções OpenCode duplicadas.

---

### Task 6: Verificação final ponta-a-ponta

**Files:**
- Test: Drive + logs + agendamento

**Interfaces:**
- Consumes: Tasks 1-5
- Produces: estado confirmado

- [ ] **Step 1: Reexecutar o backup manual**

Run: `~/sync-opencode.sh`
Expected: 7/7 passos OK.

- [ ] **Step 2: Conferir o Drive**

Run: `rclone lsf gdrive:ai-tools-backup/opencode | grep -v NOTICE`
Expected: `agent/`, `commands/`, `community-skills/`, `prompts/`, `skills/`, `opencode.json`, `sync-opencode.sh`.

- [ ] **Step 3: Confirmar agendamentos**

Run: `launchctl list | grep -E "sync-opencode|sync-ai-memory"` e `pmset -g sched`
Expected: ambos LaunchAgents carregados; wake às 10:00 presente.

- [ ] **Step 4: Resumo final**

Registrar no clipboard o resumo do backup (regra AGENTS.md) e reportar ao usuário.
