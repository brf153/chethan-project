import React, { useState, useEffect } from "react";
import { BiError } from "react-icons/bi";

interface ImageProps {
  url: string;
  ready: boolean;
  error: boolean;
}

interface ComponentProps {
  name: string;
  count: number;
  images: ImageProps[];
}

const renderImage = (
  image: {
    url: string;
    ready: boolean;
    error: boolean;
    loading: boolean;
    attempts: number;
  },
  styles: any
) => {
  if (image.loading) {
    return <div style={styles.loader}></div>;
  }

  if (image.error) {
    return <div style={styles.errorIcon}>❌</div>;
  }

  return <img src={image.url} alt="Product" style={styles.image} />;
};

const ProductDisplay: React.FC<ComponentProps> = ({ name, count, images }) => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#121212",
      color: "#fff",
      padding: "10px",
      width: "30%",
      height: "15%",
    },
    innerContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "40%",
      height: "100%",
      marginLeft: "10px",
    },
    imageContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      width: "100%",
      height: "100px",
      marginTop: "10px",
    },
    imageWrapper: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      overflow: "hidden",
      position: "absolute",
      backgroundColor: "#ccc",
    },

    image: {
      width: "38px",
      height: "38px",
    },
    placeholder: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#333",
      margin: "0",
      position: "absolute",
    },
    loader: {
      width: "20px",
      height: "20px",
      border: "2px solid #fff",
      borderTop: "2px solid #007BFF",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    errorIcon: {
      fontSize: "16px",
      color: "red",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },

    largeErrorIcon: {
      fontSize: "32px",
      color: "white",
      backgroundColor: "red",
      padding: "5px",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "6%",
    },

    details: {
      display: "flex",
      flexDirection: "column",
    },
    name: {
      fontSize: "22px",
      fontWeight: "900",
      position: "relative",
      top: "10px",
      color: "#DDE2EC",
    },
    count: {
      fontSize: "18px",
      color: "#DDE2EC",
      position: "relative",
      bottom: "16px",
    },
  };

  const [imageStates, setImageStates] = useState(
    images.map((image) => ({
      url: image.url,
      ready: image.ready,
      error: image.error,
      loading: !image.ready && !image.error,
      attempts: 0,
    }))
  );

  useEffect(() => {
    imageStates.forEach((image, index) => {
      if (image.loading) {
        const retryImageLoading = () => {
          const img = new Image();
          img.src = image.url;

          img.onload = () => {
            setImageStates((prevState) =>
              prevState.map((imgState, i) =>
                i === index
                  ? { ...imgState, ready: true, loading: false, error: false }
                  : imgState
              )
            );
          };

          img.onerror = () => {
            setImageStates((prevState) =>
              prevState.map((imgState, i) =>
                i === index
                  ? {
                      ...imgState,
                      attempts: imgState.attempts + 1,
                      loading: imgState.attempts + 1 < 3,
                      error: imgState.attempts + 1 >= 3,
                    }
                  : imgState
              )
            );
          };
        };

        setTimeout(retryImageLoading, 5000);
      }
    });
  }, [imageStates]);

  const hasError = imageStates.some((image) => image.error);

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={styles.imageContainer}>
          {imageStates.map((image, index) => (
            <div
              key={index}
              style={{
                ...styles.imageWrapper,
                left: `${index % 2 === 0 ? 0 : 35}px`, 
                top: `${index < 2 ? 0 : 35}px`,
                zIndex: 3 - (Math.floor(index / 2) + (index % 2)), 
              }}
            >
              {renderImage(image, styles)}
            </div>
          ))}
        </div>
        <div style={styles.details}>
          <p style={styles.name}>{name}</p>
          <p style={styles.count}>{count} products</p>
        </div>
      </div>
      {hasError && (
        <div style={styles.largeErrorIcon}>
          <BiError />
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
