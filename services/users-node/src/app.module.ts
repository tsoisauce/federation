import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      sortSchema: true,
      playground: true,
      csrfPrevention: false,
      introspection: true,
      plugins: [ApolloServerPluginInlineTraceDisabled()],
      buildSchemaOptions: {
        orphanedTypes: [],
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
