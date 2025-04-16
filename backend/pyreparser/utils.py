import re
from pdfminer.high_level import extract_text as extract_pdf_text
import docx2txt

# Extract text from PDF or DOCX
def extract_text(file, extension):
    if extension == '.pdf':
        return extract_pdf_text(file)
    elif extension in ['.docx', '.doc']:
        return docx2txt.process(file)
    else:
        return ""

# Extract email using regex
def extract_email(text):
    email_pattern = re.compile(r'\b[\w.-]+?@\w+?\.\w+?\b')
    match = email_pattern.findall(text)
    return match[0] if match else None

# Extract mobile number using regex
def extract_mobile_number(text, custom_regex=None):
    if custom_regex:
        match = re.findall(custom_regex, text)
    else:
        match = re.findall(r'(\+?\d{10,13})', text)
    return match[0] if match else None

# Dummy function — implement with matcher if needed
def extract_name(nlp_doc, matcher):
    # You can improve this with spaCy's named entity matcher
    for ent in nlp_doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return None

# Dummy implementation — replace with your own logic
def extract_skills(nlp_doc, noun_chunks, skills_file=None):
    skills = []
    if skills_file:
        with open(skills_file, 'r') as file:
            known_skills = [line.strip().lower() for line in file.readlines()]
            tokens = [token.text.lower() for token in nlp_doc]
            skills = list(set(token for token in tokens if token in known_skills))
    return skills

# Dummy: Replace with actual NER model
def extract_entities_wih_custom_model(nlp_doc):
    entities = {}
    for ent in nlp_doc.ents:
        if ent.label_ not in entities:
            entities[ent.label_] = []
        entities[ent.label_].append(ent.text)
    return entities

# Dummy section extractor
def extract_entity_sections_grad(text):
    return {"education": "MIT", "experience": "2 years at Google"}

# Page counter (for PDF)
def get_number_of_pages(file):
    from PyPDF2 import PdfReader
    file.seek(0)  # Reset pointer
    reader = PdfReader(file)
    return len(reader.pages)
def predict_role(resume_data):
    skills = resume_data.get('skills', [])
    if not skills:
        return "Software Engineer"

    skill_map = {
        "data": "Data Scientist",
        "python": "Software Engineer",
        "html": "Web Developer",
        "android": "Android Developer",
        "ux": "UI/UX Designer",
        "machine": "Machine Learning Engineer",
    }

    for skill in skills:
        for keyword, role in skill_map.items():
            if keyword in skill.lower():
                return role

    return "Software Engineer"

