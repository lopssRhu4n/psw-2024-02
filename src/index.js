import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/index';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './styles/Variables.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store/index';
import { Provider } from 'react-redux';

// const authStorage = localStorage.getItem('evente-se-auth');
// const [userId, date] = authStorage.split('|');
// const dispatch = useDispatch();

// if (userId) {
//   const parsedDate = new Date(date);
//   const nowDate = new Date();

//   const dateDiff = nowDate.getTime() - parsedDate.getTime();
//   const dayInMs = 24 * 60 * 60 * 1000;
//   if (dateDiff <= dayInMs) {
//     // console.log('A diferença é menor que um dia' + dateDiff)

//   }
// console.log(parsedDate)
// }
// console.log(authStorage)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
