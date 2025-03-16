import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersResolver } from './resolvers/users.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Automatically generate the schema
      plugins: [ApolloServerPluginInlineTraceDisabled()], // Disable inline tracing
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UsersResolver],
})
export class AppModule {}
