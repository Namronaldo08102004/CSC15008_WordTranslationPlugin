import sys
import os

# Lấy đường dẫn tuyệt đối của thư mục chứa app.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Liệt kê tất cả thư mục trong BASE_DIR
all_dirs = [f.path for f in os.scandir(BASE_DIR) if f.is_dir()]

# Thêm tất cả thư mục con của BASE_DIR vào sys.path
for directory in all_dirs:
    if directory not in sys.path:
        sys.path.append(directory)

# Thêm thư mục cha của BASE_DIR vào sys.path (nếu cần)
PARENT_DIR = os.path.dirname(BASE_DIR)
if PARENT_DIR not in sys.path:
    sys.path.append(PARENT_DIR)

from fastapi import FastAPI
from middleware import LogMiddleware, setup_cors
from routes.translation_route import router
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key = GEMINI_API_KEY)

app = FastAPI(title = "AI Translation Plugin")

app.add_middleware(LogMiddleware)
setup_cors(app)
app.include_router(router)