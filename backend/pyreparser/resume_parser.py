import os
import multiprocessing as mp
import io
import spacy
import pprint
from spacy.matcher import Matcher
from . import utils


class ResumeParser(object):

    def __init__(
        self,
        resume,
        skills_file=None,
        custom_regex=None
    ):
        nlp = spacy.load('en_core_web_sm')
        self.__skills_file = skills_file
        self.__custom_regex = custom_regex
        self.__matcher = Matcher(nlp.vocab)
        self.__details = {
            'name': None,
            'email': None,
            'mobile_number': None,
            'skills': None,
            'degree': None,
            'no_of_pages': None,
        }
        self.__resume = resume

        # Handle both file and in-memory byte stream
        if not isinstance(self.__resume, io.BytesIO):
            ext = os.path.splitext(self.__resume)[1].split('.')[1]
        else:
            ext = self.__resume.name.split('.')[-1]

        self.__text_raw = utils.extract_text(self.__resume, '.' + ext)
        self.__text = ' '.join(self.__text_raw.split())
        self.__nlp = nlp(self.__text)
        self.__noun_chunks = list(self.__nlp.noun_chunks)
        self.__get_basic_details()

    def get_extracted_data(self):
        return self.__details

    def __get_basic_details(self):
        name = utils.extract_name(self.__nlp, matcher=self.__matcher)
        email = utils.extract_email(self.__text)
        mobile = utils.extract_mobile_number(self.__text, self.__custom_regex)
        skills = utils.extract_skills(
            self.__nlp,
            self.__noun_chunks,
            self.__skills_file
        )

        # extract name
        self.__details['name'] = name

        # extract email
        self.__details['email'] = email

        # extract mobile number
        self.__details['mobile_number'] = mobile

        # extract skills
        self.__details['skills'] = skills

        # number of pages
        self.__details['no_of_pages'] = utils.get_number_of_pages(self.__resume)

        return


def resume_result_wrapper(resume):
    try:
        parser = ResumeParser(resume)
        return parser.get_extracted_data()
    except Exception as e:
        print(f"Error processing {resume}: {e}")
        return None


if __name__ == '__main__':
    resumes = []
    for root, directories, filenames in os.walk('resumes'):
        for filename in filenames:
            file = os.path.join(root, filename)
            resumes.append(file)

    with mp.Pool(mp.cpu_count()) as pool:
        results = pool.map(resume_result_wrapper, resumes)

    # Filter out None results (failed resume parsing)
    results = [result for result in results if result is not None]

    pprint.pprint(results)
