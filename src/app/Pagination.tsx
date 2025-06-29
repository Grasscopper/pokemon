"use client";

import React from "react";

const Pagination = (props: { totalPokemon: number; setCurrentPage: (arg0: number) => void; currentPage: number; }) => {
  const numPages = Math.ceil(props.totalPokemon/25);
  const pageNumbers = [];
  for (let number = 1; number < numPages + 1; number++) {
    pageNumbers.push(number);
  }

  const navigate = (event: { currentTarget: { innerText: number; }; }) => {
    props.setCurrentPage(Number(event.currentTarget.innerText));
  }

  const prev = () => {
    if (props.currentPage != 1) {
      props.setCurrentPage(props.currentPage - 1);
    }
  }

  const next = () => {
    if (props.currentPage != numPages) {
      props.setCurrentPage(props.currentPage + 1);
    }
  }

  const pages = pageNumbers.map((page) => {
    let current = "";
    if (page == props.currentPage) current = "is-current";
    return (
      <li key={page}>
        <a onClick={navigate} className={`pagination-link ${current}`} aria-label={`Goto page ${page}`}>{page}</a>
      </li>
    )
  })

  return (
    <nav className="pagination is-medium" role="navigation" aria-label="pagination">
      <a className="pagination-previous" onClick={prev}>Previous</a>
      <a className="pagination-next" onClick={next}>Next page</a>
      <ul className="pagination-list">{pages}</ul>
    </nav>
  )
}

export default Pagination