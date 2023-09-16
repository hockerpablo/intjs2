
const categoriesContainer = document.querySelector('.categories');
const categoriesList = document.querySelectorAll('.category'); 


const changeBtnActiveState = (selectedCategory) => {
    const categorias = [...categoriesList];
    categorias.forEach((categoryBtn) => {
      if (categoryBtn.dataset.category !== selectedCategory) {
        categoryBtn.classList.remove('active');
        return;
      }
      categoryBtn.classList.add('active');
    });
  };
  
  
  const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
    setShowMoreVisibility(appState.activeFilter);
  };
  
  
  const isInactiveFilterBtn = (element) => {
    return (
      element.classList.contains('category') &&
      !element.classList.contains('active') 
    );
  };
  
  
  
  const aplicarfiltro = (event) => {
    const { target } = event;
    if (!isInactiveFilterBtn(target)) return;
    productosCont.innerHTML = '';
  
    changeFilterState(target)
    if (appState.activeFilter) {
      renderFilteredProducts();
      appState.currentProductsIndex = 0;
      return;
    }
  
    renderProducts(appState.products[0]);
  };
  

  
  const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
      (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
  };

  categoriesContainer.addEventListener("click" ,aplicarfiltro)