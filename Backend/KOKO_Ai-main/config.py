import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the base directory (same as this file)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Path to your dataset
INSTANCES_PATH = os.path.join(BASE_DIR, "Instances.json")

# Get Cohere API Key from .env
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
