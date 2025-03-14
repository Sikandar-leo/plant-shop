import React, { useState } from "react";
import { Button } from "/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "/components/ui/card";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { Trash } from "lucide-react";

type Plant = {
  id: number;
  name: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
};

const plants: Plant[] = [
  {
    id: 1,
    name: "Snake Plant",
    price: 29.99,
    description: "Air purifying plant",
    thumbnail: "https://via.placeholder.com/150",
    category: "air purifying",
  },
  {
    id: 2,
    name: "Aloe Vera",
    price: 19.99,
    description: "Aromatic plant",
    thumbnail: "https://via.placeholder.com/150",
    category: "aromatic",
  },
  {
    id: 3,
    name: "Spider Plant",
    price: 14.99,
    description: "Air purifying plant",
    thumbnail: "https://via.placeholder.com/150",
    category: "air purifying",
  },
  {
    id: 4,
    name: "Lavender",
    price: 24.99,
    description: "Aromatic plant",
    thumbnail: "https://via.placeholder.com/150",
    category: "aromatic",
  },
];

type CartItem = {
  plant: Plant;
  quantity: number;
};

const ParadiseNursery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "products" | "cart"
  >("landing");
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (plant: Plant) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.plant.id === plant.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.plant.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { plant, quantity: 1 }];
    });
  };

  const removeFromCart = (plantId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.plant.id !== plantId));
  };

  const updateQuantity = (plantId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.plant.id === plantId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.plant.price * item.quantity,
    0
  );

  return (
    <div className="bg-white min-h-screen">
      {currentPage === "landing" && (
        <div
          className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url(https://via.placeholder.com/1920x1080)",
          }}
        >
          <div className="bg-white bg-opacity-80 p-8 rounded-lg text-center">
            <h1 className="text-4xl font-bold mb-4">Paradise Nursery</h1>
            <p className="text-lg mb-8">
              Bringing the beauty of nature to your home.
            </p>
            <Button onClick={() => setCurrentPage("products")}>
              Get Started
            </Button>
          </div>
        </div>
      )}

      {currentPage === "products" && (
        <div className="p-4">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">Paradise Nursery</h1>
              <p className="text-lg ml-4">
                Bringing the beauty of nature to your home.
              </p>
            </div>
            <div className="flex items-center">
              <Button variant="outline" onClick={() => setCurrentPage("cart")}>
                Cart ({totalItems})
              </Button>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {plants.map((plant) => (
              <Card key={plant.id} className="hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{plant.name}</CardTitle>
                  <CardDescription>{plant.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <img
                    src={plant.thumbnail}
                    alt={plant.name}
                    className="w-full h-48 object-cover mb-2"
                  />
                  <p className="text-lg font-bold">${plant.price.toFixed(2)}</p>
                  <Button onClick={() => addToCart(plant)}>Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentPage === "cart" && (
        <div className="p-4">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">Paradise Nursery</h1>
              <p className="text-lg ml-4">
                Bringing the beauty of nature to your home.
              </p>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentPage("products")}
              >
                Continue Shopping
              </Button>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cart.map((item) => (
              <Card key={item.plant.id} className="hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{item.plant.name}</CardTitle>
                  <CardDescription>{item.plant.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <img
                    src={item.plant.thumbnail}
                    alt={item.plant.name}
                    className="w-full h-48 object-cover mb-2"
                  />
                  <div className="flex items-center space-x-2 mb-2">
                    <Label htmlFor={`quantity-${item.plant.id}`}>
                      Quantity:
                    </Label>
                    <Input
                      id={`quantity-${item.plant.id}`}
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.plant.id, parseInt(e.target.value))
                      }
                      className="w-16"
                    />
                  </div>
                  <p className="text-lg font-bold">
                    ${(item.plant.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => removeFromCart(item.plant.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">Cart Summary</h2>
            <p className="text-lg mb-2">Total Items: {totalItems}</p>
            <p className="text-lg mb-2">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            <Button size="lg">Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParadiseNursery;
