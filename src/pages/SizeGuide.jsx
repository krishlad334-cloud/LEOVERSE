import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';

export const SizeGuide = () => {
  const breadcrumbs = [{ label: 'Size Guide' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-10 border-b border-[#D8D2C8]">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
          Tailoring & Proportions
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321]">
          LEOVERSE Size Guide
        </h1>
        <p className="text-xs sm:text-sm text-[#77746E] mt-2">
          Our silhouettes are cut with unhurried ease and anatomical balance. Use our dimensional references below to find your ideal fit.
        </p>
      </div>

      <div className="space-y-12">
        {/* Tops & Knitwear */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[#242321]">
            1. Tops, Overshirts & Knitwear (Inches)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#D8D2C8]">
              <thead className="bg-[#EAE5DC]/60 uppercase tracking-wider font-semibold text-[#242321]">
                <tr>
                  <th className="p-3 border border-[#D8D2C8]">Size</th>
                  <th className="p-3 border border-[#D8D2C8]">Chest</th>
                  <th className="p-3 border border-[#D8D2C8]">Shoulder</th>
                  <th className="p-3 border border-[#D8D2C8]">Sleeve</th>
                  <th className="p-3 border border-[#D8D2C8]">Back Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8D2C8]">
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">XS</td>
                  <td className="p-3 border border-[#D8D2C8]">36 - 38</td>
                  <td className="p-3 border border-[#D8D2C8]">17.0</td>
                  <td className="p-3 border border-[#D8D2C8]">32.5</td>
                  <td className="p-3 border border-[#D8D2C8]">27.0</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">S</td>
                  <td className="p-3 border border-[#D8D2C8]">38 - 40</td>
                  <td className="p-3 border border-[#D8D2C8]">17.5</td>
                  <td className="p-3 border border-[#D8D2C8]">33.5</td>
                  <td className="p-3 border border-[#D8D2C8]">27.5</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">M</td>
                  <td className="p-3 border border-[#D8D2C8]">41 - 43</td>
                  <td className="p-3 border border-[#D8D2C8]">18.2</td>
                  <td className="p-3 border border-[#D8D2C8]">34.5</td>
                  <td className="p-3 border border-[#D8D2C8]">28.2</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">L</td>
                  <td className="p-3 border border-[#D8D2C8]">44 - 46</td>
                  <td className="p-3 border border-[#D8D2C8]">19.0</td>
                  <td className="p-3 border border-[#D8D2C8]">35.5</td>
                  <td className="p-3 border border-[#D8D2C8]">29.0</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">XL</td>
                  <td className="p-3 border border-[#D8D2C8]">47 - 49</td>
                  <td className="p-3 border border-[#D8D2C8]">19.8</td>
                  <td className="p-3 border border-[#D8D2C8]">36.5</td>
                  <td className="p-3 border border-[#D8D2C8]">29.8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Trousers */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[#242321]">
            2. Trousers & Chinos (Inches)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#D8D2C8]">
              <thead className="bg-[#EAE5DC]/60 uppercase tracking-wider font-semibold text-[#242321]">
                <tr>
                  <th className="p-3 border border-[#D8D2C8]">Waist Tag</th>
                  <th className="p-3 border border-[#D8D2C8]">Actual Waist</th>
                  <th className="p-3 border border-[#D8D2C8]">Hip</th>
                  <th className="p-3 border border-[#D8D2C8]">Thigh</th>
                  <th className="p-3 border border-[#D8D2C8]">Leg Opening</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8D2C8]">
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">30</td>
                  <td className="p-3 border border-[#D8D2C8]">31.5</td>
                  <td className="p-3 border border-[#D8D2C8]">40.0</td>
                  <td className="p-3 border border-[#D8D2C8]">25.0</td>
                  <td className="p-3 border border-[#D8D2C8]">8.2</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">32</td>
                  <td className="p-3 border border-[#D8D2C8]">33.5</td>
                  <td className="p-3 border border-[#D8D2C8]">42.0</td>
                  <td className="p-3 border border-[#D8D2C8]">26.0</td>
                  <td className="p-3 border border-[#D8D2C8]">8.5</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">34</td>
                  <td className="p-3 border border-[#D8D2C8]">35.5</td>
                  <td className="p-3 border border-[#D8D2C8]">44.0</td>
                  <td className="p-3 border border-[#D8D2C8]">27.0</td>
                  <td className="p-3 border border-[#D8D2C8]">8.8</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">36</td>
                  <td className="p-3 border border-[#D8D2C8]">37.5</td>
                  <td className="p-3 border border-[#D8D2C8]">46.0</td>
                  <td className="p-3 border border-[#D8D2C8]">28.0</td>
                  <td className="p-3 border border-[#D8D2C8]">9.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tailored Blazers & Outerwear */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-[#242321]">
            3. Tailored Blazers, Suits & Ethnic Jackets (Inches)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#D8D2C8]">
              <thead className="bg-[#EAE5DC]/60 uppercase tracking-wider font-semibold text-[#242321]">
                <tr>
                  <th className="p-3 border border-[#D8D2C8]">Suit Size</th>
                  <th className="p-3 border border-[#D8D2C8]">Chest</th>
                  <th className="p-3 border border-[#D8D2C8]">Shoulder Width</th>
                  <th className="p-3 border border-[#D8D2C8]">Jacket Length</th>
                  <th className="p-3 border border-[#D8D2C8]">Sleeve Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8D2C8]">
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">38 Regular</td>
                  <td className="p-3 border border-[#D8D2C8]">38 - 39</td>
                  <td className="p-3 border border-[#D8D2C8]">17.8</td>
                  <td className="p-3 border border-[#D8D2C8]">29.5</td>
                  <td className="p-3 border border-[#D8D2C8]">25.0</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">40 Regular</td>
                  <td className="p-3 border border-[#D8D2C8]">40 - 41</td>
                  <td className="p-3 border border-[#D8D2C8]">18.4</td>
                  <td className="p-3 border border-[#D8D2C8]">30.0</td>
                  <td className="p-3 border border-[#D8D2C8]">25.5</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">42 Regular</td>
                  <td className="p-3 border border-[#D8D2C8]">42 - 43</td>
                  <td className="p-3 border border-[#D8D2C8]">19.0</td>
                  <td className="p-3 border border-[#D8D2C8]">30.5</td>
                  <td className="p-3 border border-[#D8D2C8]">26.0</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold border border-[#D8D2C8]">44 Regular</td>
                  <td className="p-3 border border-[#D8D2C8]">44 - 45</td>
                  <td className="p-3 border border-[#D8D2C8]">19.6</td>
                  <td className="p-3 border border-[#D8D2C8]">31.0</td>
                  <td className="p-3 border border-[#D8D2C8]">26.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SizeGuide;
