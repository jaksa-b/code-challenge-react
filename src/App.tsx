import React, { useEffect, useRef, useState } from "react";
import { products } from "./utils/products";
import { Input, InputRef, Table, TableProps } from "antd";

interface Product {
  ProductID: string;
  Name: string;
  Category: string;
  Price: number;
  Stock: number;
  Rating: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate loading data
    setTimeout(() => {
      const dataset = products.map((p, i) => ({ ...p, key: i }));
      setData(dataset as any);
      setLoading(false);
    }, 2000);
  }, []);

  const columns = [
    {
      title: "ProductID",
      dataIndex: "ProductID",
      key: "ProductID",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
      filters: [
        {
          text: "Appliances",
          value: "Appliances",
        },
        {
          text: "Electronics",
          value: "Electronics",
        },
        {
          text: "Tools",
          value: "Tools",
        },
      ],
      // onFilter: (value: string, record) => record.Category.indexOf(value) === 0,
      // sortDirections: ["descend"],
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      sorter: (a: Product, b: Product) => a.Price - b.Price,
    },
    {
      title: "Stock",
      dataIndex: "Stock",
      key: "Stock",
      sorter: (a: Product, b: Product) => a.Stock - b.Stock,
    },
    {
      title: "Rating",
      dataIndex: "Rating",
      key: "Rating",
      sorter: (a: Product, b: Product) => a.Rating - b.Rating,
    },
  ];

  const onChange: TableProps<Product>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);

    let categoryFilter: Array<String> = [];

    if (filters?.Category && filters?.Category?.length > 0) {
      categoryFilter = filters?.Category;
      const newData = data.filter(
        (product) => categoryFilter.indexOf(product.Category) === 0
      );

      setData(newData);
    }

    if (filters?.Category === null) {
      const dataset = products.map((p, i) => ({ ...p, key: i }));
      setData(dataset as any);
    }
  };

  const searchProductName = (name: string) => {
    setSearchText(name);
    const dataset = products
      .filter((p) => p.Name.search(name))
      .map((p, i) => ({ ...p, key: i }));
    setData(dataset as any);
  };

  return (
    <div className="App">
      <h1>Product Dashboard</h1>
      <Input
        ref={searchInput}
        placeholder={"Search product name"}
        value={searchText}
        onChange={(e) => searchProductName(e.target.value)}
      />
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        onChange={onChange}
      />
    </div>
  );
};

export default App;
