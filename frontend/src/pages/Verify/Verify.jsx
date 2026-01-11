import React, { useContext, useEffect, useRef, useState } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const calledRef = useRef(false); // prevents double call in React StrictMode

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const verifyPayment = async () => {
      // basic validation
      if (!success || !orderId) {
        navigate("/", { replace: true });
        return;
      }

      try {
        const res = await axios.post(`${url}/api/order/verify`, {
          success,
          orderId,
        });

        navigate(res.data?.success ? "/myorders" : "/", { replace: true });
      } catch (err) {
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [url, success, orderId, navigate]);

  return (
    <div className="verify">
      {loading && (
        <p className="verify-text">
          Verifying your payment, please wait…
        </p>
      )}
    </div>
  );
};

export default Verify;
