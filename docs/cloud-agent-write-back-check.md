# Cloud agent write-back check

This repo is one of nine checkouts in the `ai-workbench` Cursor Cloud environment
(`yoavs-shipin/ai-integration +8`). It is the designated sandbox for verifying that a cloud
agent can push and open a pull request against a repository other than the primary one.

Each repository in that environment writes back independently: its own branch, its own
commits, its own pull request. There is no combined cross-repo pull request, and changes left
uncommitted in a checkout are discarded when the VM is torn down.

Verified on 2026-08-20. This file is a verification artifact and can be removed once the
environment review is accepted.
