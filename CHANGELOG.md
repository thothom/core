# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 0000-00-00

### Added

### Changed

### Fixed

### Removed

### Dependencies

## [0.0.1] - 2022-06-30

### Added

### Changed

- Package name to `ThothOM`, `@thothom/core`

### Fixed

### Removed

### Dependencies

## [@techmmunity/symbiosis@0.0.31] - 2022-02-12

### Added

### Changed

- [BC] Return of all repository methods.
  - Instead of returning directly the data, will return a object with a `data` property, so it can return more data

### Fixed

### Removed

### Dependencies

## [@techmmunity/symbiosis@0.0.30] - 2021-12-25

### Added

### Changed

### Fixed

### Removed

- All relational support

### Dependencies

- Update TypeScript to 4.5.4

## [@techmmunity/symbiosis@0.0.29] - 2021-12-05

### Added

- [BC] `validate` method to `BaseConnection`
  - Will be used to validate connection data
  - Ex: If mongodb plugin, validate if all entities have only one primary column, and it's name is `_id`
- `@OneToOne` decorator
- `@OneToMany` decorator
- `@ManyToOne` decorator
- [BC] Support for relations at `save` and `insert` methods
  - `beforeSave` and `beforeInsert` will now **always** return an `data` array, and a new prop `returnArray` to tell the devs of plugins / core if they should return an array to the final user or not
- `beforeInsert`, `beforeSave`, `beforeUpdate` and `beforeUpsert` return formatted relations data in a new prop `relations`

### Changed

- [BC] `save` and `insert` doesn't need the extra type info anymore
  - `.save<Array<Entity>>([data])` -> `.save([data])`
  - `.save<Entity>(data)` -> `.save(data)`
  - `.insert<Array<Entity>>([data])` -> `.insert([data])`
  - `.insert<Entity>(data)` -> `.insert(data)`
- [BC] Standardize `upsert` and `update` returns
  - Will now only return **arrays**
- [BC] Update `connect` method to return `this` instead `void`
  - This way users can chain the methods
  - Ex: `const connection = await new Connection().load().connect()`
- [Internal] Update `options` to completely remove `entities` and `entitiesDir`
- Now loads both `entities` and `entitiesDir` options, so both can be used at the same time
- [BC] Update extra metadata to allow infinite extra metadata
  - Now the extra metadata is one unique object, and it's properties are used to get the types
- [Internal] after* And before* Methods Location
  - Will make it easier to use a unique function to convert data, and handle relations
- Allow functions to be passed as strategy on `PrimaryGeneratedColumn` decorator

### Fixed

- `metadataKey` type of `DefineEntityMetadataParams` and `GetEntityMetadataParams`
- [BC] `before*` and `after*` methods returns type of `Repository` class
- Only validates if the plugin is installed on cli calls
  - The validation cold stay there, but in minified apps, it's impossible to validate if the plugin is installed, so it's better to only validate on CLI calls.

### Removed

### Dependencies

- Bump @vercel/ncc from 0.31.1 to 0.33.0
- Bump jest from 27.3.1 to 27.4.3
- Bump lint-staged from 12.0.2 to 12.1.2
- Bump @techmmunity/utils from 1.8.1 to 1.9.1
- Bump prettier from 2.4.1 to 2.5.1
- Bump eslint from 8.2.0 to 8.4.0
- Bump @types/uuid from 8.3.1 to 8.3.3
- Bump @types/jest from 27.0.2 to 27.0.3

## [@techmmunity/symbiosis@0.0.28] - 2021-11-16

### Added

### Changed

### Fixed

- Type `FindConditions`, now sub-entities also accept FindOperators.
- [BC] `getGlobalRepository` return type
  - Now receives a `Repository` as type, instead an `Entity`
  - Ex: `getGlobalRepository<Entity>(Entity)` -> `getGlobalRepository<EntityRepository>(Entity)`

### Removed

## [@techmmunity/symbiosis@0.0.27] - 2021-11-12

### Added

- `SubEntity` decorator
- `CountColumn` decorator
- `EntityType` type
- `runBeforeUpsert` and `runAfterUpsert` types
- [BC] `close` method to `Connection`

### Changed

- `save` database event is now `insert`
- `runBeforeSave` -> `runBeforeInsert`
- `runAfterSave` -> `runAfterInsert`
- [BC] `SaveDateColumn` -> `InsertDateColumn`

### Fixed

- `getGlobalConnection` return type (add dynamic return type)
- `setGlobalConnection` param type (add dynamic param type)

### Removed

- [BC] `isSubEntity` option from `@Entity` (replaced by `@SubEntity()`)

## [@techmmunity/symbiosis@0.0.26] - 2021-11-04

### Added

- Tests to check if the entities of `EntityManager` are being loaded

### Changed

- Make `entities` of `EntityManager` public

### Fixed

- `getGlobalRepository` type
- `glob` import type
- `loadEntities` type (entitiesDir may be undefined)

### Removed

## [@techmmunity/symbiosis@0.0.25] - 2021-10-26

### Added

### Changed

- Change `glob` to `tiny-glob` because of problems with types

### Removed

## [@techmmunity/symbiosis@0.0.21] - 2021-10-26

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
