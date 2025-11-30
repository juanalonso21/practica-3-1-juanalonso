export interface Product {
    nombre: string;
    precio: number;
    cantidad: number;
    categoria: string;
    fechaDeIngreso: string;
}

export const productos: Product[] = [
    { nombre: 'Camiseta', precio: 20, cantidad: 10, categoria: 'Ropa', fechaDeIngreso: '2024-11-01' },
    { nombre: 'Pantalones', precio: 50, cantidad: 0, categoria: 'Ropa', fechaDeIngreso: '2024-10-15' },
    { nombre: 'Zapatos', precio: 30, cantidad: 5, categoria: 'Calzado', fechaDeIngreso: '2024-11-10' },
    { nombre: 'Sombrero', precio: 15, cantidad: 20, categoria: 'Accesorios', fechaDeIngreso: '2024-11-05' },
    { nombre: 'Chaqueta', precio: 80, cantidad: 7, categoria: 'Ropa', fechaDeIngreso: '2024-11-11' },
    { nombre: 'Guantes', precio: 25, cantidad: 15, categoria: 'Accesorios', fechaDeIngreso: '2024-10-20' },
    { nombre: 'Bufanda', precio: 18, cantidad: 12, categoria: 'Accesorios', fechaDeIngreso: '2024-11-09' },
    { nombre: 'Gafas de sol', precio: 45, cantidad: 9, categoria: 'Accesorios', fechaDeIngreso: '2024-10-31' },
    { nombre: 'Reloj', precio: 120, cantidad: 3, categoria: 'Accesorios', fechaDeIngreso: '2024-11-03' },
    { nombre: 'Bolso', precio: 60, cantidad: 6, categoria: 'Accesorios', fechaDeIngreso: '2024-10-25' },
    { nombre: 'Cinturón', precio: 22, cantidad: 13, categoria: 'Accesorios', fechaDeIngreso: '2024-11-08' },
    { nombre: 'Vestido', precio: 70, cantidad: 4, categoria: 'Ropa', fechaDeIngreso: '2024-11-12' },
    { nombre: 'Falda', precio: 35, cantidad: 11, categoria: 'Ropa', fechaDeIngreso: '2024-10-18' },
    { nombre: 'Calcetines', precio: 8, cantidad: 30, categoria: 'Ropa', fechaDeIngreso: '2024-11-02' },
    { nombre: 'Pañuelo', precio: 12, cantidad: 25, categoria: 'Accesorios', fechaDeIngreso: '2024-11-07' },
    { nombre: 'Camiseta sin mangas', precio: 15, cantidad: 14, categoria: 'Ropa', fechaDeIngreso: '2024-10-22' },
    { nombre: 'Pantalones cortos', precio: 40, cantidad: 8, categoria: 'Ropa', fechaDeIngreso: '2024-10-30' },
    { nombre: 'Botas', precio: 90, cantidad: 5, categoria: 'Calzado', fechaDeIngreso: '2024-11-06' },
    { nombre: 'Sandalias', precio: 28, cantidad: 18, categoria: 'Calzado', fechaDeIngreso: '2024-10-27' },
    { nombre: 'Zapatos deportivos', precio: 65, cantidad: 7, categoria: 'Calzado', fechaDeIngreso: '2024-11-13' }
];

// 1. Ordena el array de menor a mayor por precio
export const sortByPrice = () => [...productos].sort((a, b) => a.precio - b.precio);

// 2. Ordena el array de menor a mayor por fechaIngreso
export const sortByDate = () => [...productos].sort((a, b) => new Date(a.fechaDeIngreso).getTime() - new Date(b.fechaDeIngreso).getTime());

// 3. Selecciona los artículos que tiene un precio inferior a 25
export const filterCheap = () => productos.filter(p => p.precio < 25);

// 4. Porcentaje de Stock
export const stockPercentage = () => productos.map(p => ({
    nombre: p.nombre,
    porcentaje: ((p.cantidad / 30) * 100).toFixed(2) + '%'
}));

// 5. Agrupa los artículos por categoría
export const groupByCategory = () => {
    return productos.reduce((acc, curr) => {
        if (!acc[curr.categoria]) acc[curr.categoria] = [];
        acc[curr.categoria]!.push(curr);
        return acc;
    }, {} as Record<string, Product[]>);
};

// 6. Muestra los 3 productos más caros
export const top3Expensive = () => [...productos].sort((a, b) => b.precio - a.precio).slice(0, 3);

// 7. Calcula cuánto ganaremos si vendemos todos los accesorios.
export const earningsAccessories = () => {
    return productos
        .filter(p => p.categoria === 'Accesorios')
        .reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
};

// 8. Muestra los productos que han ingresado en los últimos 15 días
export const recentProducts = () => {
    const refDate = new Date('2024-11-15');
    const limitDate = new Date(refDate);
    limitDate.setDate(limitDate.getDate() - 15);

    return productos.filter(p => {
        const d = new Date(p.fechaDeIngreso);
        return d >= limitDate && d <= refDate;
    });
};

// 9. Muestra el calzado con precio entre 20 y 30
export const footwearFilter = () => productos.filter(p => p.categoria === 'Calzado' && p.precio >= 20 && p.precio <= 30);

// 10. Agrega un nuevo producto
export const addProduct = () => {
    const newProduct: Product = { nombre: 'Nuevo', precio: 100, cantidad: 10, categoria: 'Ropa', fechaDeIngreso: '2024-11-14' };
    return [...productos, newProduct];
};

// 11. Realiza un descuento del 5% a los 5 productos con mayor stock
export const discountHighStock = () => {
    const sortedByStock = [...productos].sort((a, b) => b.cantidad - a.cantidad);
    const top5 = sortedByStock.slice(0, 5);
    const top5Names = new Set(top5.map(p => p.nombre));
    return productos.map(p => {
        if (top5Names.has(p.nombre)) {
            return { ...p, precio: p.precio * 0.95 };
        }
        return p;
    });
};

// 12. Borra los productos del mes de octubre
export const deleteOctober = () => {
    return productos.filter(p => {
        const d = new Date(p.fechaDeIngreso);
        return d.getMonth() !== 9; // October is 9
    });
};
