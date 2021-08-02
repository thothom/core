<div align="center">
	<img src="https://github.com/techmmunity/compass/raw/master/resources/ORM.gif" width="300" height="300">
  <br>
  <br>
	<a href="https://www.codefactor.io/repository/github/techmmunity/compass">
		<img src="https://www.codefactor.io/repository/github/techmmunity/compass/badge" alt="CodeFactor">
	</a>
	<a href="https://deepscan.io/dashboard#view=project&tid=13883&pid=17164&bid=385798">
		<img src="https://deepscan.io/api/teams/13883/projects/17164/branches/385798/badge/grade.svg" alt="DeepScan">
	</a>
	<a href="https://coveralls.io/github/Techmmunity/compass?branch=master">
		<img src="https://coveralls.io/repos/github/Techmmunity/compass/badge.svg?branch=master" alt="Coveralls">
	</a>
	<a href="https://github.com/Techmmunity/compass/workflows/coverage">
		<img src="https://github.com/Techmmunity/compass/workflows/coverage/badge.svg" alt="Tests">
	</a>
	<a href="https://www.npmjs.com/package/@techmmunity/compass">
		<img src="https://img.shields.io/npm/v/@techmmunity/compass.svg?color=CC3534" alt="Npm">
	</a>
	<a href="https://www.npmjs.com/package/@techmmunity/compass">
		<img src="https://img.shields.io/npm/dw/@techmmunity/compass.svg" alt="Downloads">
	</a>
  <br>
  <br>
</div>

<div align="center">

# Techmmunity - Compass

## ALERT: THIS IS UNDER DEVELOPMENT AND TESTING. WE DO NOT RECOMMEND USE THIS IN PRODUCTION YET!!!

</div>

Compass is an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) based on [TypeORM syntax](https://github.com/typeorm/typeorm) and [ESLint plugable approach](https://eslint.org/). Our intention here is standardize the database connection and implementation for **every database** with the best performance possible, and for this, we use an plugable approach, so more people can contribute and create their on integration. This package alone can't do anything besides typing, the plugins do all the "dirt work".

Currently it only works with TypeScript (and transpiled JavaScript), and we plan to keep this way.

[![Discord Badge](https://img.shields.io/badge/join%20our%20community-7289DA?style=for-the-badge&labelColor=7289DA&logo=discord&logoColor=white)](https://discord.gg/qCJXz6P4qw)

## Why use Techmmunity Compass?

- Easy to use and standardize. Regardless of the database, the implementation will be the same in all cases (except the most complex ones).
- The plugable approach. With the community support, this ORM can work with **all** the databases, be they NoSQL or SQL, as long as it has a plugin for it.

## Install and Config

With Yarn:

```sh
yarn add @techmmunity/compass

yarn add -D @types/node
```

With NPM:

```sh
npm i @techmmunity/compass --save

npm i @types/node --save-dev
```

Configure `tsconfig.json`:

```json
{
	"compilerOptions": {
		"experimentalDecorators": true,
		"emitDecoratorMetadata": true
	}
}
```

## Available Plugins

### DynamoDB

- [@techmmunity/compass-dynamo]()

## Usage

Compass only supports the [Data Mapper](https://en.wikipedia.org/wiki/Data_mapper_pattern) pattern, so we can avoid mutability and bad code practices.

```ts
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Repository,
} from "@techmmunity/compass";
// All the plugins follow this naming pattern
import { ExampleConnection } from "example-compass-plugin";

const Connection = new ExampleConnection({
	// Connection config here
});

@Entity()
class FooEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	bar: string;
}

type FooRepository = Repository<FooEntity>;

const FooRepository = Connection.getRepository(FooEntity);

FooRepository.save({
	bar: "foo",
}).then(...);
```

**ALERT:** If you use an naming pattern `kebab` or `snake` to your _entities_, _columns_, _etc_ names, you **must** specify it on the connection config (at `connectionOptions.namingPattern.[entity, column, etc].code`), or it will be converted to `camel` by default.

## Documentation

This is an documentation for the final user, if you want to know how to make a plugin or how to contribute to this project, give a look at [this doc](https://github.com/techmmunity/compass/blob/master/CONTRIBUTING.md).

### Connection

Each plugin has his own connection options, but we recommend to follow at least this base:

#### tableNamingPattern

The naming pattern for the tables. Accept the values: `snake_case`, `PascalCase`, `CamelCase`, `kebab-case`, `UPPER_CASE` and a custom function that receives a string and must return also a string.

#### columnNamingPattern

The naming pattern for the tables. Accept the values: `snake_case`, `PascalCase`, `CamelCase`, `kebab-case`, `UPPER_CASE` and a custom function that receives a string and must return also a string.

#### maxQueryExecutionTime

The maximum time to execute a "query", like a "timeout". Accepts a number.

### Decorators

> TODO

### Repository

> TODO

## How to contribute?

All the details about contributing to the project are [described here](https://github.com/techmmunity/compass/blob/master/CONTRIBUTING.md).

See [here](https://github.com/techmmunity/compass/blob/master/TODO.md) our to-dos.

## Special Thanks

### Contributors

This project exists thanks to all the people who contribute:

<a href="https://github.com/techmmunity/compass/graphs/contributors">
	<img src="https://opencollective.com/@techmmunity/compass/contributors.svg?width=890&showBtn=false" />
</a>

### "Cool Kids" people who helped with the initial idea

- [Diozin](https://www.linkedin.com/in/diozhn/), who suggested the name "Compass"
- [Zaetic](https://www.linkedin.com/in/joaoggs/), who make our logo
