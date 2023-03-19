import { getBaseConfig } from '@db/credentials';

export function getConfig() {
    return {
        database: getBaseConfig(),
    }
}