import { Link } from "react-router-dom"

const categories = [
  {
    title: "Футбол",
    items: [
      { name: "М'ячі", path: "/category/football-balls" },
      { name: "Форма", path: "/category/football-uniforms" },
      { name: "Бутси", path: "/category/football-boots" },
      { name: "щось", path: "/category/......." },
    ],
  },
  {
    title: "Біг",
    items: [
      { name: "Кросівки", path: "/category/running-shoes" },
      { name: "Одяг для бігу", path: "/category/running-clothes" },
      { name: "Аксесуари", path: "/category/running-accessories" },
    ],
  },
  {
    title: "Фітнес",
    items: [
      { name: "Тренажери", path: "/category/fitness-equipment" },
      { name: "Гантелі", path: "/category/weights" },
      { name: "Килимки", path: "/category/mats" },
      { name: "щось.", path: "/category/...." },
    ],
  },
]

function CategorySidebar() {
  return (
    <aside className="w-64 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Категорії</h2>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index}>
            <h3 className="font-medium mb-2">{category.title}</h3>
            <ul className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link to={item.path} className="text-gray-600 hover:text-orange-500">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default CategorySidebar

