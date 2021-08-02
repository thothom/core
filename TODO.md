# To Do

- [x] Decide if the types of the arrays must be passed with or without []
  - Will be passed **without**
- [x] Add Suffix
- [x] Add Prefix
- [ ] Add Error Thrower
  - [ ] Return errors at `src/decorators/column/helpers/get-type.ts`
  - [ ] Export error thrower at `src/index.ts`
- [ ] Add Tests
- [ ] Add `extra` field to `@Entity` and all `@Column*` decorators
  - This extra field will be used to define extra metadata
- [ ] Add pipeline step to check if mandatory files has changes
  - Maybe this action can be used: https://github.com/marketplace/actions/get-all-changed-files
  - Mandatory files: CHANGELOG.md, package.json
- [ ] Improve Documentation
  - Like [TypeORM docs](https://github.com/typeorm/typeorm#step-by-step-guide)
- [ ] Give a bit of love to `CONTRIBUTING.md`
- [ ] Add `@SecondaryColumn` decorator
  - This will be used in cases like `DynamoDB - sortKey`
- [ ] Add `@Index` decorator
- [ ] Add "migrations"
  - Add a way to generate "tables"

## Discarded Ideas

- [x] Add `@SubEntity` decorator
  - What if a entity be an entity and also a subEntity? This may cause a lot of bugs, so it's better think another way to handle this, with only one decorator
