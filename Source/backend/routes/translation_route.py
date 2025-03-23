from fastapi import APIRouter
from schemas.translation_schema import TranslationRequest, TranslationResponse
from models.translator import translate_text

router = APIRouter(prefix = "/translate", tags = ["Translation"])

@router.post("/")
def translate(request: TranslationRequest) -> TranslationResponse:
    translated_text = translate_text(request.text, request.source_lang, request.target_lang, request.model_name, request.temperature)
    return TranslationResponse(original_text = request.text, translated_text = translated_text)