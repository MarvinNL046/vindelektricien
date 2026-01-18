#!/usr/bin/env python3
"""
Test OpenAI API key
"""

import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv('.env.openai')

# Get API key
api_key = os.getenv('OPENAI_API_KEY')
print(f"API Key loaded: {api_key[:20]}...{api_key[-4:]}" if api_key else "No API key found!")

try:
    # Initialize OpenAI client
    client = OpenAI(api_key=api_key)
    
    # Test with a simple completion
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Say 'API key is working!' in Dutch"}
        ],
        max_tokens=50
    )
    
    print(f"✅ Success! Response: {response.choices[0].message.content}")
    
except Exception as e:
    print(f"❌ Error: {str(e)}")
    print("\nPlease check your API key at: https://platform.openai.com/api-keys")