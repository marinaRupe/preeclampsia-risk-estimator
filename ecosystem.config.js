/**
 * pm2 instructions: http://pm2.keymetrics.io/docs/usage/application-declaration/
 */
module.exports = {
  apps : [
		{
			name: "preeclampsia-risk-estimator-test",
			script: "./dist-node/server.js",
			watch: true,
			env: {
				"NODE_ENV": "test",
				"PORT": 4000
			}
		},
		{
			name: "preeclampsia-risk-estimator-prod",
			script: "./dist-node/server.js",
			watch: true,
			env: {
				"NODE_ENV": "production",
				"PORT": 5000
			}
		}
	]
};
