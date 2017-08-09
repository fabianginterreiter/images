export interface DatabaseConnectionConfiguration {
  filename: string;
}

export interface DatabaseConfiguration {
  client: string;
  useNullAsDefault: boolean;
  connection: DatabaseConnectionConfiguration;
}

export interface ConfigurationObject {
  path: string;
  redis: boolean;
  database: DatabaseConfiguration;
}
