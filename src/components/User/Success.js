import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let session_id = searchParams.get("session_id");
  console.log(searchParams.get("session_id"));

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 shadow-md rounded-md">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Booking successful !</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default Success;
