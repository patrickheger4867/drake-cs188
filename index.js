// the real index.js file

import Link from "next/link";


export default function Index() {
    return (
        <div>
        <p>Drake University Clothes and items</p>
    <Link href={"/items"}>
    <p> This is where we sell Drake University Stuff</p>
    </Link>
    </div>
);
}

// items/index.js

import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Index = props => (
    <Layout>
        <h1>Shop Items</h1>
        <ul>
            {props.items.map(item => (
                <li key={item.itemId}>
                    <Link href="/items/[itemId]" as={`/items/${item.itemId}`}>
                        <a>{item.description}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </Layout>
);

Index.getInitialProps = async function() {
    const res = await fetch('https://localhost:8000/items');
    const items = await res.json();



    return {
        items
    };
};

export default Index;
