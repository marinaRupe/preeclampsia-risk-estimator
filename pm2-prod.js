module.exports = {
  apps : [
      {
        name: "preeclampsia-risk-estimator-prod",
        script: "./server.js",
        watch: true,
        env: {
					"NODE_ENV": "production",
					"PORT": 5000
        }
      }
  ]
}
