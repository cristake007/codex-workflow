# Language-Independent Engineering Constitution

## Objective

Control complexity, make intent obvious, and make future changes safe.

## Understand and Design

1. **Solve the real current problem.** Do not design for imagined future requirements without evidence.
2. **Define the problem before coding.** Establish requirements, constraints, failure cases, and non-goals.
3. **Model the domain before the file structure.** Identify concepts, rules, states, and relationships before choosing classes or modules.
4. **Give every business rule one authoritative owner.** Avoid duplicated or competing implementations of the same policy.
5. **Separate domain policy from technical mechanisms.** Keep business rules independent from databases, frameworks, interfaces, and external services.

## Structure the Code

6. **Give each component one clear responsibility.** A component should have one primary reason to change.
7. **Keep related behavior together and unrelated behavior independent.** Prefer high cohesion and low coupling.
8. **Choose the simplest correct and maintainable design.** Complexity requires a concrete benefit.
9. **Prefer explicit behavior over hidden conventions or cleverness.** Readers should be able to predict what the code does.
10. **Use the smallest useful abstraction or interface.** Do not expose or generalize more than current consumers need.

## Reuse and Locality

11. **Inspect before replacing.** Reuse existing code only when doing so reduces complexity and preserves clear ownership.
12. **Remove duplication of knowledge, not visual similarity.** Similar lines may represent different concepts; one rule implemented in several places is real duplication.
13. **Abstract only after the shared concept is understood.** Premature abstraction hides differences and makes change harder.
14. **Keep scope narrow and details local.** Introduce variables, helpers, and implementation details close to where they are used.
15. **Use names that explain purpose.** Names should communicate domain meaning and responsibility, not incidental implementation mechanics.

## Make Failure Safe

16. **Validate at system boundaries.** Treat user input, files, networks, databases, and external services as untrusted boundaries.
17. **Make invalid states difficult or impossible to represent.** Prefer types, schemas, constructors, and invariants that prevent misuse.
18. **Handle errors deliberately.** Never silently discard unexpected failure; recover, translate, propagate, or report it intentionally.
19. **Control side effects and make state changes visible.** Keep mutation, I/O, transactions, and external calls explicit and reviewable.
20. **Test important behavior.** Cover business invariants, edge cases, failure paths, and compatibility contracts rather than implementation trivia.

## Prime Directive

Leave the system easier to understand and safer to change than it was before the work.

Prefer small, reviewable changes over broad rewrites. Language conventions, the project's established patterns, and its functional source of truth take precedence over a general preference when they conflict for a valid reason.
