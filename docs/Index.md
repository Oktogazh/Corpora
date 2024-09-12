The steps of development of the app are organised by flows, which designates a group of functions and data structures acting together in order to build a fully fledged feature, on the top of which, other flows can be designed. Thus, they should be developed in order, from the most depended on flow to the most dependent one.
In the chart below, dependence is indicated by the items order in the list called **features stack**.
A flow should be broken down into as many flows as possible for clarity sake and ease of testing and development scheduling (ie. rating system being broken into voting and Elo rating ones).

- [[Documentation flow]]
- [[CI CD pipeline and Testing]] 
- Features stack
	1. [[User lifecycle]]
	3. [[posting]]
	2. [[language tagging component]] (MVP)
	3. [[language pages]]
	4. [[Voting]]
	5. [[Elo rating]]
	6. [[Translating]]
	7. [[Interface translation]]
	8. [[automated translators integration]]
	9. [[Private DBs for data ownership]]

# [[Feature ideas]]

# Phases of development
Before creating the translation system, people should agree on the language tagging they use in their translation. As the tagging system is user-generated, linguistic communities should be established before the tagging system, which obviously comes before the translation system etc... This is why the posting flow development should precede the the tagging flow.

# TODOs 12/09
- Emulator to test functions
- Protect branches in github
- Edit the posting and tagging flows so it integrates **[ietf-language-tags](https://github.com/sozialhelden/ietf-language-tags)**
- edit postSegment function
- 