import ProductDisplay from "./components/ImageComponent";

function App() {
  return (
    <div className="main">
      <ProductDisplay
        name="test_design"
        count={3}
        images={[
          {
            url: "https://cdn.quicksell.co/-LfPe0CWGEWcVYQTYbDw/products/-MVpx91iKhzu-4c2hPFN.jpg",
            ready: true,
            error: false,
          },
          {
            url: "https://cdn.quicksell.co/-LfPe0CWGEWcVYQTYbDw/products/-MVpx91hJWM9aEdBMICb.jpg",
            ready: false,
            error: true,
          },
          {
            url: "https://cdn.quicksell.co/-LfPe0CWGEWcVYQTYbDw/products/-MVpx91j5-eCEW5j1nOY.jpg",
            ready: true,
            error: false,
          },
          {
            url: "https://cdn.quicksell.co/-LfPe0CWGEWcVYQTYbDw/products/-MVpx91hJWM9aEdBMICd.jpg",
            ready: true,
            error: false,
          },
        ]}
      />
    </div>
  );
}

export default App;
