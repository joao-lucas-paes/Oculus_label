# Goal

This section defines the purpose and guiding principles for the Architecture layer. Each service module:

- "Implements low level features" of any service or domain (e.g., `FileSystem interface`, `SQL interface`).
- "Wrapper of APIs", this components should comply about the necessity of application and be the easy interface and scope.

## Principles:

1. **All modules should implement only one interface**
    - An module do one task required by application, well defined and delimited.
    - An module can require other interfaces, but never be an multiple interface.

2. **All interface should be easy to use and convenient**
    - An interface should be more convenient to use than the raw api structure, otherwise, would be more simply to use.

3. **An interface should be a mistery for who's using**
    - Where an interface be used wouldn't be necessary know about the way that this was done, so, optmizations and how this is working only rules about the own interface, not about the module that uses this.
    - This doesn't mean that an interface can't rule over how this will be used, but all not direct and simply uses should be well documented.