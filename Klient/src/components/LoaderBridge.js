import { useEffect } from "react";
import { useLoader } from "../LoaderContext";
import { registerLoader } from "../api";

function LoaderBridge() {
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    registerLoader(showLoader, hideLoader);
  }, [showLoader, hideLoader]);

  return null;
}

export default LoaderBridge;
