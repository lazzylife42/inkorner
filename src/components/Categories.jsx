// src/components/Categories.js
import { Link } from 'react-router-dom';

const Categories = ({ colorTheme }) => {
  const categories = [
    { id: "new", title: "NOUVEAUTÉS", image: "/images/categories/new.jpg", path: "nouveautes" },
    { id: "machines", title: "MACHINES & ALIMENTATIONS", image: "/images/categories/machines.jpg", path: "machines" },
    { id: "needles", title: "AIGUILLES, GRIPS & TUBES", image: "/images/categories/needles.jpg", path: "aiguilles-tubes" },
    { id: "ink", title: "ENCRES DE TATOUAGE", image: "/images/categories/ink.jpg", path: "encres" },
    { id: "hygiene", title: "HYGIÈNE & SOINS", image: "/images/categories/hygiene.jpg", path: "hygiene" },
    { id: "supplies", title: "ÉQUIPEMENT DE STUDIO", image: "/images/categories/supplies.jpg", path: "mobilier" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.path}`}
              className="block relative h-64 xl:h-80 2xl:h-96 group w-full transition-transform duration-300 hover:scale-105"
            >
              <div className="w-full h-full rounded-md overflow-hidden border border-white">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to top, 
                      ${colorTheme.primary}CC,
                      ${colorTheme.primary}40,
                      transparent
                    )`
                  }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 transition-transform duration-300 group-hover:translate-y-[-4px]">
                      {category.title}
                    </h3>
                    <span 
                      className="block w-full text-white px-4 py-2 rounded text-sm font-medium bg-black/50
                               transition-all duration-300 transform translate-y-2 opacity-0 
                               group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black/70 text-center"
                    >
                      Voir plus
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;