const db = require('../data/database');

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price; // +를 추가 하여 string 을 number로 바꿈
    this.description = productData.description;
    this.image = productData.image; // the name of the image file
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
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

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    await db.getDb().collection('products').insertOne(productData);
  }
}

module.exports = Product;
