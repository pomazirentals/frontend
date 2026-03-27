import hashlib
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")


def avatar_color(text: str) -> str:
    colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#22c55e", "#06b6d4", "#f59e0b", "#ef4444"]
    idx = int(hashlib.md5(str(text).encode()).hexdigest(), 16) % len(colors)
    return colors[idx]


templates.env.globals["avatar_color"] = avatar_color
