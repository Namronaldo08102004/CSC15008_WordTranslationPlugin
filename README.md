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
cd Source/backend
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

https://github.com/user-attachments/assets/b6e5f90c-5c76-469a-9858-4920ec1d3fbd

## MS Word Add-in

The **MS Word Translator Add-in** is a tool I developed to seamlessly integrate translation capabilities into Microsoft Word. With this add-in, users can translate text directly within their documents without the need to switch between applications, making the workflow more efficient and convenient.

In the following sections, I will guide you through setting up, using, and fully experiencing the features of the MS Word Translator Add-in.

### Setup environment

To set up the **MS Word Translator Add-in**, follow these steps:

1. **Install Node.js (If Not Installed)**

Ensure that **Node.js** is installed on your system. If not, download and install it from [nodejs.org](https://nodejs.org/en). You can verify the installation by running:

```bash
node -v
npm -v
```

2. **Install SSL Certificates for Office Add-ins**

Microsoft Office requires SSL certificates for local add-in development. Install the necessary certificates using:

```bash
npm install -g office-addin-dev-certs
office-addin-dev-certs install
```

This will generate and install self-signed certificates, allowing Word to recognize the add-in.

3. **Generate a Unique Add-in ID**

Each add-in requires a unique identifier. Generate one using PowerShell (Windows):

```powershell
[guid]::NewGuid()
```

This command will output a unique **GUID** (e.g., `73f8b755-7dac-4714-9986-3a46e67b5db7`).

4. **Replace the Add-in ID in the Manifest File**

After generating a unique **GUID**, navigate to the add-in’s source directory and open the `manifest.xml` file.

```bash
cd Source/frontend/MSWord
```

Then locate the `<Id>` tag and replace the existing ID with your newly generated GUID.

### How to use

Once the setup is complete, follow these steps to run and use the **MS Word Translator Add-in**:

1. **Navigate to the Add-in Directory**

Move into the directory that contains the necessary components for loading the Word Add-in:

```bash
cd Source/frontend/MSWord
```

2. **Start the Add-in Development Server**

Run the following command to start the local server:

```bash
npm start
```

During the startup process, you may see the following prompt `Allow localhost loopback for Microsoft Edge WebView? (Y/n)`. Select `n`, as this is not required for running the add-in.

Once the development server starts, **Webpack** will compile and serve the add-in components. You should see logs indicating that the build is running successfully. After **Webpack** has finished loading, a **Word document with the Translator Add-in integrated** will automatically open in Microsoft Word. You can now use the **Translator Add-in** to select and translate text directly within Word.

***Note***: 

- Before using my Add-in Translator, you must select a text paragraph, and the number of words in your selection **does not exceed 2000 words**.

- Remember to create a new terminal window and run the **backend** app. You can reload **backend** if there are any occurs related to the request from the add-in through HTTP.

### Demo

This section provides a step-by-step demonstration of how the MS Word Translator Add-in works. You will see how to launch the add-in, select a text for translation, choose the source and target languages, and view the translated result directly within Microsoft Word.

https://github.com/user-attachments/assets/bb8dddce-0419-4b15-84bf-47cfe198bd35

## Google Docs Add-on

The **Google Docs Translator Add-on** is a tool I developed to integrate translation capabilities directly into Google Docs. With this add-on, users can translate selected text without leaving their document, improving workflow efficiency and eliminating the need to switch between different translation services.

In the following sections, I will guide you through setting up, using, and making the most of the **Google Docs Translator Add-on**.

### Setup environment

To set up the **Google Docs Translator Add-on**, follow these steps:

1. **Open Google Docs and Select a Document**

Start by opening **Google Docs** in your browser and selecting a document where you want to use the add-on.

2. **Access Google Apps Script**

In the **taskbar**, go to `Extensions → Apps Script`. This will open the **Google Apps Script editor**, where you can add and manage scripts for your document.

3. **Create Required Files**

Inside the Apps Script editor, create **three files**:

- `Code.gs`

- `LanguageSelector.html`

- `TranslationReview.html`

Then, navigate to the `GGDocs` folder inside the `frontend` directory of the project and copy the corresponding content from the files in `GGDocs` into their respective files in the **Apps Script editor**. Once done, go back to `Code.gs`, save the changes and click `Run` to execute the script.

4. **Allow Permissions**

After running the script, Google will prompt you to **grant permissions** for the script to access your document. If you see a warning message saying `Google hasn't verified this app`, click `Advanced` and select `Go to <Your App Name> (unsafe)`, then confirm the permissions to allow the script to function properly.

5. **Set Up ngrok for Backend Connection**

To expose your local backend to Google Apps Script, follow these steps:

- Navigate to the root directory of your project and run `ngrok.exe`.

- In the terminal, enter `ngrok http 8000`. Previously, you need an ngrok account to authenticate and access your tunnel, visit [ngrok's official website](https://ngrok.com/) to create an account if you haven’t already.

6. **Update API URL in Code.gs**

After running ngrok, look for the **Forwarding URL** that ends in `.app`, for example `https://1efe-2001-ee0-4f05-b720-b4a1-d8b9-e76b-b439.ngrok-free.app`, copy it and go back to the `Code.gs` file in the **Google App Scripts**, locate the function `callTranslationAPI`, then replace the `apiUrl` variable with the ngrok URL followed by `/translate`:

```javascript
let apiUrl = "https://1efe-2001-ee0-4f05-b720-b4a1-d8b9-e76b-b439.ngrok-free.app/translate";
```

Finally, save the changes and click `Run` again to apply the update.

### How to use

Once the setup is complete, you will see a `Translator` option appear in the taskbar of Google Docs. To use the add-on, highlight any text in your document that you want to translate (must not exceed 2000 words), click `Translator → Translate Selection` and the add-on will process the selected text and display the translated result within the document. Your **Google Docs Translator Add-on** is now fully functional, allowing you to translate text seamlessly without leaving the document!

Remember to create a new terminal window and run the **backend** app before using the add-on. You can reload **backend** if there are any occurs related to the request from the add-in through HTTP.

### Demo

This section provides a demonstration of how the Google Docs Translator Add-on works in action. You'll see how to select text, trigger the translation process, and review the translated output within your document.

https://github.com/user-attachments/assets/0b40471c-1290-4012-9098-c062c82c57f2
