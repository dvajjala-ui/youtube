# E01 demo-lab

Reproduce the failure the episode explains, on your own laptop, before you watch the explanation.

## One command

```bash
python demo-lab/redos.py
```

Python 3.11+ (3.14 used here). No dependencies, no network, nothing leaves your machine.
It finishes in about 10 seconds; the slowest single measurement is ~2 seconds.

## What you will see

Three patterns that look harmless, each measured against a *failing* input of growing length:

| pattern | why it blows up | n=20 | n=24 |
|---|---|---:|---:|
| `(a\|a)*b` | both alternatives match the same character | 0.12 s | 1.9 s |
| `(a+)+b` | a quantifier inside a quantifier | 0.059 s | 0.94 s |
| `((["']\|\s)+)+=` | outer and inner groups consume the same characters | 0.12 s | 2.0 s |

Time roughly **x4 for every 2 characters added**. That is the definition of exponential, and it is
why Cloudflare's engine hit 100% CPU on a single request on 2 July 2019: the work doubles instead
of progressing.

Then the same input against the fixed pattern: microseconds. Linear.

## The three fixes, in order of honesty

1. **Remove the ambiguity.** `(a|a)*b` becomes `a*b`. Best fix, no engine change.
2. **Atomic groups / possessive quantifiers** (`(?>a+)+b`, `a*+b`, Python 3.11+). The engine is
   forbidden from backtracking into the group.
3. **Bound the engine.** A match limit or timeout (PCRE has both), or use a DFA-based engine that
   cannot backtrack at all: RE2, or Rust's `regex` crate. This is what Cloudflare moved to -
   [Making the WAF 40% faster](https://blog.cloudflare.com/making-the-waf-40-faster/) and
   [cloudflare/wirefilter](https://github.com/cloudflare/wirefilter).

## Honest limits of this demo

- Cloudflare's engine was PCRE (via a Lua WAF), not Python's `re`. The *class* of bug is identical;
  the step counts differ. Cloudflare's published counts for their pattern are 23 / 33 / 45 / 555,
  and 90 / 5,353 with a trailing literal - see [`../sources.csv`](../sources.csv) C010.
- The exact rule Cloudflare deployed was never published. Nothing here is their regex.
- `--danger` extends the tables until a request genuinely hangs. Do not run it on a shared machine.

## Try it yourself

```python
import re, time
pat = re.compile(r"(a|a)*b")
for n in (16, 20, 24, 28):
    s = "a" * n + "!"          # note: no "b", so the match must FAIL
    t = time.perf_counter(); pat.search(s); print(n, round(time.perf_counter() - t, 4))
```

Change `s = "a" * n + "a"` (so it succeeds) and watch the timer go flat. Failing is the expensive
part - which is exactly why a "simulate mode" rule that blocks nothing still took the network down.
