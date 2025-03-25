Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
      document.getElementById("open-translate-dialog").onclick = handleTranslation;
      document.getElementById("confirm-lang").onclick = startTranslation;
      document.getElementById("retranslate-btn").onclick = retranslate;
      document.getElementById("accept-btn").onclick = acceptTranslation;
  }
});

let selectedText = "";

function showError(message) {
  const errorPopup = document.getElementById("error-popup");
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = message;
  errorPopup.style.display = "block";

  document.getElementById("close-error-btn").onclick = () => {
      errorPopup.style.display = "none";
  };
}

async function handleTranslation() {
  await Word.run(async (context) => {
      let selection = context.document.getSelection();
      selection.load("text");
      await context.sync();

      selectedText = selection.text;

      if (!selectedText.trim()) {
          showError("Please select text to translate.");
          return;
      }

      let wordCount = selectedText.split(/\s+/).length;
      console.log("Word count:", wordCount);

      if (wordCount > 2000) {
          showError("The selected text exceeds the 2000-word limit.");
          return;
      }

      // Hiển thị popup chọn ngôn ngữ
      document.getElementById("lang-modal").style.display = "block";
  });
}

async function startTranslation() {
  let sourceLang = document.getElementById("sourceLang").value;
  let targetLang = document.getElementById("targetLang").value;
  let modelName = document.getElementById("modelName").value;
  let temperature = parseFloat(document.getElementById("temperature").value);

  console.log("Source language:", sourceLang);
  console.log("Target language:", targetLang);
  console.log("Model name:", modelName);
  console.log("Temperature:", temperature);

  document.getElementById("lang-modal").style.display = "none";

  try {
      let response = await fetch("http://127.0.0.1:8000/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              text: selectedText,
              source_lang: sourceLang,
              target_lang: targetLang,
              model_name: modelName,
              temperature: temperature
          })
      });

      let data = await response.json();

      document.getElementById("originalText").value = selectedText;
      document.getElementById("translatedText").value = data.translated_text;

      document.getElementById("translation-modal").style.display = "block";
  } catch (error) {
      console.error("Error during translation:", error);
      alert("Translation failed. Please try again.");
  }
}

async function retranslate() {
  let sourceLang = document.getElementById("sourceLang").value;
  let targetLang = document.getElementById("targetLang").value;
  let modelName = document.getElementById("modelName").value;
  let temperature = parseFloat(document.getElementById("temperature").value);
  let newText = document.getElementById("originalText").value;

  try {
      let response = await fetch("http://127.0.0.1:8000/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              text: newText,
              source_lang: sourceLang,
              target_lang: targetLang,
              model_name: modelName,
              temperature: temperature
          })
      });

      let data = await response.json();
      document.getElementById("translatedText").value = data.translated_text;
  } catch (error) {
      console.error("Error during translation:", error);
      alert("Translation failed. Please try again.");
  }
}

async function acceptTranslation() {
  let newText = document.getElementById("translatedText").value;

  await Word.run(async (context) => {
      let selection = context.document.getSelection();
      selection.insertText(newText, Word.InsertLocation.replace);
      await context.sync();
  });

  document.getElementById("translation-modal").style.display = "none";
}