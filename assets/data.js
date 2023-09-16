const productsData = [
    {
        id: 1,
        name: "Apple Macbook Air (13 Pulgadas, 2020, Chip M1, 256 Gb De Ssd, 8 Gb De Ram) ",
        price: 1000, 
        category: "notebooks",
        cardImg: "./assets/img/products/macbook13/1.jpg",
        
    },
    {
        id: 2,
        name: "Lenovo Legion Y540 intel i7-9750H 256gb- RAM16gb NVIDIA GeForce GTX 1660Ti",
        price: 1250,
        category:"notebooks",
        cardImg: "./assets/img/products/lenovo legion/1.jpg",
        
    },
    {
        id: 3,
        name: "Asus TUF A15 AMD Ryzen 7 4800H 512gb-ram16gb NVIDIA GeForce RTX 3050TI",
        price: 1460,
        category: "notebooks",
        cardImg:"./assets/img/products/asus tuf f15/1.jpeg",
        
    },
    {
        id: 4,
        name:"ASUS TUF Gaming NVIDIA GeForce RTX™ 4070 Ti OC Edition",
        price: 1300,
        category:"Placas de video",
        cardImg:"./assets/img/products/asus rtx4070ti/1.jpg",
        
    },
    {
        id: 5,
        name: "MSI Gaming GeForce RTX 4070 Ti 12GB (RTX 4070 Ti Ventus 3X 12G OC)",
        price: 1200,
        category:"Placas de video",
        cardImg:"./assets/img/products/msi 4070ti/1.jpg",
        
    },
    {
        id: 6,
        name: "ASUS ROG Strix GeForce RTX® 4090 OC Edition",
        price: 2000,
        category:"Placas de video",
        cardImg:"./assets/img/products/asus rog strix 4090/1.jpg",
        
    },
    {
        id: 7,
        name:"iPhone 13 256 GB - Midnight",
        price: 1450,
        category:"Smartphones",
        cardImg:"./assets/img/products/iphone13/1.jpg",
        
    },
    {
        id: 8,
        name:"Samsung Galaxy Z Fold5 Icy Blue 512gb",
        price: 890,
        category:"Smartphones",
        cardImg:"./assets/img/products/samsung galaxy fold5/1.jpg",
        
    },
    {
        id: 9,
        name:"Xiaomi Redmi Note 11 Verde 128/4gb 6.43",
        price: 180,
        category:"Smartphones",
        cardImg:"./assets/img/products/xiaomi note11/1.jpg",
        
    },
];


const divideProductsInParts = (size) => {
    let productsList = []
    for (let i = 0; i < productsData.length; i+= size) {
        productsList.push(productsData.slice(i,i + size))
    }
    
    return productsList;
}

const appState  = {
    products: divideProductsInParts(3),
    currentProductsIndex: 0, // esto es la posicion  actual de las listas
    productsLimit: divideProductsInParts(3).length,
    activeFilter: null
}


