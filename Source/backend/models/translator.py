from utils.logger import Logger
import google.generativeai as genai
import re

LOGGER = Logger(__file__, log_file = "translation.log")

def clean(text: str):
    patterns = {
        r"\s+": " ",  # replace multiple spaces with a single space
        r"\"": "'",  # replace double quotes with single quotes to avoid JSON parsing error
    }
    text = text.strip()
    for pattern, repl in patterns.items():
        text = re.sub(pattern, repl, text)
    return text

def translate_text (text: str, source_lang: str, target_lang: str, model_name = "gemini-2.0-flash", temperature = 0.7):
    prompt = f"""
    You are a highly skilled translator.
    I will provide you with a piece of text along with information about its source language and the target language into which it should be translated. Your task is to translate the given text into the requested target language.

    The only rule I require you to follow is that you must provide the most accurate and faithful translation possible, without adding any extra information.

    Here is the text I need you to translate: {text}
    Please translate it from {source_lang} to {target_lang}.

    Respond in the following format:
    ---  
    O: (Original text to be translated)  
    T: (Translated text)  
    ---  
    """
    
    model = genai.GenerativeModel(model_name)
    
    response = model.generate_content(prompt, generation_config = {"temperature": temperature})
    response = response.text
    
    extracted_text = None
    for line in response.split("\n"):
        if line.startswith("T: "):
            extracted_text = clean(line[len("T: ") : ])
            break
    
    LOGGER.log_model(model_name, temperature)
    try:
        LOGGER.log_response(text, source_lang, extracted_text, target_lang)
    except Exception as e:
        print(f"❌ ERROR in logging response: {e}")
    
    return extracted_text