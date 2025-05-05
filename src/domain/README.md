# Goal

This section defines the purpose and guiding principles for the domain layer. Each service module:

- "Implements bussines rules" in the exactly way that this was projected.
- "Remains independent" from application, infrastructure, and presentation concerns.

## Principles:

1. **more is bad, less is bad**.
    - Domain logic **must** implement only the agreed business rules.  
    - Feature creep **should** be avoided: new rules require team discussion and approval.  
    - Missing rules **must** be added; both over‑engineering and under‑implementation are harmful.

2. **Entities and Usecases are not the same** 
    - Use Cases **must not** contain entity implementation details; Entities **must not** depend on Use Cases.
    - The UseCases are the strutcure of all rules (e.g., `CreateOrder`, `CalculateDiscount`).
    - The entities should be the agents (e.g., `User`, `Order`).

3. **Pure and Framework‑Agnostic Code**  
   - Domain modules **must** have **no** dependencies on external frameworks, databases, or UI libraries.  
   - This ensures easy unit testing and long‑term maintainability.