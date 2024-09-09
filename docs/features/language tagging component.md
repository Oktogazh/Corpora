#flow
depends on: [[User lifecycle]]

# scope
This feature aims to implement a variant of the [RCF5646](https://datatracker.ietf.org/doc/html/rfc5646) specification to tag accurately the different corpora.
The language labelling sends to a label page, which contains:
- a list of most recent strings translated in the language
- stats on languages translated from, translated to under this label
- several fields that can be preferred following the same system as posts:
	- a list of dialects labels, if the language is a dialect, a link to the "root" label is automatically added
	- name of the language in the language
	- description of the language in the language
	- when a description is preferred: publish it as a post
# tasks
1. language tags in a post or a corpus link to a language page
2. If the language has two letters, find its ISO 639-3 code [here](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes#br), to map it to a [glotolog](https://glottolog.org/resource/languoid/id/bret1244) language
	1. create a map of 639-1 languages to v3 and add it to the web app, 
		1. use the browser to prefetch the list of the glotolog languages of the user
	2. connect the language tagging system to glotolog's API
		1. Show all the dialects if a 639-3 maps to a macrolanguage
	3. When a language is added in a post, it is added as a priviledged language
	4. use the glotolog informations to show the language locale name
3. make a section that shows the latest activities in regarding this language
	1. Fetch all the corpora references in the language sub-collection
	2. copy-past the corpus reference component from the posting flow