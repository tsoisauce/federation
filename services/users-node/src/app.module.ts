import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Automatically generate the schema
      plugins: [ApolloServerPluginInlineTraceDisabled()], // Disable inline tracing
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join('..', 'products-ruby', 'storage', 'development.sqlite3'),
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, UsersResolver, UsersService],
})
export class AppModule {}
