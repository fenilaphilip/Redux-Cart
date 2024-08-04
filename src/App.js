import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';


let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {

      dispatch(uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      }));

      const response = await fetch('https://cart-16835-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed');
      };

      dispatch(uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Send cart data successfully!",
      }));

    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data failed!",
      }));
    });

  }, [cart, dispatch]);





  return (
    <>{notification && (
      <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />)}

      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>

  );
}

export default App;
