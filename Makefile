db-migration-run:
	@echo "\nRunning migrations\n==============="
	npm i
	@echo "\nDeleting old migrations folter on dist"
	npm run db:migration:run

db-migration-generate:
	@echo "\nGenerating migrations\n==============="
	npm i
	@echo "\nDeleting old migrations folter on dist"
	rm -rf ./dist/infra/shared/typeorm/migrations
	@echo "\nGenerating migration taking into account the current schemas\n"
	@read -p "Please, enter the migration name (kebab-case): " migrationname; npm run db:migration:generate --name=$$migrationname
	@echo "\nMigration generation process finished, please, if a new migration file has been generated review its content to make sure all is ok."

db-migration-revert:
	@echo "\nReverting the last migration\n==============="
	npm i
	npm run db:migration:revert
