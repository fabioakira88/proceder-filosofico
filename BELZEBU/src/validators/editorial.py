from __future__ import annotations

from typing import Any


def validate_generated_package(package: dict[str, Any]) -> None:
    article = package.get("article")
    seo = package.get("seo")
    faq = package.get("faq")
    image_prompt = package.get("image_prompt")

    if not isinstance(article, dict):
        raise ValueError("article.json ausente ou invalido.")
    if not article.get("title"):
        raise ValueError("article.title e obrigatorio.")
    if not article.get("body_markdown"):
        raise ValueError("article.body_markdown e obrigatorio.")
    if len(article["body_markdown"].split()) < 600:
        raise ValueError("article.body_markdown precisa ter pelo menos 600 palavras.")
    if not article.get("h2_structure"):
        raise ValueError("article.h2_structure e obrigatorio.")

    if not isinstance(seo, dict):
        raise ValueError("seo.json ausente ou invalido.")
    for field in ["meta_title", "meta_description", "focus_keyword"]:
        if not seo.get(field):
            raise ValueError(f"seo.{field} e obrigatorio.")

    if not isinstance(faq, dict):
        raise ValueError("faq.json ausente ou invalido.")
    questions = faq.get("questions")
    if not isinstance(questions, list) or len(questions) < 5:
        raise ValueError("faq.questions precisa ter pelo menos 5 perguntas.")

    if not isinstance(image_prompt, dict):
        raise ValueError("image-prompt.json ausente ou invalido.")
    for field in ["og_prompt", "instagram_prompt", "visual_direction", "palette", "style"]:
        if not image_prompt.get(field):
            raise ValueError(f"image_prompt.{field} e obrigatorio.")
