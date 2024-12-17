// components/Categories.js
const Categories = ({ colorTheme }) => {
  const categories = [
    { id: "new", title: "NOUVEAUTÉS", image: "/images/categories/new.jpg" },
    { id: "machines", title: "MACHINES & ALIMENTATIONS", image: "/images/categories/machines.jpg" },
    { id: "needles", title: "AIGUILLES, GRIPS & TUBES", image: "/images/categories/needles.jpg" },
    { id: "ink", title: "ENCRES DE TATOUAGE", image: "/images/categories/ink.jpg" },
    { id: "hygiene", title: "HYGIÈNE & SOINS", image: "/images/categories/hygiene.jpg" },
    { id: "supplies", title: "ÉQUIPEMENT DE STUDIO", image: "/images/categories/supplies.jpg" }
  ];

  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative h-64 xl:h-80 2xl:h-96 group w-full transition-transform duration-300 hover:scale-105"
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
                  <button 
                    className="w-full text-white px-4 py-2 rounded text-sm font-medium bg-black/50
                             transition-all duration-300 transform translate-y-2 opacity-0 
                             group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black/70"
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;