export default function(product = null, action) {
    if(action.type == 'pickProduct') {
        console.log("pick le product",action.product);

        return action.product;
    }
    else {return product}
}