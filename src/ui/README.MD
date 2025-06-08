# Goal

This section should provide the human-machine interface, this implementation will follow three main design principle:

## Principles

1. **Less Is More**
    - The UI **must** be minimalist, avoiding unnecessary distractions and information overload.  
    - Minimalism **should** never compromise functionality: all tools needed by the user **must** be present.

2. **Simplicity Over Complexity**
    - The gui should be easy and intuitive to use.
    - Ergonomic layouts and straightforward workflows **should** be preferred to feature‑crammed designs.

3. **Human‑Centric by Design**
   - The interface **must** prioritize user emotions, accessibility, and feedback.  
   - The system and code **should** adapt to human needs, not the other way around.

> **Note:** For ease of implementation and maintainability, this layer is structured as Model–View–Controller (MVC).

## Dev style rules:

- CSS id must away start with capitalized letters, but classes shouldn't
- Semanticalization of html containers should be preserved
- All global style modifications should be developed in global.css, never in local styles {page}.css
- Aways prefer use simple queries like direct classes access over complex queries like "div.{someId}.{someClass}.{someContainer}", otherwise, just create an specific class to this container.
- Here the JavaScript should only and just manager UI and API. All logical services or implementations should be done over Arc or App.