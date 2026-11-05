import { useState } from 'react';
import { Layers, Plus, Check, Tag } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [departments, setDepartments] = useState([
    {
      id: 'd-men',
      name: 'Men',
      subcategories: ['Shirts', 'T-Shirts', 'Jeans', 'Trousers', 'Suits & Blazers', 'Jackets & Coats', 'Sneakers', 'Formal Shoes'],
      count: 24
    },
    {
      id: 'd-women',
      name: 'Women',
      subcategories: ['Dresses', 'Tops & Shirts', 'Skirts', 'Trousers', 'Evening Gowns', 'Heels & Flats'],
      count: 18
    },
    {
      id: 'd-kids',
      name: 'Kids',
      subcategories: ['Boys Organic Sets', 'Girls Dresses', 'Toddlers (2-4 Yrs)', 'Teens (9-14 Yrs)'],
      count: 12
    },
    {
      id: 'd-acc',
      name: 'Accessories',
      subcategories: ['Watches & Chronographs', 'Italian Leather Belts', 'Polarized Sunglasses', 'Wallets & Cardholders'],
      count: 14
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-[#2C4152] tracking-wide">
            Fashion Departments & Subcategories
          </h1>
          <p className="text-xs text-gray-500">
            Structure your catalog taxonomy powering the AJIO-inspired mega menu on the customer website.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="p-5 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5A249]" />
                <h3 className="text-sm font-bold text-[#2C4152] uppercase tracking-wider">
                  {dept.name}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#2C4152]/5 text-[#2C4152] font-semibold">
                {dept.count} Active SKUs
              </span>
            </div>

            <p className="text-xs text-gray-500">Subcategories displayed in customer mega menu:</p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {dept.subcategories.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#F5F5F5] text-gray-700 border border-gray-200 font-medium flex items-center gap-1"
                >
                  <Tag className="w-3 h-3 text-[#D5A249]" />
                  <span>{sub}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
