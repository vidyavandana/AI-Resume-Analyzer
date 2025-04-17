import time
import datetime
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, HTTPException
from tempfile import NamedTemporaryFile
from .resume_parser import ResumeParser

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

video_recommendations = {
    "Data Scientist": "https://www.youtube.com/watch?v=YJZCUhxNCv8",
    "Web Developer": "https://www.youtube.com/watch?v=Zr6r3D8QTPY",
    "Android Developer": "https://www.youtube.com/watch?v=_XJ6QTlrE94",
    "UI/UX Designer": "https://www.youtube.com/watch?v=Q7AOvWpIVHU",
    "Software Engineer": "https://www.youtube.com/watch?v=pzK0sRJH08E",
    "Machine Learning Engineer": "https://www.youtube.com/watch?v=GxZrEKZfWmY"
}

@app.post("/parse-resume")
async def analyze_resume(file: UploadFile = File(...)):
    # Validate the file type
    if not file.filename.endswith(('.pdf', '.doc', '.docx')):
        raise HTTPException(status_code=400, detail="Invalid file type. Only .pdf, .doc, and .docx files are allowed.")

    # Save the uploaded file temporarily with a unique name
    try:
        with NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(await file.read())
            temp_filename = temp_file.name

        # Process the file with ResumeParser
        resume = ResumeParser(temp_filename, skills_file="skills.csv")
        resume_data = resume.get_extracted_data()
        resume_data['text'] = open(temp_filename, 'r', errors='ignore').read()  # Read the resume content for analysis
        predicted_role = predict_role(resume_data)
        resume_data['predicted_role'] = predicted_role

        # Scoring the resume sections
        resume_text = resume_data.get('text', '').lower()
        improvements = []
        resume_score = 0

        section_scores = {
            'objective': 6,
            'education': 12,
            'experience': 16,
            'internships': 6,
            'skills': 7,
            'hobbies': 4,
            'interests': 5,
            'achievements': 13,
            'certifications': 12,
            'projects': 19,
        }

        section_keywords = {
            'objective': ['objective', 'summary'],
            'education': ['education', 'school', 'college'],
            'experience': ['experience'],
            'internships': ['internship', 'internships'],
            'skills': ['skills', 'skill'],
            'hobbies': ['hobbies'],
            'interests': ['interests'],
            'achievements': ['achievements'],
            'certifications': ['certifications', 'certification'],
            'projects': ['projects', 'project'],
        }

        for section, keywords in section_keywords.items():
            if any(keyword in resume_text for keyword in keywords):
                resume_score += section_scores[section]
            else:
                improvements.append(f"Please consider adding your {section} section to enhance your resume.")

        resume_data['score'] = resume_score
        resume_data['improvements'] = improvements
        resume_data['video_recommendation'] = video_recommendations.get(predicted_role, "https://www.youtube.com/results?search_query=how+to+make+a+resume")

        # Return resume data
        return resume_data

    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing the resume: " + str(e))

    finally:
        # Clean up the temporary file
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

