# Goal

This section defines the purpose and guiding principles for the application’s service layer. Each service module:

- "Serves as a container, wrapper and adapter" for high level features.
- Principles or UI embedding and infrasctructure shouldn't be used here.

## Principles:

1. **Meaningful Responsibilities**  
   - Only create a service when it has a clear, necessary role within the domain.  
   - Each service should have a **single responsibility**. If you need more complexity, compose multiple simple services into a higher‑level orchestrator.

2. **Scalability by Design**  
   - Services **must** be scalable.  
   - If a service cannot handle increased load or feature growth, it should be refactored before it becomes a bottleneck.

3. **Simplicity and Explicitness**
    - Service's API should be explicit and well documented.
    - Any complex service must be modular and well encapsulated, complying about SOLID principles.