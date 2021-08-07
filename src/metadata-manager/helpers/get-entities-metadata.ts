import { BaseConnectionOptions } from "../../connection/types/connection-options";
import { formatNamingPattern } from "../../utils/format-naming-pattern";
import { MetadataUtil } from "../../utils/metadata-util";
import { MetadataManagerEntities } from "../types/manager-metadata";
import { CustomClass } from "../types/metadata-type";
import { formatColumns } from "./format-columns";

interface GetEntitiesMetadataParams {
	entities: Array<CustomClass>;
	namingPattern: BaseConnectionOptions["namingPattern"];
}

export const getEntitiesMetadata = <EntityExtraMetadata, ColumnExtraMetadata>({
	entities,
	namingPattern,
}: GetEntitiesMetadataParams) =>
	entities.reduce<
		MetadataManagerEntities<EntityExtraMetadata, ColumnExtraMetadata>
	>((acc, entity) => {
		const metadata = MetadataUtil.getAllEntityMetadata<
			EntityExtraMetadata,
			ColumnExtraMetadata
		>({
			entity,
		});

		const formattedName = formatNamingPattern({
			value: metadata.formattedName,
			namingPattern: namingPattern?.entity?.database,
		});

		const formattedColumns = formatColumns<ColumnExtraMetadata>({
			columns: metadata.columns,
			namingPattern,
		});

		acc[metadata.name] = {
			...metadata,
			formattedName,
			columns: formattedColumns,
		};

		return acc;
	}, {});
