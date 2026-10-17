# V4 normal-chat two-unit acceptance — U2

Marker: `cv-c34afdce1a24`

## Purpose

This document is the second unit of a sequential two-unit acceptance fixture (`v4-normalchat-two-unit-20261017`). It exists so a controller can verify that U2 is not started until U1 has a durable exact-head PASS, and that U2 lands as its own one-file draft pull request.

This file is a checklist only. It does not claim that any outcome has been verified.

## Dependency

- [ ] U2 depends on accepted U1.
- [ ] Scheduler must not launch U2 until U1 is accepted by a durable exact-head controller PASS.
- [ ] The gate must not be bypassed.

## Controller observation

- [ ] Controller observes this worker pull request.
- [ ] Controller observes exact-head independent review of this pull request.
- [ ] Controller observes the applied effect of that review.

## Non-claims

- [ ] Do not treat this document as evidence that U1 passed.
- [ ] Do not treat this document as evidence that review completed.
- [ ] Do not treat this document as evidence that an effect was applied.
- [ ] No merge, deploy, customer write, credential use, external communication, or owner-routing change is part of this unit.
