export const removeSkeleton = (e) => {
    const parentElem = e.target.parentNode;
    parentElem.classList.remove("loading");
  };