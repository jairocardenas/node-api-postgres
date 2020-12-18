import Sequelize from 'sequelize';
import { sequelize } from '../database/db';


const Task = sequelize.define('tasks', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.TEXT
    },
    priority: {
        type: Sequelize.INTEGER
    },
    done: {
        type: Sequelize.BOOLEAN

    },
    projectid: {
        type: Sequelize.INTEGER
    }

}, {
    timestamps: false
});

export default Task;