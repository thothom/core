# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.2] - 2021-08-06

### Added

- Convert `Connection` from type to abstract class
- `Logger`
- `lint-staged`
- Custom error thrower (`CompassError`)
- Multiple connections
- SubEntities
- Prefix and Suffix aren't applied to sub-entities anymore
- `EntityManager.convertEntityToDatabase`: Method that converts an entity data to database data

### Changed

- Name of `MetadataManager` to `EntityManager`
- `EntityManager` now handles metadata from a different perspective
- `Connection` **type**, is now `Connection` **abstract class**
- Metadata now is saved at the entities, so it can be reused by multiple connections

### Fixed

### Removed

## [0.0.1] - 2021-07-31

### Added

- `@Entity` decorator
- `@Column` decorator
- `@PrimaryColumn` decorator
- `EntityMetadataEnum` enum
- `ColumnMetadataEnum` enum
- `Connection` type
- `Repository` type
- `formatNamingStrategy` function. It formats strings based on a target case (Ex: camel -> Pascal)
- `getColumnName` function. It gets and format a column name (add suffix, change case, etc)
- `getEntityName` function. It gets and format an entity name (add suffix, change case, etc
- `getColumnMetadata` function. It gets all the column's metadata
- `getEntityMetadata` function. It gets all the entity's metadata
- `isMetadataType` function. It returns a boolean, that tells if a value is a valid metadata type.
- `detectCase` function (Returns the string case (upper, camel, etc))
- `getGlue` function (Returns the "glue" to join some string case words (Ex: `kebab` -> `-`) )
- Added suffixes and prefixes (Ex: At code, something can have the name `columnName` and it will be add a suffix the database insertion (Ex: `suffixColumnName`), and removed at database item get)
- Added a way to convert string cases between database and code (Ex: At code, something can have the name `columnName` and it will be converted to `column_name` at the database insertion, and vice-versa)
- Add `MetadataManager`, to manage part of the metadata from a "global" scope

### Changed

### Removed
