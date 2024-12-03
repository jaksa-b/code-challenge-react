import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface Product {
  ProductID: string;
  Name: string;
  Category: string;
  Price: string;
  Stock: string;
  Rating: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch the CSV file
    fetch('/products.csv')
      .then(response => response.text())
      .then(data => {
        // Parse CSV data
        Papa.parse<Product>(data, {
          header: true,
          skipEmptyLines: true,
          complete: results => {
            setProducts(results.data);
          },
        });
      })
      .catch(error => {
        console.error('Error fetching the CSV file:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Product Dashboard</h1>
      {/* Table or component to display products will go here */}
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};

export default App;
