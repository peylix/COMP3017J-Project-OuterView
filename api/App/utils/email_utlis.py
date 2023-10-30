import random
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_verif_email(sender: str, sender_passcode: str, recipient: str, verif_code: str):
    s = smtplib.SMTP("smtp.office365.com", 587)
    s.starttls()
    s.login(sender, sender_passcode)

    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = "[Outerview] Your Verification Code"

    message = "Hi there!\n \nWelcome to use the Outerview platform. You are creating an account.\n \nHere is you verification code: " + verif_code + ".\n \nSincerely, \nOuterview Team \nCOMP3017 Project"

    msg.attach(MIMEText(message, 'plain'))

    s.send_message(msg)

    del msg

    s.quit()

def generate_random_verif_code():
    return str(random.randint(100001, 999999))