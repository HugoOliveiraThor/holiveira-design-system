# OpenCode Backup para Google Drive — Design

**Data:** 2026-08-02
**Status:** Aprovado (brainstorming)
**Categoria:** Infrastructure / Tooling

## Problema

As skills, commands, agentes, prompts e config do OpenCode vivem em `~/.config/opencode/` (e `~/.opencode/skills`) **sem backup**. O script existente `sync-ai-tools.sh` aponta para `~/.config/opencode-profiles/default` (diretório antigo/de migração) e `~/.opencode/skills`, ignorando o config real. As skills pessoais podem ser perdidas com o reset de máquina ou corrupção.

O ecossistema já tem backup do ai-memory (`sync-ai-memory.sh` + LaunchAgent) rodando diariamente para `gdrive:ai-memory-backup`. O OpenCode não tem equivalente.

## Requisitos

- Backup automático diário das skills (ambos diretórios), commands, agentes, prompts e `opencode.json` para Google Drive via rclone.
- Agendamento que funcione com o Mac em sleep (wake agendado via `pmset`).
- Execução manual sob demanda.
- Sem duplicação com o `sync-ai-tools.sh` existente.
- Excluir dados sensíveis/descartáveis (secrets, auth, node_modules, backups antigos).

## Arquitetura

### Fonte → Destino (`gdrive:ai-tools-backup/opencode/`)

| Fonte local | Destino | Modo |
|-------------|---------|------|
| `~/.config/opencode/skills` | `opencode/skills/` | sync |
| `~/.opencode/skills` | `opencode/community-skills/` | sync |
| `~/.config/opencode/commands` | `opencode/commands/` | sync |
| `~/.config/opencode/agent` | `opencode/agent/` | sync |
| `~/.config/opencode/prompts` | `opencode/prompts/` | sync |
| `~/.config/opencode/opencode.json` | `opencode/opencode.json` | copy |
| o próprio script | `opencode/sync-opencode.sh` | copy |

### Exclusões (não backup)

- `node_modules/`, `.git/`, `cache/`, `*.log`
- `secrets/`, `auth.json`
- `*.bak*`, `*.backup-*`, `opencode.jsonc`, `package*.json`, `tui.json`, `settings.json`, `CLAUDE.md`

### Script `~/sync-opencode.sh`

Estilo `sync-ai-memory.sh` (`set -euo pipefail`), com passos:

1. Sync `~/.config/opencode/skills` → `$DEST/skills`
2. Sync `~/.opencode/skills` → `$DEST/community-skills`
3. Sync `~/.config/opencode/commands` → `$DEST/commands`
4. Sync `~/.config/opencode/agent` → `$DEST/agent`
5. Sync `~/.config/opencode/prompts` → `$DEST/prompts`
6. Copy `opencode.json` → `$DEST`
7. Copy o próprio script → `$DEST`
8. `pmset sleepnow` **apenas** quando executado via LaunchAgent (flag `--auto`). Execução manual não dorme o Mac.

### Agendamento

- **`sudo pmset repeat wakeorpoweron MTWRFSU 10:00:00`** — acorda o Mac às 10:00 (requer tomada; na bateria pula).
- **LaunchAgent `com.holiveira.sync-opencode.plist`** — 10:05 diário, logs `~/Library/Logs/sync-opencode.log` e `.error.log`, `PATH` com `/opt/homebrew/bin`. Chama `sync-opencode.sh --auto`.
- Final do script (com `--auto`): `pmset sleepnow` (volta ao sleep após backup).

### Limpeza do `sync-ai-tools.sh`

Remover passos `[3/8] OpenCode profile`, `[4/8] OpenCode studio` e `[5/8] OpenCode skills` — agora cobertos pelo script dedicado. Renumerar passos restantes e adicionar `sync-opencode.sh` à lista de scripts copiados em `[7/8]`.

## Fluxo de Dados

```
10:00  pmset wake (requer AC Power)
10:05  LaunchAgent dispara sync-opencode.sh
       ├─ rclone sync (skills, community-skills, commands, agent, prompts)
       ├─ rclone copy (opencode.json, sync-opencode.sh)
       ├─ logs em ~/Library/Logs/
       └─ pmset sleepnow → Mac dorme de novo
```

## Erros e Recuperação

- **Tomada ausente às 10:00:** wake não acontece; backup roda no próximo wake manual. Log indica não execução.
- **rclone sem token:** o remote `gdrive:` falha — o script sai com código != 0 (erro logado). O token está em `~/.config/rclone/rclone.conf` (backupeado pelo `sync-ai-tools.sh`).
- **Diretório fonte inexistente:** cada passo checa `[ -d "$src" ]` e pula com aviso (mesmo padrão do ai-memory).

## Testes

- Executar `~/sync-opencode.sh` manualmente e conferir a árvore em `gdrive:ai-tools-backup/opencode/`.
- `plutil -lint` no plist do LaunchAgent.
- `launchctl load` e verificação de logs.
- `pmset -g sched` para confirmar o wake agendado às 10:00.

## Fora de Escopo

- Backup de `auth.json`/`secrets` (deliberadamente excluídos por sensibilidade).
- Versões/histórico no Drive (rclone sync é espelho, não versionado).
- Criptografia do backup (Drive é conta pessoal; avaliar rclone crypt se necessário no futuro).
