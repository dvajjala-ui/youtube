"""Copy the local voice master and generate cues and original sound effects."""
import array
import json
import math
import shutil
import wave
from pathlib import Path

episode = Path(__file__).resolve().parents[1]
takes = episode / "host" / "narration"
assets = episode / "composition" / "public" / "narration"
assets.mkdir(parents=True, exist_ok=True)
master = takes / "master.wav"

with wave.open(str(master), "rb") as source:
    rate = source.getframerate()
    if rate != 48000 or source.getnchannels() != 1 or source.getsampwidth() != 2:
        raise ValueError("Expected 48 kHz, mono, 16-bit PCM narration.")
    audio = array.array("h", source.readframes(source.getnframes()))

if not audio:
    raise ValueError("Narration file contains no samples.")

shutil.copyfile(master, assets / "host-opening.wav")
frame_samples = rate // 30
mouth = []
for offset in range(0, len(audio), frame_samples):
    section = audio[offset:offset + frame_samples]
    rms = math.sqrt(sum(sample * sample for sample in section) / len(section))
    mouth.append(min(24, round(rms / 260)))
(takes / "mouth-envelope.json").write_text(
    json.dumps(mouth, separators=(",", ":")) + "\n", encoding="utf-8"
)

sound_effects = [
    ("tick", 0.20, 26, [(0, 680), (0.047, 920)]),
    ("alert", 0.52, 12, [(0, 488), (0.138, 369)]),
]
for name, length, decay, tones in sound_effects:
    samples = array.array("h")
    for index in range(round(length * rate)):
        second = index / rate
        value = 0
        for start, frequency in tones:
            age = second - start
            if age >= 0:
                attack = min(1, age / 0.008)
                value += attack * math.exp(-age * decay) * math.sin(2 * math.pi * frequency * age)
        samples.append(round(10000 * value))
    with wave.open(str(assets / f"host-{name}.wav"), "wb") as effect:
        effect.setparams((1, 2, rate, 0, "NONE", "not compressed"))
        effect.writeframes(samples.tobytes())

print(f"Prepared {len(mouth)} frames of voice activity and two sound effects.")
