import { Link } from "react-router-dom";


function MenuCard({ item }) {

    return (
        <div className="bg-white rounded-2xl shadow-md border border-sky-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">

            {item.image && (
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover"
                />
            )}


            <div className="p-5">

                <h2 className="text-xl font-bold text-slate-800">
                    {item.name}
                </h2>


                <p className="text-slate-500 mt-2 text-sm leading-6">
                    {item.description}
                </p>


                <div className="flex items-center justify-between mt-4">

                    <p className="text-sky-600 font-bold text-lg">
                        ₹{item.price}
                    </p>


                    <p
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                            item.availability
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-500"
                        }`}
                    >
                        {item.availability
                            ? "In Stock"
                            : "Out of Stock"}
                    </p>

                </div>


                <Link
                    to={`/menu/${item._id}`}
                    className="inline-block mt-5 w-full text-center bg-sky-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-sky-600 transition-colors duration-200"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
}


export default MenuCard;