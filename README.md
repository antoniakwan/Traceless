/-
CougHacks 25.

*Obfuscator.*
1. Generate digital footprints for users. Either possible in a stateless environment [e.g. Instagram]
   or more broadly vis a vis browsing.


A website.
1. You upload something.
2. Reject invalid file extensions.
3. Use one canonical file format. [JPG]?
4. What do we do? Obfuscate image metadata.
   I.E. Remove stored data (or) Replace it with random stuff.
5. Then output image?



*Fully sandboxed browser*
1. Incognito mode, but real. Run a virtual browser?


*Tor-like browser*.
1. Implement a onion routing browser or system.

*Instagram Privacy Advisor*.
1. Frontend.
   Website which allows users to link their Instagram accounts and subsequently make a post.
2. Backend.
   1. Runs through the posts on an Instagram account and analyzes them for potential privacy violations.
   2. Given a post, analyzes it for potential privacy violations, then posts it.
3. Analysis.
   AI (LLaMa wrapper) (yes, I am sad). Run post data, including image, caption, and optional location
   through AI asking it to identify salient potential privacy violations.
4. Future development direction.
   1. Integrate tools to modify posts immediately within the web UI (integrate photoshop-like API).


*Create *
-/

def main : IO Unit :=
   .println "Hello World"

namespace here
inductive List (α : Type) : Type :=
   | nil
   | cons (a : α) (ℓ : List α)

end here
