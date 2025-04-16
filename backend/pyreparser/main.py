import time
import datetime
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
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
    contents = await file.read()

    # Save the uploaded file temporarily
    with open("temp_resume_file", "wb") as temp_file:
        temp_file.write(contents)

    # Reopen the saved file in binary mode to pass into ResumeParser
    resume = ResumeParser("temp_resume_file", skills_file="skills.csv")
    resume_data = resume.get_extracted_data()
    resume_data['text'] = contents.decode('utf-8', errors='ignore')
    predicted_role = predict_role(resume_data)
    resume_data['predicted_role'] = predicted_role

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

    # Clean up the temporary file
    os.remove("temp_resume_file")

    ts = time.time()
    cur_date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
    cur_time = datetime.datetime.fromtimestamp(ts).strftime('%H:%M:%S')
    timestamp = str(cur_date + '_' + cur_time)

    return resume_data
