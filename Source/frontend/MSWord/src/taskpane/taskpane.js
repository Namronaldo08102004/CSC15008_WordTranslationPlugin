Office.onReady((info) => {
  console.log("Office is ready"); // Kiểm tra khi Office add-in được khởi tạo

  if (info.host === Office.HostType.Word) {
    console.log("Add-in is running in Word");

    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";

    // Gán hàm vào window để gọi từ HTML
    window.translate_text = translate_text;
    console.log("translate_text function has been assigned to window");

    document.getElementById("translate-btn").onclick = translate_text;
    console.log("translate-btn onclick handler is set");
  } else {
    console.log("This add-in is not running in Word");
  }
});

async function translate_text() {
  console.log("translate_text() called"); // Kiểm tra xem hàm có được gọi hay không

  let selection = document.getElementById("inputText").value;
  let sourceLang = document.getElementById("sourceLang").value;
  let targetLang = document.getElementById("targetLang").value;

  console.log("Input text:", selection);
  console.log("Source language:", sourceLang);
  console.log("Target language:", targetLang);

  try {
    let response = await fetch("http://127.0.0.1:8000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: selection,
        source_lang: sourceLang,
        target_lang: targetLang
      })
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error("Translation service error");
    }

    let data = await response.json();
    console.log("Translation result:", data);

    document.getElementById("outputText").innerText = data.translated_text;
  } catch (error) {
    console.error("Error during translation:", error);
    document.getElementById("outputText").innerText = "Translation failed. Please try again.";
  }
}