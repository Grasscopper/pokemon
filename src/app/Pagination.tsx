"use client";

import React from "react";

const Pagination = (props: { totalPokemon: number; setCurrentPage: (arg0: number) => void; currentPage: number; cardLimit: number; }) => {
  const numPages = Math.ceil(props.totalPokemon/props.cardLimit);
  const pageNumbers = [];

  let start = props.currentPage - 2;
  if (start < 1 ) start = 1;
  let end = props.currentPage + 3;
  if (end > numPages) end = numPages + 1;

  for (let number = start; number < end; number++) {
    pageNumbers.push(number);
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
        <a id={page.toString()} onClick={() => {props.setCurrentPage(page);}}
        className={`pagination-link ${current}`}
        aria-label={`Goto page ${page}`}>{page}</a>
      </li>
    )
  })

  let startPage = <li key={2000}>
  <a id={"1"} onClick={() => {props.setCurrentPage(1);}}
    className={`pagination-link`}
    aria-label={`Goto page 1`}>1</a>
  </li>

  let endPage = <li key={3000}>
  <a id={`${numPages}`} onClick={() => {props.setCurrentPage(numPages);}}
    className={`pagination-link`}
    aria-label={`Goto page ${numPages}`}>{numPages}</a>
  </li>


  let leftEllipsis = <li>
  <span className="pagination-ellipsis">&hellip;</span>
  </li>

  let rightEllipsis = <li>
  <span className="pagination-ellipsis">&hellip;</span>
  </li>

  if (props.currentPage - 2 <= 1) {
    startPage = <></>;
    leftEllipsis = <></>;
  }

  if (props.currentPage + 2 >= numPages) {
    endPage = <></>;
    rightEllipsis = <></>;
  }

  return (
    <nav className="pagination is-medium" role="navigation" aria-label="pagination">
      <a className="pagination-previous" onClick={prev}>Previous</a>
      <a className="pagination-next" onClick={next}>Next</a>
      <ul className="pagination-list">
        {startPage}
        {leftEllipsis}
        {pages}
        {rightEllipsis}
        {endPage}
      </ul>
    </nav>
  )
}

export default Pagination