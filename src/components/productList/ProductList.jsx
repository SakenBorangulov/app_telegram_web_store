import { useCallback, useEffect, useState } from "react";
import ProductItem from "../productItem/ProductItem";
import "./productList.css";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
  {id: 1, title: "Jeans", price: 5000, description: "Blue color, straight"},
  {id: 2, title: "Coat", price: 5000, description: "Green color, warm"},
  {id: 3, title: "Jeans 2", price: 5000, description: "Blue color, straight"},
  {id: 4, title: "Coat 8", price: 5000, description: "Green color, warm"},
  {id: 5, title: "Jeans 3", price: 5000, description: "Blue color, straight"},
  {id: 6, title: "Coat 7", price: 5000, description: "Green color, warm"},
  {id: 7, title: "Jeans 4", price: 5000, description: "Blue color, straight"},
  {id: 8, title: "Coat 5", price: 5000, description: "Green color, warm"},
]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price;
  }, 0)
}

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram()

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id)
    let newItems = [];

    if(alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if(newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Buy Total: ${getTotalPrice(newItems)}`
      });
    }
  }

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId
    }
    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData)
    return () => {
      tg.offEvent("mainButtonClicked", onSendData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSendData])

  return (
    <div className="list">
      {products.map(item => (
        <ProductItem 
          key={item.id}
          product={item}
          onAdd={onAdd}
          className="item"
        />
      ))}
    </div>
  )
};

export default ProductList;
