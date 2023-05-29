import { Toaster as ToasterComponent } from "react-hot-toast";

const Toaster = () => {
  return (
    <ToasterComponent
      toastOptions={{
        duration: 3000,
        success: {
          style: {
            background: "#16a34a",
            color: "white",
            fontSize: 12,
          },
        },
        error: {
          style: {
            background: "#ef4444",
            color: "white",
            fontSize: 12,
          },
        },
        loading: {
          style: {
            background: "#141c30",
            color: "white",
            fontSize: 12,
            border: "1px solid #1e293b",
          },
        },
        style: {
          width: "100%",
        },
      }}
    />
  );
};
export default Toaster;
