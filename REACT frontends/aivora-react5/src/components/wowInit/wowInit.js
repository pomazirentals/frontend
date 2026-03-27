import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import WOW from "wowjs";

const WowInit = () => {
  const location = useLocation();

  useEffect(() => {
    const wow = new WOW.WOW({
      live: false,
    });
    wow.init();

    return () => wow.sync();
  }, [location.pathname]);

  return null;
};

export default WowInit;
