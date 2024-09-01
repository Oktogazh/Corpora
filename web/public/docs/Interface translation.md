#flow 
depends on: [[Translating]] 

# Scope
Enable users to collaborate on the translation of the app interface.

# jobs
1. through github actions, publish locale/en.json in the RTDB and update the "interface corpus" source collection in the firestore DB
	1. make the app fetch its local file from the RTDB instead of the en.json file
2. When a segment translation is accepted, load it into the RTDB locale section
3. When a corpus is translated enough, add the language to the list of the interface languages