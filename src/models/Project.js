import Sequelize from 'sequelize';
import { sequelize } from '../database/db';
import Task from './Task';

const Project = sequelize.define('projects', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.TEXT
        // allowNull: false
    },
    priority: {
        type: Sequelize.INTEGER
        // allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    deliverydate: {
        type: Sequelize.DATE
        // allowNull: false
    }

}, {
    timestamps: false
}
);

Task.belongsTo(Project,{foreignKey: 'projectid'});
Project.hasMany(Task,{foreignKey : 'projectid'});



// Project.hasMany(Task, { foreingKey: 'projectid', sourceKey: 'id' });
// Task.belongsTo(Project, { foreingKey: 'projectid', sourceKey: 'id' });

export default Project;