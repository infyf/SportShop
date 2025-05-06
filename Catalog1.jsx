import { Navigate, Route, useParams, useSearchParams } from "react-router-dom"  
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import CategorySidebar from "../components/categories/CategorySidebar"
import ProductGrid from "../components/products/ProductGrid" 
import AIForSearch from "../components/AI/AI" 
import axios from 'axios'
import AuthProvider from "../components/context/AuthContext" 
import Filter from "../components/Filter/Filter" 
import AuthForm from "../components/Auth/AuthForm" 
import Fondy from "../components/Integration PaySystems/Fondy"
import MasterCard from "../components/Integration PaySystems/MasterCard"
import Chapa from "../components/Integration PaySystems/Chapa"
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

//  if(!user ) 
//  { 
//   return <AuthForm />;
//  } 
//  if(allowedRoles && !allowedRoles.includes(user.role)) 
//  {
//  return <Navigate to="/403" replace />;}

//   return children;
};
  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <CategorySidebar />
        <ProductGrid categoryId={categoryId} searchQuery={searchQuery} />  
        <PrivateRoute allowedRoles={['user', 'admin']}><AIForSearch production={ productList1} /></PrivateRoute> 
        <img src="data:image/jpeg;base64,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" style={{height: '20px'}}></img><Fondy>Fondy:</Fondy>
        <img src="data:image/png;base64,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" style={{height: '20px', marginLeft: '20px'}}></img><MasterCard></MasterCard> 
        <Chapa src="data:image/png;base64,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"style={{height: '20px', marginLeft: '20px'}}/>Pay Chapa
      </div>
      
       
    </main>
  )
}

export default Catalog

