import os
from oauth2client.service_account import ServiceAccountCredentials
from dotenv import load_dotenv
import gspread

load_dotenv()

def get_worksheet(sheet_name):
    sheet_url = os.getenv(sheet_name)
    creds_path = "./msit.json"
    credential = ServiceAccountCredentials.from_json_keyfile_name(creds_path,
                                                              ["https://spreadsheets.google.com/feeds",
                                                               "https://www.googleapis.com/auth/spreadsheets",
                                                               "https://www.googleapis.com/auth/drive.file",
                                                               "https://www.googleapis.com/auth/drive"])
    client = gspread.authorize(credential)
    sheet = client.open_by_url(sheet_url)
    worksheet = sheet.get_worksheet(0)
    return worksheet

