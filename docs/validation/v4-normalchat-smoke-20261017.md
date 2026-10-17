# V4 normal-ChatGPT controller smoke (2026-10-17)

## Purpose

Disposable fixture for a low-risk production proof of the V4 path: worker launch, Git pull request, wake into the regular ChatGPT owner-controller chat, then an exact-head controller decision. This file is a checklist artifact only. It does not record delivery, production evidence, or a pass/fail result.

## Marker

Owner-controller conversation marker: `cv-c34afdce1a24`

## run.finished vs accepted outcome

- `run.finished` means the worker run ended. It is not an acceptance decision.
- An accepted outcome is a separate controller decision on the exact head after independent review. Finishing a run does not imply the head was accepted, merged, or deployed.

## Controller checks

Observe these exactly. Do not treat any of them as already satisfied by this document.

1. The PR head is the commit that contains only `docs/validation/v4-normalchat-smoke-20261017.md` (plus this fixture’s commit metadata).
2. The PR is a draft against the repository default branch. It is not merged.
3. The conversation wake is the regular ChatGPT chat identified by marker `cv-c34afdce1a24`.
4. The controller decision is made on that exact head, not on `run.finished` alone.
5. No deploy, customer write, credential use, or external communication is part of this unit.
