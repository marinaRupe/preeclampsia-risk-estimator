module.exports = {
  apps : [
      {
        name: "preeclampsia-risk-estimator-dev",
        script: "./server.js",
        watch: true,
        env: {
					"NODE_ENV": "development",
					"PORT": 4000
        }
      }
  ]
}
