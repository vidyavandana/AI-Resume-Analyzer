import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tempfile import NamedTemporaryFile
from .resume_parser import ResumeParser  # Import from your local file

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

video_recommendations = {
    "Data Scientist": "https://www.youtube.com/watch?v=YJZCUhxNCv8",
    "Web Developer": "https://www.youtube.com/watch?v=Zr6r3D8QTPY",
    "Android Developer": "https://www.youtube.com/watch?v=_XJ6QTlrE94",
    "UI/UX Designer": "https://www.youtube.com/watch?v=Q7AOvWpIVHU",
    "Software Engineer": "https://www.youtube.com/watch?v=pzK0sRJH08E",
    "Machine Learning Engineer": "https://www.youtube.com/watch?v=GxZrEKZfWmY"
}

def predict_role(skills):
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

@app.post("/parse-resume")
async def analyze_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.doc', '.docx')):
        raise HTTPException(status_code=400, detail="Invalid file type")

    try:
        # Temporarily store the uploaded file
        with NamedTemporaryFile(delete=False) as temp:
            temp.write(await file.read())
            temp_path = temp.name  # File path for ResumeParser

        # Initialize the ResumeParser with the temporary file path
        parser = ResumeParser(temp_path)
        data = parser.get_extracted_data()

        # Clean up the temporary file after parsing
        os.remove(temp_path)

        # Process extracted data and return it
        # Predict role from extracted skills
        skills = data.get("skills", [])
        predicted_role = predict_role(skills)
        video = video_recommendations.get(predicted_role, "No video available")

        # Return data including predictions
        return {
         "skills": skills,
         "score": data.get("score", 0),
         "improvements": data.get("improvements", []),
         "predicted_role": predicted_role,
         "video_recommendation": video,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
