import os
from google import genai
from dotenv import load_dotenv
from PIL import Image
# API key loading and loading up Genmini
load_dotenv('key.env')
key=os.getenv('GENTOKEN')
client = genai.Client(api_key = key)
# Analyzation function, taking in an image path
def analyzeImage(img):
    #set the ai model and use the privacy checking prompt to analyze the image
    response = client.models.generate_content(
        model= "gemini-2.5-pro-exp-03-25",
        contents=["""I will send you an image along with this text.
Analize given Image, find privacy Red Flags such as:

Faces & People

Detect visible faces (especially the user's face)

Estimate age, gender, emotion (optional, but useful to flag emotional posts)

Detect presence of children (for extra sensitivity)

Recognize known celebrities/public figures (to flag unintended associations)

Location Clues

Street signs, building names, store logos

License plates (blur or flag)

Distinctive landmarks (e.g., Eiffel Tower, Times Square)

Geotags in EXIF metadata (if photo is uploaded directly)

Public transport signs or local events visible (e.g., subway, train station names)

Time Clues

Shadows / lighting that can hint time of day

Visible clocks, timestamps on screens

Seasonal indicators (snow, blossoms, holiday decorations)

Screen Content

Detect visible screens (laptops, phones, TVs)

Read text from screens (e.g., emails, messages, tabs)

Reflections

Check for mirrors, windows, or shiny surfaces that may reveal more than expected (e.g., the photographer, or a visible computer screen)

Clothing & Accessories

Branded items (workplace, school, sports teams)

Unique or uniform-like clothing (police, military, school uniforms)

Badges, lanyards, ID cards

Home/Interior Clues

House number, mailbox

Unique decor or layouts that could be recognizable to someone who knows you

Security system signs/stickers

Animals

Pets with tags showing names or phone numbers

Unique-looking pets that people might recognize

Documents & Paper

Any paper, mail, notebooks that might have names, addresses, barcodes

Watermarks or Metadata

App-generated watermarks (Snapchat, TikTok, etc.)

Image metadata (camera make/model, GPS, timestamps)

And many more things you can think of that may threat the privacy of the image owner when it is seen by public

Please only respond with a short list and summary of your concerns to warn the user
                  
In your response, don't include things like, \"Based on the image provided:\", \"Privacy Concerns Found:\", or anything else like that when you start your response. JUST GET STRAIGHT TO THE LIST.

In each response,  follow the form like \"1. [PRIVACY CONCERN HERE]: [Short Explaination here]\" 
And after the list, GO STRAIGHT INTO YOUR SUMMARY INSTEAD OF GOING LIKE: \"Summary:\"
Check your response carefully so it can be easily readable, and include all potential privacy concerns, or things in the pictures that may be unwanted but accidentally posted by user
                   
And do not include \"*\" or anything since readability is very important. This is supposed to be a tool on a website to help warn users pictures.""",Image.open(img)]
    )   
    return(response.text)

#just testing
print(analyzeImage("C:\\Users\\zhang\\Downloads\\10m.png"))

