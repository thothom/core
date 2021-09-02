<div align="center">
	<img src="https://github.com/techmmunity/symbiosis/raw/master/resources/logo.gif" width="300" height="300">
</div>

<div align="center">

# Techmmunity - Symbiosis

<a href="https://github.com/techmmunity/eslint-config">
	<img src="https://img.shields.io/badge/style%20guide-Techmmunity-01d2ce?style=flat" alt="Style Guide: Techmmunity">
</a>
<a href="https://www.codefactor.io/repository/github/techmmunity/symbiosis">
	<img src="https://www.codefactor.io/repository/github/techmmunity/symbiosis/badge" alt="CodeFactor">
</a>
<a href="https://deepscan.io/dashboard#view=project&tid=13883&pid=18404&bid=449722">
	<img src="https://deepscan.io/api/teams/13883/projects/18404/branches/449722/badge/grade.svg" alt="DeepScan">
</a>
<a href="https://coveralls.io/github/techmmunity/symbiosis?branch=master">
	<img src="https://coveralls.io/repos/github/techmmunity/symbiosis/badge.svg?branch=master" alt="Coveralls">
</a>
<a href="https://github.com/techmmunity/symbiosis/actions/workflows/coverage.yml">
	<img src="https://github.com/techmmunity/symbiosis/actions/workflows/coverage.yml/badge.svg" alt="Tests">
</a>
<a href="https://www.npmjs.com/package/@techmmunity/symbiosis">
	<img src="https://img.shields.io/npm/v/@techmmunity/symbiosis.svg?color=CC3534" alt="Npm">
</a>
<a href="https://www.npmjs.com/package/@techmmunity/symbiosis">
	<img src="https://img.shields.io/npm/dw/@techmmunity/symbiosis.svg" alt="Downloads">
</a>

<br>
<br>

</div>

Symbiosis is an **Object Mapper**, an [ORM + ODM](https://medium.com/spidernitt/orm-and-odm-a-brief-introduction-369046ec57eb), based on [TypeORM syntax](https://github.com/typeorm/typeorm) and [ESLint plugable approach](https://eslint.org/). Our intention here is standardize the connection and implementation of **every database** with the best performance possible, and for this, we use an plugable approach, so more people can contribute and create their on integration. This package alone can't do anything besides typing, the plugins do all the "dirt work".

Currently it only works with TypeScript (and transpiled JavaScript), and we plan to keep this way.

[![Guilded](https://img.shields.io/badge/guilded-F5C400?style=for-the-badge&labelColor=F5C400&logo=guilded&logoColor=111820)](https://guilded.gg/techmmunity)
[![Docs](https://img.shields.io/badge/documentation-111820?style=for-the-badge&labelColor=111820)](https://symbiosis.techmmunity.com.br)

## Why use Techmmunity Symbiosis?

- Easy to use and standardize. Regardless of the database, the implementation will be the same in all cases (except the most complex ones).
- The plugable approach. With the community support, this ORM can work with **all** the databases, be they NoSQL or SQL, as long as it has a plugin for it.

## Install and Config

With Yarn:

```sh
yarn add @techmmunity/symbiosis \
	reflect-metadata
```

With NPM:

```sh
npm i @techmmunity/symbiosis reflect-metadata --save
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
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	Repository,
} from "@techmmunity/symbiosis";
// All connections from the plugins follow this naming pattern
import { ExampleConnection } from "example-symbiosis-plugin";

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

## Documentation

- [For the users](https://symbiosis.techmmunity.com.br)
- [For the plugin creators](https://symbiosis.techmmunity.com.br/docs/create-plugin/first-steps)

## Limitations and warnings

- It's **NOT** our focus to ensure that this is a lightweight lib, so if it's necessary, we will add more things that increase the package size, **BUT** we will try our best to keep the size smallest as possible
- You cannot have two class entities with the same name, or it will cause malfunctioning
- Prefix and Suffix aren't applied to SubEntities fields
- The data used to identify the entities are **stored in memory**, so be careful to not have a memory overload (More entities = More memory required), but relax, it's not that much, you can safely have dozens of entities with no significantly memory usage increase. This package is designed to work with micro-services and serverless applications, so you will only have trouble if you use it in a monolithic application.

## How to contribute?

All the details about contributing are in [our website](https://symbiosis.techmmunity.com.br).

See [here](https://github.com/techmmunity/symbiosis/blob/master/TODO.md) our to-dos.

## Special Thanks

### Contributors

This project exists thanks to all the people who contribute:

> COMING SOON

### _Cool Kids_

- A very special thanks to [Umed Khudoiberdiev](https://github.com/pleerock) and [Attila Oláh](https://github.com/NoNameProvided), how created TypeORM. Without their code, this package would never exists.
