# Sing-up Process 
# Get user input email, phoneNumber and Id.
# send email to ask verifcation code
# Once verfied, save their information to the database 


# Recover Mode 
# User is ask to provide their email.
# Upon providing their email, send email with a verification mode 


# CreateUser Class : 
* -> should have a constructor that takes three input
    * email, phone, id 
    * check if either of them is already in the db 
        * throw and exception if one of them exist
    * if none of them are in the db, send email verfication to the email 
      * the email should have a code that user needs to put in respond 
      * once the passcode is the same, 
      * Then create User in the db



