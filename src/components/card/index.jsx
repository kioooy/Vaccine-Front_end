import { Button, Card } from "antd";

const { Meta } = Card;
function ProductCard({ product }) {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <h3>{product?.name}</h3>
      <p>{product?.price}</p>
      <Button className="mt-2" type="primary">Add to cart</Button>
    </Card>
  );
}

export default ProductCard;
