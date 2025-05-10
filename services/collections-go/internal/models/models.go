package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

// Collection represents a group of products
type Collection struct {
	ID          string     `json:"id" gorm:"primary_key"`
	Name        string     `json:"name"`
	Description *string    `json:"description"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
	Items       []CollectionItem `json:"-" gorm:"foreignkey:CollectionID"`
}

// CollectionItem represents a product in a collection
type CollectionItem struct {
	ID           uint      `json:"id" gorm:"primary_key;auto_increment"`
	CollectionID string    `json:"collectionID"`
	ProductID    string    `json:"productID"`
	AddedAt      time.Time `json:"addedAt"`
}

// TableName sets the table name for Collection
func (Collection) TableName() string {
	return "collections"
}

// TableName sets the table name for CollectionItem
func (CollectionItem) TableName() string {
	return "collection_items"
}

// Product represents a reference to a product in another service
type Product struct {
	ID string `json:"id"`
}

// BeforeCreate is a GORM hook that sets timestamps before creation
func (c *Collection) BeforeCreate(tx *gorm.DB) error {
	now := time.Now()
	c.CreatedAt = now
	c.UpdatedAt = now
	return nil
}

// BeforeUpdate is a GORM hook that updates the UpdatedAt timestamp
func (c *Collection) BeforeUpdate(tx *gorm.DB) error {
	c.UpdatedAt = time.Now()
	return nil
}

// BeforeCreate is a GORM hook that sets timestamps before creation
func (ci *CollectionItem) BeforeCreate(tx *gorm.DB) error {
	ci.AddedAt = time.Now()
	return nil
}