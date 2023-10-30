# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]

### Added
### Changed
### Fixed
### Deprecated


## [4.0.2] - 2023-10-30

### Fixed
- using escape sequences (multitudes of \) no longer causes an infinite loop


## [4.0.1] - 2023-10-17

### Changed
- updated dependencies


## [4.0.0] - 2022-08-24

### Added
- support for escaped pipe characters as cell value (`\\|`)
- support for bordered tables (leading and/or trailing cell separator (`|`))
- support for value alignment indicators in the header divider row (`:--`, `:--:`, `--:`)

### Changed
- BREAKING: Removed the default export
- BREAKING: The support for the bordered table syntax is a breaking change as one could actively rely on the prior side effect of having a key named `'undefined'` with the value `undefined` (unlikely but still breaking)
- Returned records are now based on `Object.create(null)` instead of `{}`, this does not change behavior but does change the prototype chain (unlikely to be used that way, but possible)

### Fixed
### Deprecated


## [3.0.2] - 2022-08-22

### Added
- Support for return type definition
- mapper to create a table parser which maps the returned properties

### Changed
- Updated dependencies


## [3.0.1] - 2021-01-01

### Changed
- Internal type usage

## [3.0.0] - 2020-12-30

### Changed
- The package was rewritten to Typescript, this means the import/require mechanics have changed


## [2.0.0] - 2019-01-03

### Fixed
- Empty cells are now represented as undefined
- Cells with mixed content (e.g. string and variable, or multiple variables) are now always represented as string


## [1.0.2 - 1.0.4] - 2018-12-24

### Fixed
- documentation
- package.json repository links


## [1.0.1] - 2018-12-24

### Fixed
- main script entry was named wrong
- license was missing


## [1.0.0] - 2018-12-24
- Initial release


[unreleased]: https://github.com/rspieker/template-literal-table/compare/v4.0.2...HEAD
[4.0.2]: https://github.com/rspieker/template-literal-table/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/rspieker/template-literal-table/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/rspieker/template-literal-table/compare/v3.0.2...v4.0.0
[3.0.2]: https://github.com/rspieker/template-literal-table/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/rspieker/template-literal-table/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/rspieker/template-literal-table/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/rspieker/template-literal-table/compare/v1.0.4...v2.0.0
[1.0.2 - 1.0.4]: https://github.com/rspieker/template-literal-table/compare/v1.0.1...v1.0.4
[1.0.1]: https://github.com/rspieker/template-literal-table/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/rspieker/template-literal-table/releases/tag/v1.0.0