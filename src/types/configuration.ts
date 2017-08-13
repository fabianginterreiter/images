export interface DatabaseConnectionConfiguration {
  filename: string;
}

export interface DatabaseConfiguration {
  client: string;
  useNullAsDefault: boolean;
  connection: DatabaseConnectionConfiguration;
  debug?: boolean;
}

export interface ConfigurationObject {
  path: string;
  redis: boolean;
  database: DatabaseConfiguration;
}
