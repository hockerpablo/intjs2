
const categoriesContainer = document.querySelector('.categories');
const categoriesList = document.querySelectorAll('.category'); 

// Fucnión para cambiar el estado de los botones del filtro/categorias
const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
      if (categoryBtn.dataset.category !== selectedCategory) {
        categoryBtn.classList.remove('active');
        return;
      }
      categoryBtn.classList.add('active');
    });
  };
  //Función para cambiar el estado del filtro activo
  
  const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
    setShowMoreVisibility(appState.activeFilter);
  };
  
  // Función para si el elemento que se apretó es un boton de categoria y no esta activo
  const isInactiveFilterBtn = (element) => {
    return (
      element.classList.contains('category') &&
      !element.classList.contains('active')
    );
  };
  
  // funcion para aplicar el filtro cuando se apreta un boton de categoria
  
  const applyFilter = (event) => {
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
  
  // Función para filtar los productos por categoría y renderizarlos
  
  const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
      (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
  };

  categoriesContainer.addEventListener("click" ,applyFilter)