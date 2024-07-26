<template>
    <div>
        <h2>Перебор массива</h2>
        <ul>
            <li v-for="(value, index) in list" :key="index">{{ value }}</li>
        </ul>

        <h2>Перебор объекта</h2>
        <ul>
            <li v-for="(value, key, index) in user" :key="index">{{ key + ': ' + value }}</li>
        </ul>
    </div>
</template>
