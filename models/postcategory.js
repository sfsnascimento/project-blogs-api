module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {}, {
    timestamps: false,
  });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostsCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });
    
    models.Category.belongsToMany(models.BlogPost, {
      through: PostsCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategory;
};
