export interface IDatabaseConnectionConfiguration {
  filename: string;
}

export interface IDatabaseConfiguration {
  client: string;
  useNullAsDefault: boolean;
  connection: IDatabaseConnectionConfiguration;
}

export interface IConfigurationObject {
  path: string;
  redis: boolean;
  database: IDatabaseConfiguration;
}
