import { Navigate, Route, useParams, useSearchParams } from "react-router-dom"  
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import CategorySidebar from "../components/categories/CategorySidebar"
import ProductGrid from "../components/products/ProductGrid" 
import AIForSearch from "../components/AI/AI" 
import axios from 'axios'
import AuthProvider from "../components/context/AuthContext"
function Catalog() {
  const { categoryId } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || '';
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
 const usd_rate = 41.67;

  useEffect(() => { 
    const fetchP = async () => { 
      try { 
        const resp = await axios.get('C://Users/user/Documents', {
          params: { 
            categoryId, 
            search: searchQuery,
          },
        }); 
  
        const convert = resp.data.map((product) => ({
          ...product, 
          price: +(product.price / usd_rate).toFixed(2),
        }));
  
        setProductList(convert);
      } catch(err) { 
        setError('Не вдалося завантажити продукти');
      } finally { 
        setLoading(false);
      }
    };
  
    fetchP();
  }, [categoryId, searchQuery]);
  
  

  const productList1 = [ 

    { id: 1, name: "Футбольний м'яч Nike Strike", price: (999/ usd_rate.toFixed(2)) , size: 5 },
    { id: 2, name: "Бігові кросівки Adidas Ultraboost", price: (4999/ usd_rate.toFixed(2)), size: 42 }, 
    {id: 3, name:"Футбольний набір Zeus KIT PROMO темно-синій", price: (2180 / usd_rate.toFixed(2)), size: 50-52}, 
    {id: 4, name:"Чоловічі сороконіжки Adidas Deportivo III Tf IF1408 45.5", price: (1499 / usd_rate.toFixed(2)), size: 45} ,
    {id: 5, name:"Чоловічий комплект Одягнений X-Shadow XL", price: (1379/ usd_rate.toFixed(2)), size: 175-185},
    {id: 6, name:"Спортивна сумка для бігу на пояс Xiamen RanBag — Чорна", price: (225 / usd_rate.toFixed(2)), size: 400},  
    {id: 7, name:"Тренажер Supretto Топ Фіт з еспандерами (U012-0001)", price: (275 / usd_rate.toFixed(2)), size: "30–50х20х10–15"},  
    {id: 8, name:"Гантелі для фітнесу Neo Sport 2 шт.", price: (249 / usd_rate.toFixed(2)), size: 20-25}, 
    {id: 8, name:"Килимок для фітнесу тришаровий IVN", price: (592/ usd_rate.toFixed(2)), size: "16 200 000"}
];
const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // if (!user) return <Navigate to="/login" />; 
  // <AuthProvider />
  // if (!allowedRoles.includes(user.role)) return <Navigate to="/403" />;

  return children;
};
  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <CategorySidebar />
        <ProductGrid categoryId={categoryId} searchQuery={searchQuery} />  
        <PrivateRoute allowedRoles={['user', 'admin']}>  <AIForSearch production={ productList1} /></PrivateRoute>
      </div>
      
       
    </main>
  )
}

export default Catalog

