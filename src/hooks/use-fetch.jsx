import { useSession } from "@clerk/react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      if (!session) {
        throw new Error("User session is not available");
      }

      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      const response = await cb(
        supabaseAccessToken,
        options,
        ...args
      );

      setData(response);
      setError(null);
    } catch (error) {
      console.error("useFetch error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fn,
  };
};

export default useFetch;
