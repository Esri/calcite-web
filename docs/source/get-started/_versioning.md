Calcite-Web uses SemVer (Semantic Versioning) for its releases. This means that version numbers are basically formatted like `MAJOR.MINOR.PATCH`. If you're well acquainted with SemVer you should skip to 'Bumping the Version' below.

#### Major

Breaking changes are signified with a new **first** number. For example, moving from 1.0.0 to 2.0.0 implies breaking changes.

#### Minor

New components, new helper classes, or substantial visual changes to existing components and patterns are *minor releases*. These are signified by the second number changing. So from 1.1.2 to 1.2.0 there are minor changes.

#### Patches

The final number signifies patches such as fixing a pattern or component in a certain browser, or fixing an existing bug. Small changes to the documentation site and the tooling around the Calcite-Web library are also considered patches.

## Bumping the Version

1. Change the version number in `package.json` to the desired version number.
2. Write a description of the changes, additions, and bug fixes in `CHANGELOG.md`.
3. Make sure `Esri/calcite-web` is up-to-date with your changes.
5. Run `grunt release`. If prompted enter your GitHub credentials and your s3 access key/secret.

