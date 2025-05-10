package graph

import (
	"context"
	"errors"
	"strconv"

	"github.com/tsoisauce/federation/services/collections-go/internal/db"
	"github.com/tsoisauce/federation/services/collections-go/internal/graph/model"
	"github.com/tsoisauce/federation/services/collections-go/internal/models"
)

// This file will contain the resolver implementations

type Resolver struct {
	DB *db.Database
}

func (r *Resolver) Collection() CollectionResolver {
	return &collectionResolver{r}
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}

func (r *Resolver) Product() ProductResolver {
	return &productResolver{r}
}

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type collectionResolver struct{ *Resolver }

func (r *collectionResolver) Products(ctx context.Context, obj *models.Collection) ([]*models.Product, error) {
	items, err := r.DB.GetCollectionItems(obj.ID)
	if err != nil {
		return nil, err
	}

	var products []*models.Product
	for _, item := range items {
		products = append(products, &models.Product{
			ID: item.ProductID,
		})
	}

	return products, nil
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) CreateCollection(ctx context.Context, name string, description *string) (*models.Collection, error) {
	collection := &models.Collection{
		Name:        name,
		Description: description,
	}

	err := r.DB.CreateCollection(collection)
	if err != nil {
		return nil, err
	}

	return collection, nil
}

func (r *mutationResolver) AddProductToCollection(ctx context.Context, collectionID string, productID string) (bool, error) {
	err := r.DB.AddProductToCollection(collectionID, productID)
	return err == nil, err
}

func (r *mutationResolver) RemoveProductFromCollection(ctx context.Context, collectionID string, productID string) (bool, error) {
	rowsAffected, err := r.DB.RemoveProductFromCollection(collectionID, productID)
	return rowsAffected > 0, err
}

type productResolver struct{ *Resolver }

// All Product fields are external or extended, so no resolvers needed

type queryResolver struct{ *Resolver }

func (r *queryResolver) Collections(ctx context.Context) ([]*models.Collection, error) {
	return r.DB.GetCollections()
}

func (r *queryResolver) Collection(ctx context.Context, id string) (*models.Collection, error) {
	return r.DB.GetCollection(id)
}

func (r *queryResolver) Service(ctx context.Context) (*model.Service, error) {
	// In a real implementation, this would return the federation SDL
	return &model.Service{
		SDL: "# Federation service SDL",
	}, nil
}