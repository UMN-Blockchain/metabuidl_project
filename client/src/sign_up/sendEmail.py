# this class sends email 

SENDGRID_API_KEY = "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"
sendAPI = "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"

import os 
import string
import random
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


message = Mail(
    from_email = "passify@passify.com",
    to_emails = "AbdikarimFareh@gmail.com",
    subject = "Sending Testing Email", 
    html_content="<strong> Testing the body content with this infor </strong>" )
try: 
    sg = SendGridAPIClient(os.environ[SENDGRID_API_KEY])
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
except Exception as e: 
    print(e.message)


# Generate PassCode 
def passCodeGen(): 
    # abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
    strAndDigits = string.ascii_letters + string.digits
    return "".join(random.choice(strAndDigits) for x in range(3,27))

passCode = passCodeGen()

# To do, 
## let the html_content contain a randomly generated code 
## check if that passcode is the same before we create them into the database 



