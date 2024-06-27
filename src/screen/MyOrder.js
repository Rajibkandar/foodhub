import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import axios from 'axios';

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
    
      try {
        const response = await axios.post('http://localhost:5000/api/myOrderData', {
          email: localStorage.getItem('useremail')
        });
        setOrderData(response.data.orderData);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []);
console.log(orderData)
  const renderOrders = () => {
    if (!orderData || !Array.isArray(orderData.order_data)) {
      return <div>No order data available</div>;
    }

    // Group orders by order date
    const groupedOrders = {};
    orderData.order_data.forEach(order => {
      const orderDate = order[0]?.Order_date;
      if (groupedOrders[orderDate]) {
        groupedOrders[orderDate].push(order);
      } else {
        groupedOrders[orderDate] = [order];
      }
    });

    return Object.keys(groupedOrders).reverse().map(date => (
      <div key={date}>
        <h2>{date}</h2>
        <div className="container-fluid">
          <div className="row">
            {groupedOrders[date].map((orders, index) => (
              <div className="col-sm-12" key={index}>
                <div className="card mb-3">
                  <div className="card-body">
                    {orders.map((item, itemIndex) => (
                      <div className="row" key={itemIndex}>
                        <div className="col-sm-2">
                          <img src={item.img} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100px' }} />
                        </div>
                        <div className="col-sm-6 fw-bold" style={{fontSize:'1.5rem'}}>{item.name}</div>
                        <div className="col-sm-2" style={{fontSize:'1.2rem'}}>{item.qty}</div>
                        <div className="col-sm-2" style={{fontSize:'1.2rem'}}>{item.size}</div>
                        <div className="col-sm-2" style={{fontSize:'1.2rem'}}>₹{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <Navbar />
      <div className='container'>
        {renderOrders()}
      </div>
      <Footer />
    </div>
  );
}
