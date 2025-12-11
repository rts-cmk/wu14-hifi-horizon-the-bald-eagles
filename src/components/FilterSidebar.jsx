import React from 'react';

export default function FilterSidebar({ allCategories, setSelectedCategory, selectedCategory }) {

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? '' : category);
    }

    return (
        <aside className="shopPage__filter-sidebar">
            <h3>Filter by Category</h3>
            <ul className='filter-sidebar__list'>
                <li
                className={`filter-sidebar__item ${!selectedCategory ? 'filter-sidebar__item--active' : ''} `}
                onClick={() => handleCategoryClick('')}
                >
                    ALL PRODUCTS
                </li>
                {allCategories.map((category) => (
                    <li
                        key={category}
                        className={`filter-sidebar__item ${selectedCategory === category ? 'filter-sidebar__item--active' : ''} `}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category.toUppercase().replace(/CDAFSPILLERE/g, 'CD PLAYERS')}
                    </li>
                ))}
            </ul>
        </aside>
    );
}