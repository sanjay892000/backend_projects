import {
    Sparkles,
    SprayCan,
    Sofa,
    ShoppingBasket,
    Home,
    Laptop,
    Shirt,
    Footprints,
    Watch,
    Dumbbell,
    Car
} from "lucide-react";
import { useProduct } from "../context/ProductState";

const categories = [
    { label: "Men's", category: "mens-shirts", icon: Shirt },
    { label: "Women's", category: "womens", icon: Shirt },
    { label: "Beauty", category: "beauty", icon: Sparkles },
    { label: "Fragrances", category: "fragrances", icon: SprayCan },
    { label: "Sports", category: "sports", icon: Dumbbell, badge: "new" },
    { label: "Shoes", category: "shoes", icon: Footprints },
    { label: "Watches", category: "watches", icon: Watch },
    { label: "Home & Kitchen", category: "home-decoration-kitchen", icon: Home, badge: "new" },
    { label: "Groceries", category: "groceries", icon: ShoppingBasket },
    { label: "Furniture", category: "furniture", icon: Sofa },
    { label: "Electronics", category: "electronics", icon: Laptop },
    { label: "Vehicle", category: "vehicle", icon: Car },
];

export default function CategoryBar() {

    const { setCategory, setPage, setProduct, setReloadKey} = useProduct()

    const applyCategory = (category) => {
        setPage(1)
        setProduct([])
        setCategory(category)
        setReloadKey(prev => prev + 1)
    }

    return (
        <div className="w-full bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between py-10 flex-wrap">
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            className="relative flex flex-col items-center justify-center text-center gap-2 min-w-[90px] cursor-pointer group"
                            onClick={() => applyCategory(cat.category)}
                            
                        >
                            {/* Badge */}
                            {cat.badge && (
                                <span className="absolute -top-2 right-2 text-[10px] bg-pink-600 text-white px-1.5 py-0.5 rounded">
                                    {cat.badge}
                                </span>
                            )}

                            {/* Icon */}
                            <div className="p-3 rounded-full bg-slate-100 group-hover:bg-sky-100 transition">
                                <cat.icon className="w-6 h-6 text-red-500 group-hover:text-sky-600" />
                            </div>

                            {/* Label */}
                            <div className="flex text-pink-600 items-center gap-1 text-sm font-medium text-slate-800">
                                {cat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
