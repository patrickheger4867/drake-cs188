import fetch from 'isomorphic-unfetch';
import {getCustomersCart} from "../services/cart-item-services"

const removeItemFromCart=async (cartItem) => {
    await fetch('http://localhost:5555/cart-items/${cartItem.cartItemId}', {
        method:'DELETE'
    });

    location.reload();
};

const Index = props => (
    <section>
        <h1>{props.customer.firstName}'s Cart</h1>
        <p>You have {props.cartItems.length} {props.cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        <ul>
            {props.items.map((item, index) => (
                <li key={item.itemId}>
                    <Link href="/items/[itemId" as {'/items/${item.itemId}'}>
                        <a>{item.description}</a>
                    </Link>
                    <button type={'button'} onclick={() => removeItemFromCart(props.cartItems[index])}>Remove</button>
                </li>
            ))}
        </ul>
        <p>Current Total: ${props.items.reduce((accum, item) => accum + item.price,0)}</p>
        {props.items.length=== 0 &&
        <Link href="/items">
            <a title={"Shopping"}>Shopping!</a>
        </Link>
            }
    </section>
);

Index.getInitialProps = getCustomersCart;

export default Index;