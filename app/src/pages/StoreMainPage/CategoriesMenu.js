import React from 'react';
import classnames from 'classnames';

import { StyledCategoriesMenu, StyledCategoriesMenuItem } from './style';

const StoreCategoriesMenu = ({ categories, selectedCategory, onCategoryClick }) => {    
    function list() {
        return categories.map((category) => {
            const { _id, name } = category;
            return (
                <StyledCategoriesMenuItem
                    key={_id}
                    className={classnames({ 'selected': selectedCategory === _id  })}
                    onClick={() => onCategoryClick(category)}
                >
                    {name}
                </StyledCategoriesMenuItem>
            )
        })
    }

    return (
        <StyledCategoriesMenu>
            {list()}
        </StyledCategoriesMenu>
    )
}

export default StoreCategoriesMenu;
