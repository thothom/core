# To Do

- [x] Decide if the types of the arrays must be passed with or without []
  - Will be passed **without**
- [x] Add Suffix
- [x] Add Prefix
- [x] Add `extras` field to `@Entity` and all `@Column*` decorators
- [x] Add Error Thrower
  - [x] Export error thrower at `src/index.ts`
  - [x] Return errors at `src/decorators/column/helpers/get-type.ts`
- [x] Create a Logger
- [x] Join metadata manager to connection, so users can use multiple connections

  - Decorators stop using metadata manager and start using metadata again
  - [x] Review all of the files, to look how the things are being done and what have to be changed
  - The metadata manager is created by the connection
  - [ ] Update documentation

- [ ] Uncomment tests validation at `.github/workflows/publish.yml` and `jest.config.js`
- [ ] Add Tests
- [ ] Add pipeline step to check if mandatory files has changes
  - Maybe this action can be used: https://github.com/marketplace/actions/get-all-changed-files
  - Mandatory files: CHANGELOG.md, package.json
- [ ] Improve Documentation
  - Like [TypeORM docs](https://github.com/typeorm/typeorm#step-by-step-guide)
- [ ] Give a bit of love to `CONTRIBUTING.md`
- [ ] Add `@Index` decorator
- [ ] Add "migrations"
  - Add a way to generate "tables"
- Add entities auto-import from string path, like TypeORM
  - Use `process.cwd()` to get the root dir of the project
- Add auto-generated primary columns

## Discarded Ideas

- Add `@SubEntity` decorator
  - What if a entity be an entity and also a subEntity? This may cause a lot of bugs, so it's better think another way to handle this, with only one decorator
- Add `@SecondaryColumn` decorator (This will be used in cases like `DynamoDB - sortKey`)
  - `extras` field will be used
