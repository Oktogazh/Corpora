# test Google and password based account flow
1. if it exists, connect to and delete account B (this will fails if the account is not created)
2. connect to an account A with google
3. create an account B with email and password
   1. fails because it uses the same email as with google
   2. use a new email and fails because it uses the same username
   3. change username and succeed to sign up
   4. fails to change username of the account because it is the same as A 
4. change username of the google account A
5. succeed to change the username of the account B
6. fail to change the username of A back the one taken by B
7. change B and A usernames back to there original values
