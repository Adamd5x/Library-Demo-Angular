import { ConfigService } from './config.service';

export function configInitializer(configService: ConfigService): () => Promise<void> {
    return () => configService.loadConfig();
}