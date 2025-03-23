async function translateText() 
{
    let selection = document.getElementById("inputText").value;
    let sourceLang = document.getElementById("sourceLang").value;
    let targetLang = document.getElementById("targetLang").value;

    let response = await fetch("http://127.0.0.1:8000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: selection, source_lang: sourceLang, target_lang: targetLang })
    });

    let data = await response.json();
    document.getElementById("outputText").innerText = data.translated_text;
}