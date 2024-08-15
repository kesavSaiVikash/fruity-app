import React from "react";
import { FruitList, Jar } from "./pages";
import { Layout } from "./components";

const App: React.FC = () => {
  return (
    <Layout>
      <div className="card-container">
        <FruitList />
      </div>
      <div className="card-container">
        <Jar />
      </div>
    </Layout>
  );
};

export default App;
