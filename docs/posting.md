#flow
depends on: [[User lifecycle]]

# scope
Allow users with a username to create segments (=post) in one of their own corpus (in firestore, the segment are docs in a "segments" subcollection of the corpus document, which is in "corpora" subcollection of the user's document: users>corpora>segments\[>translations]).
The post must be short (<201 characters) and contain a tag which is an ISO 369 code of the language used in the post (from the browser settings).
The posts should show up in the home page.
# jobs
1. create the form
	1. add a "go to setting" toast when trying to post a segment without a username
	2. 