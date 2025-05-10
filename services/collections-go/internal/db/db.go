package db

import (
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/tsoisauce/federation/services/collections-go/internal/models"
)

// Database holds the database connection
type Database struct {
	DB *gorm.DB
}

// New creates a new database connection
func New() (*Database, error) {
	db, err := gorm.Open("sqlite3", "collections.db")
	if err != nil {
		return nil, err
	}

	// Enable GORM logging in development
	db.LogMode(true)

	// Auto-migrate the schema
	db.AutoMigrate(&models.Collection{}, &models.CollectionItem{})

	return &Database{DB: db}, nil
}

// Close closes the database connection
func (d *Database) Close() error {
	return d.DB.Close()
}

// GetCollections returns all collections
func (d *Database) GetCollections() ([]*models.Collection, error) {
	var collections []*models.Collection
	if err := d.DB.Find(&collections).Error; err != nil {
		return nil, err
	}
	return collections, nil
}

// GetCollection returns a collection by ID
func (d *Database) GetCollection(id string) (*models.Collection, error) {
	var collection models.Collection
	if err := d.DB.Where("id = ?", id).First(&collection).Error; err != nil {
		return nil, err
	}
	return &collection, nil
}

// CreateCollection creates a new collection
func (d *Database) CreateCollection(collection *models.Collection) error {
	return d.DB.Create(collection).Error
}

// GetCollectionItems returns all items in a collection
func (d *Database) GetCollectionItems(collectionID string) ([]*models.CollectionItem, error) {
	var items []*models.CollectionItem
	if err := d.DB.Where("collection_id = ?", collectionID).Find(&items).Error; err != nil {
		return nil, err
	}
	return items, nil
}

// AddProductToCollection adds a product to a collection
func (d *Database) AddProductToCollection(collectionID, productID string) error {
	item := models.CollectionItem{
		CollectionID: collectionID,
		ProductID:    productID,
	}
	return d.DB.Create(&item).Error
}

// RemoveProductFromCollection removes a product from a collection
func (d *Database) RemoveProductFromCollection(collectionID, productID string) (int64, error) {
	db := d.DB.Where("collection_id = ? AND product_id = ?", collectionID, productID).Delete(&models.CollectionItem{})
	return db.RowsAffected, db.Error
}