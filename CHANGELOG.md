# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 0000-00-00

### Added

### Changed

### Fixed

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
