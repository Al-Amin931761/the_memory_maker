import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <PuffLoader
        color="#36d7b7"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
