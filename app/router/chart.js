module.exports = app => {
  const { router, controller } = app;
  router.post("/chart/getChartDt", controller.chart.getChartDt);
};