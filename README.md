<div align="center">

<img src="https://github.com/techmmunity/symbiosis/raw/master/resources/logo.gif" width="300" height="300">

# Techmmunity - Symbiosis

<a href="https://github.com/techmmunity/eslint-config">
	<img src="https://img.shields.io/badge/style%20guide-Techmmunity-01d2ce?style=for-the-badge" alt="Style Guide: Techmmunity">
</a>
<a href="https://www.codefactor.io/repository/github/techmmunity/symbiosis">
	<img src="https://www.codefactor.io/repository/github/techmmunity/symbiosis/badge?style=for-the-badge" alt="CodeFactor">
</a>
<a href="https://coveralls.io/github/techmmunity/symbiosis?branch=master">
	<img src="https://img.shields.io/coveralls/github/techmmunity/symbiosis/master?style=for-the-badge" alt="Coveralls">
</a>
<a href="https://github.com/techmmunity/symbiosis/actions/workflows/coverage.yml">
	<img src="https://img.shields.io/github/workflow/status/techmmunity/symbiosis/Collect%20Coverage?label=tests&logo=github&style=for-the-badge" alt="Tests">
</a>
<a href="https://www.npmjs.com/package/@techmmunity/symbiosis">
	<img src="https://img.shields.io/npm/v/@techmmunity/symbiosis.svg?color=CC3534&style=for-the-badge" alt="Npm">
</a>
<a href="https://www.npmjs.com/package/@techmmunity/symbiosis">
	<img src="https://img.shields.io/npm/dw/@techmmunity/symbiosis.svg?style=for-the-badge" alt="Downloads">
</a>

<br>
<br>

</div>

Symbiosis is an **Object Mapper**, an [ORM + ODM](https://medium.com/spidernitt/orm-and-odm-a-brief-introduction-369046ec57eb), based on [TypeORM syntax](https://github.com/typeorm/typeorm) and [ESLint plugable approach](https://eslint.org/). Our intention here is standardize the connection and implementation of **every database** with the best performance possible, and for this, we use an plugable approach, so more people can contribute and create their on integration. This package alone can't do anything besides typing, the plugins do all the "dirt work".

Currently it only works with TypeScript (and transpiled JavaScript), and we plan to keep this way.

[![Guilded Community](https://img.shields.io/badge/guilded%20community-F5C400?style=for-the-badge&labelColor=F5C400&logo=guilded&logoColor=111820)](https://guilded.gg/techmmunity)
[![Docs](https://img.shields.io/badge/📄%20documentation-01d2ce?style=for-the-badge)](https://symbiosis.techmmunity.com.br)

## Why use Techmmunity Symbiosis?

- **Easy to use and standardize.** Regardless of the database, the implementation will be the same in all cases (except the most complex ones).
- **The plugable approach.** With the community support, this OM can work with **all** the databases, be they NoSQL or SQL, as long as it has a plugin for it.
- **No globals!** All that this package uses is encapsuled inside it's classes, so there is no need to worry about some config defined in a global scope compromising your code.
- **Free and direct support.** If you have any question, you can join [our guilded community](https://guilded.gg/techmmunity), and we and the members of Techmmunity will help you!
- **Focused on microservices and serverless!** We focus in keep it usable for serverless and microservices projects.

## Install and Config

With Yarn:

```sh
yarn add @techmmunity/symbiosis reflect-metadata
```

With NPM:

```sh
npm i @techmmunity/symbiosis reflect-metadata
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

## Plugins List

All the Symbiosis Plugins have the `techmmunity-symbiosis` tag, so you can easily found all the plugins at [this link](https://www.npmjs.com/search?q=keywords:techmmunity-symbiosis).

[![Plugins List](https://img.shields.io/badge/plugins%20list-CB3837?style=for-the-badge&labelColor=CB3837)](https://www.npmjs.com/search?q=keywords:techmmunity-symbiosis)

## Usage

Symbiosis only supports the [Data Mapper](https://en.wikipedia.org/wiki/Data_mapper_pattern) pattern, so we can avoid mutability and bad code practices.

```ts
import { Column, Entity, PrimaryGeneratedColumn } from "@techmmunity/symbiosis";
// All plugins export a Connection class and a Repository type
import { Connection, Repository } from "example-symbiosis-plugin";

@Entity()
class FooEntity {
	@PrimaryColumn()
	public id: string;

	@Column()
	public foo: string;
}

type FooRepository = Repository<FooEntity>;

const foo = async () => {
	const connection = new Connection({
		// Connection config here
		entities: [FooEntity],
	});

	await connection.connect();

	const fooRepository: FooRepository =
		connection.getRepository<FooEntity>(FooEntity);

	await fooRepository.save({
		bar: "foo",
	});
};

foo();
```

## Documentation

- [For users](https://symbiosis.techmmunity.com.br)
- [For plugin creators](https://symbiosis.techmmunity.com.br/docs/create-plugin/first-steps)
- [For contributors](https://symbiosis.techmmunity.com.br/docs/contributing/first-steps)

## How to contribute?

All the details about contributing are in [our website](https://symbiosis.techmmunity.com.br).

See [here](https://github.com/techmmunity/symbiosis/blob/master/TODO.md) our to-dos.

## Special Thanks

### Contributors

This project exists thanks to all the people who contribute:

> COMING SOON

### _Cool Kids_

- A very special thanks to the creators of TypeORM, without their code, this package would never exists.
