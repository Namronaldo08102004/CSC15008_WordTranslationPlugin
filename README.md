21/3/2025
- pip install fastapi
- pip install uvicorn
- pip install python-multipart
- uvicorn basic_fastapi:app --reload
- Hướng dẫn cách lấy API từ Gemini
- https://learn.microsoft.com/en-us/office/dev/add-ins/quickstarts/word-quickstart-yo?tabs=devkit
- https://developers.google.com/apps-script/overview

# AI-Powered Translation Plugin for Word Processing Applications 🔠

<h1 align="left">
  <img src="Source/frontend/MSWord/assets/icon.jpg" alt="icon" width="200"></img>
</h1>

## Table of contents
- [Backend](#backend)
  - [Setup environment](#setup-environment)
  - [How to use](#how-to-use)
  - [Demo](#demo)
- [MS Word Add-in](#ms-word-add-in)
  - [Setup environment](#setup-environment-1)
  - [How to use](#how-to-use-1)
  - [Demo](#demo-1)
- [Google Docs Add-on](#google-docs-add-on)
  - [Setup environment](#setup-environment-2)
  - [How to use](#how-to-use-2)
  - [Demo](#demo-2)

## Backend

The backend for the Translator Add-in is built using **FastAPI**, a modern web framework for building high-performance APIs with Python. **FastAPI** was chosen for its speed, ease of use, and built-in support for asynchronous operations, making it well-suited for handling translation requests efficiently.

This backend serves as the core processing unit for both the **MS Word Add-in** and the **Google Docs Add-on**, managing text translation requests, language detection, and API communication with external translation services.

### Setup environment

To set up the environment for the Translator Add-in backend, follow these steps:

1. Install Python

### How to use

### Demo

## MS Word Add-in

### Setup environment

### How to use

### Demo

## Google Docs Add-on

### Setup environment

### How to use

### Demo

```python
pip install -r requirements.txt
```

Tải về Node.js (*nếu chưa có*) https://nodejs.org/en

Cài đặt `office-addin-dev-certs` để tạo chứng chỉ cho add-in

```bash
  npm install -g office-addin-dev-certs
  office-addin-dev-certs install
```

Tạo 1 unique ID giúp nhận diện duy nhất add-in. Chạy lệnh này trong PowerShell (Windows):
```powershell
  [guid]::NewGuid()
```

Sau khi chạy lệnh trên xong sẽ ra 1 id. Thực hiện:
```bash
  cd Source/frontend/MSWord
```
Sau đó vào file 