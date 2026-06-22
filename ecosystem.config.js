module.exports = {
  apps: [
    {
      name: "redadvenir",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/home/redadvenir-temp/redadvenir",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      listen_timeout: 10000,
      kill_timeout: 5000,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
