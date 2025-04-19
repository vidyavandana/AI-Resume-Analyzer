import pdfplumber
import spacy

class ResumeParser:
    def __init__(self, resume_path):
        self.resume_path = resume_path
        self.text = self.extract_text()
        self.doc = spacy.load("en_core_web_sm")(self.text)

    def extract_text(self):
        text = ""
        try:
            with pdfplumber.open(self.resume_path) as pdf:
                for page_num, page in enumerate(pdf.pages):
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                    else:
                        print(f"[Warning] Page {page_num + 1} has no extractable text.")
        except Exception as e:
            print("❌ Error extracting text from PDF:", e)
        return text.lower()

    def extract_skills(self):
        self.skills_keywords = [
            "python", "java", "c++", "html", "css", "javascript", "sql", "excel",
            "react", "node", "tensorflow", "keras", "pandas", "numpy", "machine learning",
            "deep learning", "data analysis", "android", "ux", "ui"
        ]
        found = []
        for token in self.doc:
            if token.text.lower() in self.skills_keywords:
                found.append(token.text.lower())
        return list(set(found))

    def calculate_score(self, extracted_skills):
        total_possible = len(self.skills_keywords)
        matched = len(extracted_skills)
        return int((matched / total_possible) * 100) if total_possible > 0 else 0

    def generate_improvements(self, extracted_skills):
        missing_skills = list(set(self.skills_keywords) - set(extracted_skills))
        suggestions = []
        if len(missing_skills) > 0:
            suggestions.append("Consider adding more relevant technical skills.")
            suggestions.append(f"Some commonly expected skills missing: {', '.join(missing_skills[:5])}")
        return suggestions

    def get_extracted_data(self):
        skills = self.extract_skills()
        score = self.calculate_score(skills)
        improvements = self.generate_improvements(skills)

        return {
            "skills": skills,
            "score": score,
            "improvements": improvements,
            "text": self.text
        }
