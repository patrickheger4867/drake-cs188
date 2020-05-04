import fetch from 'isomorphic-unfetch';
import uuid from 'uuid';
import {getCustomersCart} from '../../services/cart-item-service';

const addItemToCart = async (itemId) => {
    const customerResponse = await fetch(`http://localhost:5555/customers`);
    const [customer] = await customerResponse.json();
    const cartResponse = await fetch(`http://localhost:5555/customers/${customer.customerId}/carts`);
    const [cart] = await cartResponse.json();
    await fetch(`http://localhost:5555/cart-items`, {
        method: 'POST',
        body: JSON.stringify({
            cartItemId: uuid.v4(),
            cartId: cart.cartId,
            itemId,
            quantity: 1
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    location.reload();
};

const Index = props => (
    <Layout>
        <h1>Item Information</h1>
        <img src={props.item.image}/>
        <p>Description: {props.item.description}</p>
        <p>Price: {props.item.price}</p>
        <button type={"button"} onClick ={() => addItemToCart(props.item.itemId)}>
            add to the cart
        </button>
        <p>The amount of this item in the cart:{props.numberOfTimesInCart}</p>
        <Link href={'/cart'}>
            <a title={"See Cart"}>See Cart</a>
        </Link>
    </Layout>
);

Index.getInitialProps = async function(context) {
    const { itemId } = context.query;
    const res = await fetch(`https://localhost:8000/items/${itemId}`);
    const item = await res.json();
    const {cartItems} = await getCustomersCart();
    const numberOfTimesInCart = cartItems.filter((cartItem) => cartItem.itemId === itemId).length;
    return {item,
            cartItems,
            numberOfTimesInCart};
};

export default Index;