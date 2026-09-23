# Personal Bridge disposable fixture

Regression: `cb-prod-17-idle-not-queued` (`pbl2-fixture-k3m-idle2` on `yoavs-shipin/todo-app`).

Queue-mode `send_agent_message` while this agent is idle should deliver immediately (no “waiting for idle agent” receipt).

## Run log

- 2026-09-23T07:09:00Z — operator signaled idle-phase complete; cursor cloud `bc-1270ab11-ce1e-56e3-b70d-319ea9fdb626`, branch `cursor/pbl2-fixture-k3m-idle2-1790147350-d984`
