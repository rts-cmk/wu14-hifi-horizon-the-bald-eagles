import React from 'react';
import { useNavigate } from 'react-router';

export default function FilterSidebar({ allCategories, selectedCategory }) {
    
    const navigate = useNavigate();

    // Helper function to keep display names consistent
    const formatCategoryForDisplay = (slug) => {
        if (!slug) return 'ALL PRODUCTS';
        
        const translations = {
            'cdafspillere': 'CD PLAYERS',
            'dvdafspillere': 'DVD PLAYERS',
            'forforstaerkere': 'PREAMPS',
            'hoejtalere': 'SPEAKERS',
            'pladespillere': 'TURNTABLES',
            'intforstaerker': 'INTEGRATED AMPLIFIERS',
            'effektforstaerkere': 'POWER AMPLIFIERS',
            'roerforstaerkere': 'TUBE AMPLIFIERS'
        };

        if (translations[slug]) {
            return translations[slug];
        }
        
        return slug.replace(/([A-Z])/g, ' $1').toUpperCase();
    }


    const handleCategoryClick = (categorySlug) => {
        if (categorySlug === selectedCategory) {
            // If the same category is clicked, navigate to /shop to clear the filter
            navigate('/shop');
        } else {
            // Navigate to /shop?category=newCategory
            navigate(`/shop?category=${categorySlug}`);
        }
    }
    
    // Note: The screenshot shows more filters (Brand, Color, Price). 
    // For now, we only implement the Category filter logic.
    return (
        <aside className="shopPage__filter-sidebar">
            
            {/* --- Category Filter (Mapped from Context) --- */}
            <div className="filter-block">
                <h3 className="filter-sidebar__heading">Sort by Category</h3> 
                <ul className='filter-sidebar__list'>
                    {/* All Products (Clear Filter) Link */}
                    <li
                        className={`filter-sidebar__item ${!selectedCategory ? 'filter-sidebar__item--active' : ''} `}
                        onClick={() => handleCategoryClick('')}
                    >
                        {formatCategoryForDisplay('')}
                    </li>
                    
                    {/* Dynamic categories */}
                    {allCategories.map((category) => (
                        <li
                            key={category}
                            className={`filter-sidebar__item ${selectedCategory === category ? 'filter-sidebar__item--active' : ''} `}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {formatCategoryForDisplay(category)}
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* --- Placeholder for other filters (Brand, Color, Price) --- */}
            {/* You would implement full filter logic here, but for now, they are just visual placeholders */}
            
            <div className="filter-block">
                <h3 className="filter-sidebar__heading">Brand</h3>
                <ul className='filter-sidebar__list filter-sidebar__list--checkbox'>
                    <li className="filter-sidebar__item"><label><input type="checkbox" checked={true} readOnly /> Creek</label></li>
                    <li className="filter-sidebar__item"><label><input type="checkbox" /> Exposure</label></li>
                    <li className="filter-sidebar__item"><label><input type="checkbox" /> Parasound</label></li>
                </ul>
            </div>
            <div className="filter-block">
                <h3 className="filter-sidebar__heading">Color</h3>
                <ul className='filter-sidebar__list filter-sidebar__list--checkbox'>
                    <li className="filter-sidebar__item"><label><input type="checkbox" name="color" checked={true} readOnly /> White</label></li>
                    <li className="filter-sidebar__item"><label><input type="checkbox" name="color" /> Black</label></li>
                    <li className="filter-sidebar__item"><label><input type="checkbox" name="color" /> Grey</label></li>
                </ul>
            </div>
             <div className="filter-block">
                <h3 className="filter-sidebar__heading">Price</h3>
            </div>
        </aside>
    );
}