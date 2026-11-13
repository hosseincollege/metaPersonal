# Lesson data style

- Lesson files are JavaScript modules, not JSON.
- Write object property keys without quotes whenever they are valid JavaScript identifiers, including nested lesson data (for example `section`, `topics`, `title`, `content`, `subtopics`, and `details`).
- Keep quotes around string values. Do not change lesson content merely to change key formatting.
- Apply this style consistently to every object key in a lesson file being edited.
- Number top-level topic titles sequentially when the lesson uses numbered parts.
- Do not add manual numbering to subtopic or detail titles; the application numbers those levels automatically.
