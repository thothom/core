# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 0000-00-00

### Added

- `SubEntity` decorator
- `CountColumn` decorator
- `EntityType` type
- [BC] `close` method to `Connection`

### Changed

### Fixed

- `getGlobalConnection` return type (add dynamic return type)
- `setGlobalConnection` param type (add dynamic param type)

### Removed

- [BC] `isSubEntity` option from `@Entity`

## [0.0.26] - 2021-11-04

### Added

- Tests to check if the entities of `EntityManager` are being loaded

### Changed

- Make `entities` of `EntityManager` public

### Fixed

- `getGlobalRepository` type
- `glob` import type
- `loadEntities` type (entitiesDir may be undefined)

### Removed

## [0.0.25] - 2021-10-26

### Added

### Changed

- Change `glob` to `tiny-glob` because of problems with types

### Removed

## [0.0.21] - 2021-10-26

### Added

- `enumName` to `ColumnMetadata`

### Changed

- Update dependencies: `eslint`, `lint-staged`, `@techmmunity/utils`
- Change properties accessibility of `Connection`:
  - `protected options` -> `public options`
  - `protected entityManager` -> `public entityManager`
  - `protected logger` -> `public logger`
- Change properties accessibility of `Repository`:
  - `protected tableName` -> `public tableName`

### Removed
