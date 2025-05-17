import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get the current directory
CURRENT_DIR = Path(__file__).parent.absolute()

# Path to the Instances.json file
INSTANCES_PATH = os.path.join(CURRENT_DIR, "Instances.json")

# Cohere API Key from environment variable
COHERE_API_KEY = os.getenv('COHERE_API_KEY')

if not COHERE_API_KEY:
    raise ValueError("Please set the COHERE_API_KEY environment variable. Get your API key from https://cohere.ai/")
