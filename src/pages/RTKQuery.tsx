import React from 'react';
import {
    useAddProductMutation,
    useGetGoodsQuery,
    useDeleteProductMutation,
    goodsApi,
} from '../redux/slices/goodsApi';

const RTKQuery = () => {
    const [count, setCount] = React.useState('');
    // хук при вызове делает запрос к серверу_GET и возвращает data.
    const { data, isLoading } = useGetGoodsQuery(count);

    const [newProduct, setNewProduct] = React.useState('');
    // useAddProductMutation - не делает сразу запрос, делает по необходимости
    const [addProduct, { isLoading: isLoadingAdd, isError }] = useAddProductMutation();

    async function handleAddProduct() {
        if (newProduct) {
            // unwrap - нужен для доп пропов с ошибками, загрузками и тд.
            await addProduct({ name: newProduct }).unwrap();
            setNewProduct('');
        }
    }

    // Удаление продукта
    const [deleteProduct] = useDeleteProductMutation();

    async function handleDeleteProduct(id: string) {
        await deleteProduct(id).unwrap();
        // можно добавить всплывашку что товар удален
    }

    if (isLoading) return <h1>loading...</h1>;

    return (
        <div className="container">
            <div>
                <input
                    type="text"
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                />
                <button onClick={handleAddProduct}>Добавить</button>
            </div>
            <div>
                <select value={count} onChange={(e) => setCount(e.target.value)}>
                    <option value="">Все</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <ul>
                {data?.map((item: goodsApi) => (
                    <li onClick={() => handleDeleteProduct(item.id)} key={item.id}>
                        id: {item.id} - {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default RTKQuery;
