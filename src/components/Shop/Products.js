import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'P1',
    price: 10,
    title: "The lost Book",
    description: "This book is translated from the german novel.",
  },
  {
    id: 'P2',
    price: 100,
    title: "Phone",
    description: "Samsung phone.",
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map((product) => {
            return <ProductItem
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          })
        }

      </ul>
    </section>
  );
};

export default Products;
