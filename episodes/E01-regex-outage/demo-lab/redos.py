#!/usr/bin/env python3
"""
E01 demo-lab - reproduce catastrophic backtracking in ~30 lines.

The 2 July 2019 Cloudflare WAF outage was caused by a sub-pattern of the shape
    .*(?:.*=.*)
which behaves like  .*.*=.*  : nested, ambiguous quantifiers. Cloudflare's own
postmortem appendix prints the engine step counts (23 / 33 / 45 / 555, and 90 /
5,353 once a trailing literal is added).

We cannot run Cloudflare's PCRE engine here, so this reproduces the same CLASS of
pattern in Python's `re` and measures the exponential blow-up directly. Every
number below was measured on Python 3.14.6 with these caps; nothing runs longer
than ~2 seconds unless you pass --danger.

    python redos.py            # safe table, ~10 seconds
    python redos.py --danger   # keeps doubling until it hangs (Ctrl-C to stop)
"""

import re
import sys
import time

CASES = [
    {
        "name": "1. ambiguous alternation  (the shape drawn in the video)",
        "vuln": r"(a|a)*b",
        "fixed": r"a*b",
        "payload": lambda n: "a" * n + "!",
        "sizes": [8, 10, 12, 14, 16, 18, 20, 22, 24],
        "danger": [26, 28, 30, 32],
        "why": "the two alternatives match the same character, so n a's can be split 2^(n-1) ways",
    },
    {
        "name": "2. nested quantifier  (classic ReDoS)",
        "vuln": r"(a+)+b",
        "fixed": r"a+b",
        "payload": lambda n: "a" * n + "!",
        "sizes": [8, 10, 12, 14, 16, 18, 20, 22, 24],
        "danger": [26, 28, 30],
        "why": "a quantifier inside a quantifier over an overlapping alphabet",
    },
    {
        "name": "3. WAF-shaped probe  (quote-or-space, repeated)",
        "vuln": r"""((["']|\s)+)+=""",
        "fixed": r"""["'\s]*=""",
        "payload": lambda n: '"' * n + "x",
        "sizes": [12, 16, 18, 20, 22, 24],
        "danger": [26, 28, 30],
        "why": "outer and inner groups can both consume the same characters",
    },
]


def probe(pattern: str, payload: str) -> float:
    t = time.perf_counter()
    re.compile(pattern).search(payload)
    return time.perf_counter() - t


def main():
    danger = "--danger" in sys.argv
    print("E01 demo-lab :: catastrophic backtracking, measured on this machine")
    print(f"python {sys.version.split()[0]}  |  module: re  |  engine: backtracking")
    print("Same CLASS of bug as Cloudflare's 2 July 2019 rule - not their rule.\n")

    for c in CASES:
        print(c["name"])
        print(f"  vulnerable: {c['vuln']}")
        print(f"  {c['why']}")
        print(f"  {'n':>4}  {'seconds':>10}  {'x previous':>10}")
        sizes = c["sizes"] + (c["danger"] if danger else [])
        prev = None
        for n in sizes:
            d = probe(c["vuln"], c["payload"](n))
            ratio = f"x{d/prev:.1f}" if prev and prev > 0.0002 else ""
            print(f"  {n:>4}  {d:>10.5f}  {ratio:>10}")
            prev = d
            if d > 20:
                print("       (stopping: this is already a hung request)")
                break
        n = sizes[-4] if len(sizes) > 4 else sizes[-1]
        d_fixed = probe(c["fixed"], c["payload"](n))
        print(f"  fixed:    {c['fixed']}   -> n={n}: {d_fixed:.5f}s (linear)\n")

    print("--- the three real fixes, in order of honesty ---")
    print("  1. remove the ambiguity from the pattern (best)")
    print("  2. atomic groups / possessive quantifiers: (?>a+)+b  or  a*+b  - Python 3.11+")
    print("  3. put a bound on the engine: PCRE match limit, a timeout, or a DFA engine")
    print("     (RE2 / Rust `regex`), which is what Cloudflare shipped:")
    print("       https://blog.cloudflare.com/making-the-waf-40-faster/")
    print("       https://github.com/cloudflare/wirefilter")
    print("\nRule for your own code: never let a regex that runs on attacker-controlled")
    print("input have a quantifier inside a quantifier, and always set a match timeout.")


if __name__ == "__main__":
    main()
