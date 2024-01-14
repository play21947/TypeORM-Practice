import { DataSource } from "typeorm";

export const AppdataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'bookstore',
    synchronize: true,
    logging: true,
    entities: ['./src/entity/*.entity.{js,ts}']
})