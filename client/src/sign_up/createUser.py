
import pyrebase

# setting up fireBase configuration
firebaseConfig = {
    "apiKey": "AIzaSyDciKy7izoCyjvNJ-alxZo6_q00iV_1Hzc",
    "authDomain": "test-project-8acc9.firebaseapp.com",
    "projectId": "test-project-8acc9",
    "databaseURL": "https://test-project-8acc9-default-rtdb.firebaseio.com",
    "storageBucket": "test-project-8acc9.appspot.com",
    "messagingSenderId": "935514793015",
    "appId": "1:935514793015:web:76c23aac4063c4b3014bb2",
    "measurementId": "G-R39NRBL29B"
}

# Initialize app - config 
fireBase = pyrebase.initialize_app(firebaseConfig)
db = fireBase.database()

# firebase hold or save data like Json file 
# define user input from the Front-End 
email = "TestingPassify@gmail.com"
phone = 6120987654
Id = 1234567899

# define data in Json Format 
data = {"email": email, "Phone": phone, "Id": id}

# single line to create user 
# Also this create hierarchy User > userId > email, id, phone
db.child("Users").child(data["Id"]).set(data)

## To do 
# check if user's email exist in the db
    # throw error messeage "user's email already exist"
#else send email to user and wait user to input passcode sent via email 
# if passcode == usersPasscode 
# then create user into the DB