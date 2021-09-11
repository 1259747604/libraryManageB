'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class ChartService extends Service {
  async getChartDt() {
    const { ctx } = this;
    const User = ctx.model.User;
    const BookType = ctx.model.BookType;

    try {
      let chart1Dt = [];
      let chart2Dt = [];
      let chart3Dt = [];

      let { rows } = await BookType.findAndCountAll({ order: [['num', 'DESC']], limit: 10 });
      chart1Dt = rows.map(item => {
        return {
          name: item.typeName,
          value: item.num
        };
      });

      let ageRange1C = await User.count({
        where: {
          age: {
            [Op.lt]: 20
          }
        }
      });

      let ageRange2C = await User.count({
        where: {
          age: {
            [Op.between]: [20, 40]
          }
        }
      });

      let ageRange3C = await User.count({
        where: {
          age: {
            [Op.gt]: 40
          }
        }
      });
      
      chart2Dt.push({ name: '20岁以下', value: ageRange1C });
      chart2Dt.push({ name: '20-40岁', value: ageRange2C });
      chart2Dt.push({ name: '40岁以上', value: ageRange3C });

      let manC = await User.count({
        where: {
          sex: 1
        }
      })
      
      let womenC = await User.count({
        where: {
          sex: 0
        }
      })

      chart3Dt.push({ name: '男', value: manC });
      chart3Dt.push({ name: '女', value: womenC });

      return {
        data: { chart1Dt, chart2Dt, chart3Dt },
        msg: '',
        status: true
      };
    } catch (error) {
      return {
        data: null,
        msg: error,
        status: false
      };
    }
  }
}

module.exports = ChartService;
