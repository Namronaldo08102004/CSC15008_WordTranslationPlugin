function onOpen() {
    DocumentApp.getUi().createMenu('Translator')
        .addItem('Translate Selection', 'translateSelection')
        .addToUi();
}

function translateSelection() {
    let doc = DocumentApp.getActiveDocument();
    let selection = doc.getSelection();

    if (!selection) {
        DocumentApp.getUi().alert("Please select some text to translate.");
        return;
    }

    let selectedText = selection.getRangeElements().map(element => element.getElement().asText ? element.getElement().asText().getText() : '').join('');
    if (selectedText.split(/\s+/).length > 2000) {
        DocumentApp.getUi().alert("Selected text exceeds 2000 words. Please select a shorter text.");
        return;
    }

    showLanguageSelector();
}

function showLanguageSelector() {
    let html = HtmlService.createHtmlOutputFromFile('LanguageSelector')
        .setWidth(400)
        .setHeight(250);
    DocumentApp.getUi().showModalDialog(html, "Select Languages");
}

function showTranslationReview(sourceLang, targetLang, originalText, translatedText, modelName, temperature) {
    let template = HtmlService.createTemplateFromFile('TranslationReview');
    template.sourceLang = sourceLang;
    template.targetLang = targetLang;
    template.originalText = originalText;
    template.translatedText = translatedText;
    template.modelName = modelName;
    template.temperature = temperature;

    let html = template.evaluate()
        .setWidth(800)
        .setHeight(600);
    DocumentApp.getUi().showModalDialog(html, "Review Translation");
}


function processTranslation(sourceLang, targetLang, modelName, temperature) {
    let doc = DocumentApp.getActiveDocument();
    let selection = doc.getSelection();

    if (!selection) {
        DocumentApp.getUi().alert("Please select some text to translate.");
        return;
    }

    let originalText = selection.getRangeElements()
      .map(element => element.getElement().asText ? element.getElement().asText().getText() : '')
      .join('\n');

    let translatedText = callTranslationAPI(originalText, sourceLang, targetLang, modelName, temperature);

    // Kiểm tra kết quả dịch và hiển thị popup
    if (translatedText) {
        showTranslationReview(sourceLang, targetLang, originalText, translatedText, modelName, temperature);
    } else {
        DocumentApp.getUi().alert("Translation failed. Please try again.");
    }
}

function reTranslate(sourceLang, targetLang, originalText, modelName, temperature) {
    let translatedText = callTranslationAPI(originalText, sourceLang, targetLang, modelName, temperature);
    return translatedText;
}

function applyTranslation(translatedText) {
    let doc = DocumentApp.getActiveDocument();
    let selection = doc.getSelection();

    if (!selection) {
        DocumentApp.getUi().alert("Please select some text to translate.");
        return;
    }

    let elements = selection.getRangeElements();
    
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i].getElement();
        
        if (element.getType() === DocumentApp.ElementType.PARAGRAPH) {
            let paragraph = element.asParagraph();
            let textElement = paragraph.editAsText();

            // Lấy phần đầu của đoạn văn (giữ lại khoảng trắng hoặc tab nếu có)
            let originalText = textElement.getText();
            let leadingSpaces = originalText.match(/^(\s*)/)[0]; // Lấy các ký tự khoảng trắng đầu tiên

            // Tách nội dung dịch theo dòng
            let translatedLines = translatedText.split('\n');
            let translatedParagraph = translatedLines[i] ? leadingSpaces + translatedLines[i] : '';

            // Ghi đè nội dung mà vẫn giữ dấu tab
            textElement.setText(translatedParagraph);
        }
    }
}

function callTranslationAPI(text, sourceLang, targetLang, modelName, temperature) {
    let apiUrl = "https://1efe-2001-ee0-4f05-b720-b4a1-d8b9-e76b-b439.ngrok-free.app/translate";
    let payload = JSON.stringify({
        text: text,
        source_lang: sourceLang,
        target_lang: targetLang,
        model_name: modelName,
        temperature: temperature
    });

    Logger.log("Payload: " + payload);

    let options = {
        method: "post",
        contentType: "application/json",
        payload: payload,
        muteHttpExceptions: true
    };

    try {
        let response = UrlFetchApp.fetch(apiUrl, options);
        let responseText = response.getContentText();
        Logger.log("Response Text: " + responseText);
        let json = JSON.parse(responseText);

        if (response.getResponseCode() !== 200) {
            return "Translation error: " + (json.detail || "Unknown error");
        }

        return json.translated_text || "Translation failed";
    } catch (error) {
        return "API Error: " + error.message;
    }
}