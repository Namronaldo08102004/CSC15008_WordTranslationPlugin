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

1. **Install Python**

Ensure you have **Python 3.8 or later** installed on your system. You can check your Python version by running:

```bash
python --version
```

If Python is not installed, download and install it from [python.org](https://www.python.org/downloads/).

2. **Create a Virtual Environment (Recommended)**

It is recommended to create a virtual environment to manage dependencies. Run the following commands:

```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate      # On Windows
```

3. **Install Dependencies**

Once the virtual environment is activated, install the required dependencies using the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

This will install:

  - **FastAPI** (for building the API)

  - **Uvicorn** (for running the server)

  - **Python-Multipart** (for handling form data)

  - **Google-GenerativeAI** (for AI-powered translation)

  - **Python-Dotenv** (for managing environment variables)

4. **Set Up Environment Variables**

Once modules were installed, move to the `backend` folder and create a `.env` file in the project directory, then configure necessary API keys (e.g., for translation services):

```python
GEMINI_API_KEY = your_api_key_here
```

To get the **Gemini API key**, go to [API - Google AI Studio](https://aistudio.google.com/apikey) to get it. 

### How to use

Once the environment is set up, follow these steps to start and use the backend service:

1. **Navigate to the Backend Directory**

Move into the `backend` directory where the FastAPI application is located:

```bash
cd backend
```

2. **Start the FastAPI Server**

Run the following command to start the server using **Uvicorn**:

```bash
uvicorn app:app --reload
```

The `--reload` flag enables automatic reloading when code changes, making development more efficient. By default, the server runs on `http://127.0.0.1:8000`.

3. **Access the API Documentation**

Once the server is running, you can access the interactive API documentation using **Swagger UI** by access to `http://127.0.0.1:8000/docs`. These documentation pages provide an overview of available API endpoints and allow you to test them directly from the browser.

To stop the backend server, press `CTRL + C` in the terminal.

### Demo

This section provides a demonstration of how the backend works in action. You will see how the FastAPI server processes translation requests and returns results.

[![Watch the video](https://raw.githubusercontent.com/Namronaldo08102004/CSC15008_TranslationPlugin/main/Source/assets/backend_thumbnail.png)](https://raw.githubusercontent.com/Namronaldo08102004/CSC15008_TranslationPlugin/main/Source/assets/backend_demo.mp4)

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