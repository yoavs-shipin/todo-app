def test_r10_acceptance_marker():
    """Tiny marker test proving pytest can run.""" 
    assert True, "r10 acceptance test passed"
if __name__ == "__main__":
    pytest.main([__file__, "-q"])
