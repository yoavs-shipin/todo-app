"""Minimal product marker for kernel v3-prod-15 QA routing fixtures."""

# P1: synthetic QA flagged a fixture defect here; U1 clears it for retest.
FIXTURE_DEFECT = False


def fixture_defect_repaired() -> bool:
    """Return True when the fixture defect tracked in product.py is repaired."""
    return not FIXTURE_DEFECT
