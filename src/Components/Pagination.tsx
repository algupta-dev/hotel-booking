import React from 'react';
import './pagination.css'

const Pagination = (props: any) => {
    const pages = [];

    for (let i = 1; i <= props.totalPage; i++) {
        pages.push(i);
    }

    return(
        <div className="pagination">
        <div onClick={() => {
            props.page>1?
            props.onPageChange(props.page-1): console.log()
        }}>&laquo;</div>
            {pages.map(page =>{
                return(
                    <div key={page} className={props.page && props.page == page ? 'active': 'pageTitle'} onClick={() => props.onPageChange(page)}>{page}</div>
                )
            })}
            <div onClick={() => props.page< props.totalPage?
            props.onPageChange(props.page+1): console.log()}>&raquo;</div>
        </div>
    )
}

export default Pagination;