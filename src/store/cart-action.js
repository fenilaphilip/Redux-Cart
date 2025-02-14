import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

const url = 'https://cart-16835-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(url);

            if (!response.ok) {
                console.log("Did not get cart" + response.status)
                throw new Error('Could not fetch cart data!');
            } else {
                console.log("Got cart");
            }

            const data = await response.json();

            return data;
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }));

        } catch (err) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Fetching cart data failed!",
            }));
        };
    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data!",
            })
        );

        const sendRequest = async () => {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity,
                }),
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed');
            }
        };
        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Send cart data successfully!",
            }));
        } catch (err) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Sending cart data failed!",
            }));
        }




    };
}