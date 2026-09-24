import os
from dotenv import load_dotenv

load_dotenv()


HF_TOKEN = os.getenv("HF_TOKEN")
MONGODB_URI = os.getenv("MONGODB_URI")