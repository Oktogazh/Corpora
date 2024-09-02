#flow
depends on: [[User lifecycle]]

# scope
Allow users with a username to create segments (=post) in one of their own corpus (in firestore, the segment are docs in a "segments" subcollection of the corpus document, which is in "corpora" subcollection of the user's document: users>corpora>segments\[>translations]).
The post must be short (<201 characters) and contain a tag which is an ISO 369 code of the language used in the post (from the browser settings).
The posts should show up in the home page.
# tasks
1. create posts
	1. make a form with a segment and a language tag fields
		1. Make the language field with mocked values
		2. 
	2. Publish the post
		1. create the corpus if it does not exist, add a timestamp
		2. set the segment document which, add a timestamp
		3. set rules: the segment can be created or deleted, but not updated
2. Keep track of the posts
	1. reset the lastUpdated and lastActivity field of the corpus
	2. when the corpus is updated, set merge the reference to it in the language collection, then update automatically the lastUpdated field of the language
3. Show the posts in a 'global activity' section
	1. Fetch the languages ordered by lastUpdated: -1
	2. display segment in a box showing the language and the corpus (ie. user) it originates from
4. load the corpora in the language collection relating the browser settings
5. when clicking on a corpus, list all its segments in a dedicated page