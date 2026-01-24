## Summary
(Plain words allowed, but keep numbers out of narrative unless they live in an attached atomic JSON.)

## GlyphLine (required for readiness / demo claims)
Paste ONE line. No spaces inside tokens.

Example:
`~REG:core ~LOAD:test ~P1 ~R+ ~G+ ~C+ ~A+ ~ZD+ ~ZDM+ ~T+ ~RUN:baseline ~ENV:ci ~TRACE:run-2026-01-xx ~ICEMAP:core-v1 ~ICE+ ~PROBE:schema ~PROBE:hash ~PASS ~COMMIT ~HASH ~JSON ~ARCH ~MANI ~READY:core
`

GlyphLine:
`<one-line tokens>`

### Evidence checklist (for any `~READY:*` claim)
Core bundle:
- [ ] `~COMMIT` recorded
- [ ] `~ENV:*` present
- [ ] `~RUN:*` present
- [ ] `~TRACE:*` present
- [ ] `~ICEMAP:*` present
- [ ] `~HASH` present
- [ ] `~JSON` present
- [ ] `~ARCH` present
- [ ] `~MANI` present

UI / Demo add-ons:
- [ ] `~SHOT` present (only if `~READY:ui` or `~READY:demo`)
- [ ] `~REPORT` present (only if `~READY:demo`)

## Notes
If you claim `~DEMO:official`, it must pass glyphlint rules (fail-closed).
