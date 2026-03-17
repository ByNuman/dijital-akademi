import pdfplumber
import json
import os

pdf_files = {
    "calendar": "src/data/2025-2026-egitim-ogretim-yili-akademik-takvimi.pdf",
    "courses": "src/data/2025-2026-bahar-yariyili-li-sans-haftalik-ders-programi.pdf",
    "exams": "src/data/2025-2026-bahar-donemi-arasinav-sinav-programi.pdf"
}

os.makedirs("src/data/extracted", exist_ok=True)

for name, path in pdf_files.items():
    if not os.path.exists(path):
        print(f"File not found: {path}")
        continue
    
    text_content = ""
    table_content = []
    
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                text_content += text + "\n---\n"
                
            tables = page.extract_tables()
            for t in tables:
                table_content.append(t)
                
    with open(f"src/data/extracted/{name}_text.txt", "w", encoding="utf-8") as f:
        f.write(text_content)
        
    with open(f"src/data/extracted/{name}_tables.json", "w", encoding="utf-8") as f:
        json.dump(table_content, f, ensure_ascii=False, indent=2)

print("Extraction complete.")
