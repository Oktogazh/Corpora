#flow
depends on: [[language tagging component]]

# scope
Allow users with a username to create segments (=post) in one of their own corpus (in firestore, users>corpora>segments\[>translations]).
The post must be short (<201 characters) and contain a tag which is an ISO 369 code of the language used in the post (from the browser settings).
The posts should show up in the home page.
# tasks
1. create posts
	1. make a form with a segment between 1 and 200 characters and a language tag fields
	2. Publish the post
		1. Make a callable function that does the following:
			1. normalize the the language tags (zh -> cmn/ zh-yue -> yue)
				1. if language tag is found, use the preferred value
				2. if not found, remove the last subtag
		2. create the corpus if it does not exist, add a timestamp
		3. set the segment document which, add a timestamp
		4. set rules: the segment can be created or deleted, but not updated
2. Keep track of the posts
	1. reset the lastUpdated and lastActivity field of the corpus
	2. when the corpus is updated, set merge the reference to it in the language collection, then update automatically the lastUpdated field of the language
3. Show the posts in a 'global activity' section
	1. Fetch the languages ordered by lastUpdated: -1
	2. display segment in a box showing the language and the corpus (ie. user) it originates from
4. when clicking on a corpus, list all its segments in a dedicated page