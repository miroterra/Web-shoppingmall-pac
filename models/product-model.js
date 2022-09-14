const mongodb = require('mongodb');

const db = require('../data/database');

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price; // +를 추가 하여 string 을 number로 바꿈
    this.description = productData.description;
    this.image = productData.image; // the name of the image file
    this.updateImageDate();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findById(productId) {
    let prodId;
    try {
      const prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      //해당 id 생성에 실패
      error.code = 404;
      throw error;
    }
    const product = await db.getDb().collection('products').findOne({ _id: prodId });

    //제품을 찾지 못했을때 에러
    if (!product) {
      const error = new Error('Could not find product with provided id');
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  // 정적 메소드 - 클래스를 인스턴스화 할 필요가 없고
  // 현재 데이터가 없기 떄문에 이 클래스를 기반으로 제품을 만들 수 없는 이 경우 사용
  static async findAll() {
    const products = await db.getDb().collection('products').find().toArray();
    //toArray를 이용해 배열로 변경
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  updateImageDate() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productDate.image;
      }

      await db.getDb().collection('products').updateOne({_id: productId}, {
        $set: productDate
      });
    } else {
      await db.getDb().collection('products').insertOne(productData);
    }
  }

  async replaceImage(newImage) {
    this.image = newImage;
    this.updateImageDate();
  }

  remove() {
    const productId = new mongodb.ObjectId(this.id);
    return db.getDb.collection('products').deleteOne({ _id: productId });
  }
}

module.exports = Product;
