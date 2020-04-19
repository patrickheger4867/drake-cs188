import fetch from 'isomorphic-unfetch';


const Index = props => (
    <Layout>
        <h1>Item Information</h1>
        <img src={props.item.image}/>
        <p>Description: {props.item.description}</p>
        <p>Price: {props.item.price}</p>
    </Layout>
);

Index.getInitialProps = async function(context) {
    const { itemId } = context.query;
    const res = await fetch(`https://localhost:8000/items/${itemId}`);
    const item = await res.json();
    return {item};
};

export default Index;