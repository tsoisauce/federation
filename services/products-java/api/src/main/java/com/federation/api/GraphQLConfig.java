package com.federation.api;

import com.apollographql.federation.graphqljava.Federation;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.graphql.data.method.annotation.support.AnnotatedControllerConfigurer;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

import java.io.IOException;
import java.util.List;

@Configuration
public class GraphQLConfig {

  @Value("classpath:graphql/schema.graphqls")
  private Resource schemaResource;

  @Bean
  public org.springframework.graphql.execution.GraphQlSource graphQlSource(
      AnnotatedControllerConfigurer annotatedControllerConfigurer,
      List<RuntimeWiringConfigurer> configurers) throws IOException {
    TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(schemaResource.getInputStream());

    RuntimeWiring.Builder builder = RuntimeWiring.newRuntimeWiring();
    annotatedControllerConfigurer.configure(builder);
    configurers.stream()
        .filter(c -> c != annotatedControllerConfigurer)
        .forEach(c -> c.configure(builder));

    RuntimeWiring runtimeWiring = builder.build();

    GraphQLSchema graphQLSchema = Federation.transform(typeRegistry, runtimeWiring)
        .fetchEntities(new graphql.schema.DataFetcher<Object>() {
          @Override
          public Object get(graphql.schema.DataFetchingEnvironment env) {
            return java.util.Collections.emptyList();
          }
        })
        .resolveEntityType(env -> {
          if (env.getObject() instanceof com.federation.api.models.Product) {
            return env.getSchema().getObjectType("Product");
          }
          return null;
        })
        .build();

    return org.springframework.graphql.execution.GraphQlSource.builder(graphQLSchema).build();
  }

  @Bean
  public RuntimeWiringConfigurer federationScalarConfigurer() {
    return builder -> builder.scalar(graphql.schema.GraphQLScalarType.newScalar()
        .name("federation__FieldSet")
        .coercing(new graphql.schema.Coercing<String, String>() {
          @Override
          public String serialize(Object dataFetcherResult) {
            return String.valueOf(dataFetcherResult);
          }

          @Override
          public String parseValue(Object input) {
            return String.valueOf(input);
          }

          @Override
          public String parseLiteral(Object input) {
            if (input instanceof graphql.language.StringValue) {
              return ((graphql.language.StringValue) input).getValue();
            }
            return String.valueOf(input);
          }
        })
        .build());
  }
}
